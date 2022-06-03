import express from "express"
import morgan from "morgan"
import rutaProd from "./routes/productos"
import rutaCarrito from "./routes/productos"

const app = express()

app.use(express.json)
app.use(morgan("dev"))
app.use("/api/productos", rutaProd)
app.use("/api/carrito", rutaCarrito)

//server

const PORT = 8080
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${server.address().port} ( http://localhost:${server.address().port} )`)
})