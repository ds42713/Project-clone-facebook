const { User } = require('../models')
const cloudinary = require('cloudinary').v2;
const fs = require('fs')

const updateProfile = async (req,res,next) => {

        cloudinary.uploader.upload(req.file.path, async (err, result)=> {
            if(err){
                return next(err)
            }
            await User.update(
                {profileImg: result.secure_url}, 
                {where: { id: req.user.id}}
            )
            if (req.user.profileImg) {
                //req.user.profileImg
                const splited = req.user.profileImg.split('/')
                cloudinary.uploader.destroy(splited[splited.length - 1].split('.')[0]);
            }
            
            fs.unlinkSync(req.file.path) // ลบไฟล์รูป หลังไปเก็บใน cloud
            res.json({
                message: "upload Done",
                profileImg: result.secure_url
            })
        })

}

const getMe = (req, res, next) => {
    const { id, firstName, lastName, profileImg, email, phoneNumber } = req.user;
    res.status(200).json({
        user: { id, firstName, lastName, profileImg, email, phoneNumber 
    }});
  };

module.exports = {
    updateProfile,
    getMe
}