import { Router } from "express"
import Api from "../api"

const router = Router()
const api = new Api("/DB/productos.json")

const errorAdmin = { error: "Operacion no autorizada" }
const admin = true

router.get("/", async (req, res) => {
    const productos = await api.getAll()
    console.log(productos)
    res.send(productos)
})

router.get("/:id", async (req, res) => {
    const { id } = req.params
    const producto = await api.getById(id)
    res.json(producto)
})

router.post("/", async (req, res) => {
    if (admin) {
        const obj = req.body
        const idProducto = await api.save(obj)
        res.json({ message: `Producto n°${idProducto} agregado` })
    }
    else {
        res.json(errorAdmin)
    }

})

router.put("/:id", async (req, res) => {
    if (admin) {
        const obj = req.body
        obj.timestamp = getFecha()
        await api.update(req.params.id, obj)
    }
    else {
        res.json(errorAdmin)
    }

})

router.delete("/:id", async (req, res) => {
    if (admin) {
        const { id } = req.params
        await api.delete(id)
    }
    else {
        res.json(errorAdmin)
    }

})

export default router
