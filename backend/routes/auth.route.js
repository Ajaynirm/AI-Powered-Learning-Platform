import { Router } from "express";
import passport from "passport";
import { register, login, checkAuth, logout} from "../controller/auth.controller.js"
import { protect } from "../middleware/auth.middleware.js";

const router = Router();


router.post("/register", register );

router.post("/login", login );

router.post("/logout",protect, logout );

router.get("/check-auth",protect, checkAuth );

router.get("/profile", protect, (req, res) => {
  res.json({ message: `Hello ${req.user.id}` });
});




router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = generateToken(req.user);
    res.redirect(`/dashboard?token=${token}`);
  }
);


export default router;


// import express from "express";
// import { checkAuth, receiveNewUserFromClerk} from "../controller/auth.controller.js";
// import { ProtectRoute } from "../middleware/ProtectRoute.js";

// const router = express.Router();



// // router.get("/check",ProtectRoute, checkAuth);
// // router.post("/webhook/new-user", receiveNewUserFromClerk);


// export default router;



