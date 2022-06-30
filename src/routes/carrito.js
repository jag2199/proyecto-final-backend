import fs from "fs"
import { Router } from "express"
import Api from "../api"

const router = Router()
const api = new Api("/DB/carrito.json")

router.get("/:id/productos", async (req, res) => {
    const carritos = await api.getAll()
    const { id } = req.params
    const carrito = carritos[id]
    res.json(carrito.productos)
})

router.post("/", async (req, res) => {
    const obj = []
    const idCarrito = await api.save(obj)
    res.json({ idCarrito })
})

router.post("/:id/productos/:id_prod", async (req, res) => {
    const { id, id_prod } = req.params
    const carrito = await api.getById(id)
    const productos = await fs.promises.readFile("../DB/productos.json")
    const producto = productos[id_prod]
    carrito.productos.push(producto)
    await api.save(carrito)
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params
    await api.delete(id)
})

router.delete("/:id/productos/:id_prod", async (req, res) => {
    const { id, id_prod } = req.params
    await api.deleteFrom(id, id_prod)
})


export default router