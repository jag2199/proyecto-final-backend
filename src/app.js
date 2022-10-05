import express from "express"
import bodyParser from "body-parser"
import session from "express-session"
import MongoStore from "connect-mongo"
import passport from 'passport'
import "dotenv/config"

import rutaProd from "./routes/productos"
import rutaCarrito from "./routes/carrito"
import rutaLogin from "./routes/login.js"
import rutaLogout from "./routes/logout.js"
import rutaRegistro from "./routes/register.js"
import rutaErrorLogin from "./routes/errorLogin.js"
import rutaErrorRegister from "./routes/errorRegister.js"

const app = express()

app.set("view engine", "ejs")
app.set("views", __dirname + "../public/views")
app.use(express.static(__dirname + "/public"))

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session(
    {
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@clustercab.kfxke.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
            ttl: 60 * 10
        })
    }
))
app.use(passport.initialize())
app.use(passport.session())

app.use("/api/productos", rutaProd)
app.use("/api/carrito", rutaCarrito)
app.use("/", rutaLogin)
app.use("/logout", rutaLogout)
app.use("/register", rutaRegistro)
app.use("/errorLogin", rutaErrorLogin)
app.use("/errorRegister", rutaErrorRegister)

export default app