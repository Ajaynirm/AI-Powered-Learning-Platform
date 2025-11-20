import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";

import passport from "passport";
import User from "../models/User.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";


dotenv.config();

// Local login with email/password
passport.use(
  new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
        const user = await User.findOne({
            where: { email }
          });
          
      if (!user) return done(null,false, { message: "Email not exists" });
     
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return done(null, false, { message: "Invalid password" });
      return done(null, user,{message: "Login success"});
    } catch (err) {
      return done(err);
    }
  })
);

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.token;  // cookie name
  }
  return token;
};
const opts = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromAuthHeaderAsBearerToken(),
    cookieExtractor,
  ]),
  secretOrKey: process.env.JWT_SECRET,
};


// JWT verification
passport.use(
  new JwtStrategy(opts, async (jwtPayload, done) => {
      try {
        
        const user = await User.findOne({
            where: { id:jwtPayload.id }
          });
        return done(null, user || false);
      } catch (err) {
        done(err, false);
      }
    }
  )
);

// passport.use(
//     new GoogleStrategy(
//       {
//         clientID: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         callbackURL: "/auth/google/callback",
//       },
//       async (accessToken, refreshToken, profile, done) => {
//         // Find or create user
//         // const user = await User.findOneAndUpdate(
//         //   { googleId: profile.id },
//         //   { name: profile.displayName },
//         //   { upsert: true, new: true }
//         // );
//         return done(null, user);
//       }
//     )
//   );

export default passport;