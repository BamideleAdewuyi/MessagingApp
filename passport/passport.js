const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use("user-local",
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await db.findUserByUsername({ username });

            if (!user) {
                return done(null, false, { message: "Username not found" });
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return done(null, false, { message: "Incorrect password" });
            }

            return done(null, user);
        } catch(err) {
            return done(err);
        }
    })
);

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET || process.env.SECRET
    },
    async function (jwtPayload, cb) {
        try {const userId = Number(jwtPayload.id)
        const user = await db.findUserById({ userId });
        cb(null, user);
        } catch(err) {
            return cb(err);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await db.findUserById({ id });

        done(null, user);
    } catch(err) {
        done(err);
    }
});

module.exports = {
    passport
}