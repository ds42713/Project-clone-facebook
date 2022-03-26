const { User } = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ // https://www.w3resource.com/javascript/form/email-validation.php // fakebook ep1 บ่าย 1:42:00

const register = async (req,res,next) => {
    try {
        const { firstName, lastName, emailOrPhoneNumber, password, confirmPassword } = req.body
        if (password !== confirmPassword){
            return res.status(400).json({ message: 'password and confirm password did not match'})
        }

        const isEmail = emailFormat.test(emailOrPhoneNumber) // เชคว่าเป็น email

        if(isEmail){
            const existUser = await User.findOne({ where: { email: emailOrPhoneNumber }})
            
            if (existUser) {
                return res.status(400).json({ message: 'this e-mail is already in use'})
            }
        } else {
            const existUser = await User.findOne({ where: { phone_number: emailOrPhoneNumber }})
            if (existUser) {
                return res.status(400).json({ message: 'this phonenumber is already in use'})
            }
        }
        
        const salt = bcrypt.genSaltSync(12)
        const hashedPassword = bcrypt.hashSync(password, salt)

        await User.create({ 
            firstName, 
            lastName, 
            email: isEmail ? emailOrPhoneNumber: null ,
            phoneNumber: !isEmail ? emailOrPhoneNumber: null, 
            password: hashedPassword, 
        })
        res.status(201).json({ message: 'user created'})   
    
    } catch (err) {
        next(err)
    }
}

const login = async (req,res,next) => {
    try {
        const { emailOrPhoneNumber , password } = req.body

        const isEmail = emailFormat.test(emailOrPhoneNumber)

        let user ;
        if (isEmail) {
            user = await User.findOne({where: { email: emailOrPhoneNumber }})
        } else {
            user = await User.findOne({where: { phoneNumber: emailOrPhoneNumber }})
        }

        if(!user) {
            return res.status(400).json({message: "invalid email, phone number or password"})
        }

        const isMatch = await bcrypt.compare(password , user.password)
        if(!isMatch) {
            return res.status(400).json({message: "invalid email, phone number or password"})
        }
        const payload = { 
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            expiresIn: 60 * 60 * 24 * 30
        })

        const { id, firstName, lastName, profileImg, email, phoneNumber } = user;
        res.status(200).json({
            token,
            user: { id, firstName, lastName, profileImg, email, phoneNumber
        }})

    } catch (err) {
        next(err)
    }
}

module.exports = {
    register,
    login
}