import dotenv from "dotenv"
dotenv.config()

let productosDao
let carritosDao

switch (process.env.DB_NAME) {
    case 'mongoDB':
        import('./productos/mongoProductos').then(({ MongoDBProductos }) => {
            productosDao = new MongoDBProductos()
        })
        import('./carritos/mongoCarrito').then(({ MongoDBCarritos }) => {
            carritosDao = new MongoDBCarritos()
        })
        break
    case 'firebase':
        import('./productos/firebaseProductos').then(({ FirebaseProductos }) => {
            productosDao = new FirebaseProductos()
        })
        import('./carritos/firebaseCarrito').then(({ FirebaseCarritos }) => {
            carritosDao = new FirebaseCarritos()
        })
        break
    default:
        throw new Error('No se encontró la database')
}

export { productosDao, carritosDao }