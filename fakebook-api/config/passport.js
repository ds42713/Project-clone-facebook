const passport = require('passport')
const { Strategy: JwtStrategy,ExtractJwt } = require('passport-jwt')
const { User } = require('../models')

const option = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY || 'key' 
}

passport.use(
    new JwtStrategy(option, async (payload, done) => {
        try {
            const user = await User.findOne({where: { id:payload.id }})
            if (!user) {
                return done(null, false)
            }
            done(null, user)
        } catch(err) {
            done(err, false)
        }
}))

