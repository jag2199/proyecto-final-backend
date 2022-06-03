import { Router } from "express"
import Api from "../api"

const router = Router()
const api = new Api("../DB/carrito.json")

router.get("/", async (req, res) => {
    const carritos = await api.getAll()
    res.json(carritos)
})

router.post("/", async (req, res) => {
    const obj = req.body
    const idProducto = await api.save(obj)
    res.json(idProducto)
})

router.post("/:id/productos", async (req, res) => {
    const { id } = req.params
    const producto = await api.getById(id)
    res.json(producto)
})

router.delete("/:id/productos/:id_prod", (req, res) => {
    const { id, id_prod } = req.params
    res.json(api.deleteFrom(id, id_prod))
})


export default router