import MongoClass from "../../containers/mongoClass"
import { carritosSchema } from "../../schemas/carritoSchema"

export class MongoDBCarritos extends MongoClass {
    constructor() {
        super("carritos", carritosSchema)
    }

    async addProducto(carrito, productos) {
        productos.forEach(producto => {
            // chequear si el producto ya esta en el carrito
            const productoEnCarrito = carrito.productos.find(p => p._id == producto._id)
            if (producto) {
                producto.cantidad++
            } else {
                carrito.productos.push(producto);
            }
        })
        const carritoUpdated = await this.collection.findByIdAndUpdate(carrito._id, { productos: carrito.productos })
        return carritoUpdated
    }

    async deleteProducto(idCarrito, idProd) {
        const carrito = this.getById(idCarrito)
        const productoEnCarrito = carrito.productos.find(p => p._id == idProd)
        if (productoEnCarrito) {
            productoEnCarrito.cantidad > 1 ? productoEnCarrito.cantidad-- : carrito.productos = carrito.productos.filter(p => p._id != idProd)
        } else {
            throw new Error("No existe producto con ese id")
        }
        const carritoUpdated = await this.collection.findByIdAndUpdate(carrito._id, { productos: carrito.productos })
        return carritoUpdated
    }
}