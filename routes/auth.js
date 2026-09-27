const { Router } = require("express");
const authRouter  = Router();
const jwt = require('jsonwebtoken');
const passport = require("passport");

authRouter.post('/login', function (req, res, next) {
    passport.authenticate('user-local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: info.message,
                user   : user
            });
        }
       req.login(user, {session: false}, (err) => {
           if (err) {
               res.send(err);
           }
           const userObj = { 
            id: user.id
           }
           const token = jwt.sign(userObj, process.env.JWT_SECRET || process.env.SECRET);
           return res.json({user, token});
        });
    })(req, res);
});
authRouter.post("/validate", passport.authenticate('jwt', {session: false}), (req, res) => res.json(req.user));

module.exports = authRouter