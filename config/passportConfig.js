//npm modules
import passport from "passport";
import passportJWT from "passport-jwt";
import "dotenv/config";

//my modules
import User from "../service/schemas/user.js";

const secret = process.env.SECRET;

const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;

const params = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(params, async (payload, done) => {
    try {
      const user = await User.findById(payload.id);
      if (!user) {
        return done(new Error("User not found"), false);
      }
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);

export default passport;
