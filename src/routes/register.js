import { Router } from "express"
import passport from "passport"
import "../passport/local.js"

const router = Router()

router.get("/", (req, res) => {
    res.render("register")
})

router.post("/", passport.authenticate(("register"), {
    failureRedirect: "/errorRegister",
    successRedirect: "/login"
}))

export default router