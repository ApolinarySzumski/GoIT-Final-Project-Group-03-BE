//npm modules
import passport from "passport";

const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (
      !user ||
      err ||
      !user.token ||
      user.token !== req.headers.authorization.split(" ")[1]
    ) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Unauthorized",
        data: "Unauthorized",
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};

export default auth;
