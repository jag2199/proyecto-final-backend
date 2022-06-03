import { Router } from "express"
import Api from "../api"


const router = Router()
const api = new Api("../DB/productos.json")

router.get("/", async (req, res) => {
    const productos = await api.getAll()
    res.json(productos)
})

router.get("/:id", async (req, res) => {
    const { id } = req.params
    const producto = await api.getById(id)
    res.json(producto)
})

router.post("/", async (req, res) => {
    const obj = req.body
    const idProducto = await api.save(obj)
    res.json(idProducto)
})

router.put("/:id", (req, res) => {
    res.json(api.update(req.params.id, req.body))
})

router.delete("/:id", (req, res) => {
    res.json(api.delete(req.params.id))
})


export default router