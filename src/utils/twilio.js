import "dotenv/config"
import twilio from "twilio"
import logger from "../loggers/loggers"

const twilioAccount = twilio(
    `${process.env.TWILIO_SID}`,
    `${process.env.TWILIO_TOKEN}`
)


const sendToWsp = async (querysnapshot, precioTotal, user, phone) => {
    const listWsp = querysnapshot.map(
        (e, index) =>
            `
      Producto ${index + 1} 
    
          Articulo: ${e.nombre}
          Precio: $${e.precio} 
          Cantidad: ${e.cantidad} 
          Codigo: ${e.codigo}
          Subtotal: $${e.precio * e.cant}
          
          `)

    twilioAccount.messages
        .create({
            body: `
      Hola ${user}!! 
    Tu pedido se encuentra en proceso 🛒✔

    Lista de productos:

      ${listWsp.join("")}

      Total: $${precioTotal}`,
            from: "whatsapp:+14155238886",
            to: `whatsapp:+549${phone}`,
        })
        .then(() => logger.info("enviado"))
        .catch((err) => logger.warn(err))
}
export default sendToWsp