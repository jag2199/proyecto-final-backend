import { Router } from "express"
import passport from "passport"
import "../passport/local.js"
const router = Router()

router.get("/", (req, res) => {
    res.render("login")
})

router.post("/", passport.authenticate(("login"), {
    failureRedirect: "/errorLogin",
    successRedirect: "/"
}))

export default router