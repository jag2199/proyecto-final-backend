import express from "express"
import rutaProd from "./routes/productos"
import rutaCarrito from "./routes/carrito"
import bodyParser from "body-parser"

const app = express()

// app.set("view engine", "ejs")
// app.set("views", __dirname + "../public/views")
// app.use(express.static(__dirname + "/public"))

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/productos", rutaProd)
app.use("/api/carrito", rutaCarrito)

//server

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${server.address().port} ( http://localhost:${server.address().port} )`)
})