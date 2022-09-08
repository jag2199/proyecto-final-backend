import MongoClass from "../../containers/mongoClass.js";
import { productosSchema } from "../../schemas/productosSchema.js";

export class MongoDBProductos extends MongoClass {
    constructor() {
        super("productos", productosSchema);
    }
}