import "dotenv/config"
import nodeMailer from "nodemailer"
const transporter = nodeMailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: `${process.env.MAIL_USER}`,
        pass: `${process.env.MAIL_PASS}`,
    },
})

export const sendMailWelcome = async (name, email, userType, address, age, phone) => {
    const mailOptions = {
        from: "REPUBLICA DE 1905 <jaguala99@gmail.com>",
        to: email,
        subject: "REPUBLICA DE 1905",
        html: `<h1>Gracias por su compra!</h1>
        <h2>Datos de registro</h2>
        <h4>Nombre: ${name}</h4>
        <h4>Email: ${email}</h4>
        <h4>Tipo de usuario: ${userType}</h4>
        <h4>Direccion: ${address}</h4>
        <h4>Edad: ${age}</h4>
        <h4>Telefono: ${phone}</h4>
      `,
    }
    await transporter.sendMail(mailOptions)
}

export const sendMailTicket = async (querysnapshot, precioTotal, email, user) => {
    const listEmail = querysnapshot.map(
        (e, index) =>
            `<div>
          <h3>Producto ${index + 1} </h3>
          <h4>Articulo: ${e.nombre}</h4>
          <h4>Precio: $${e.price} </h4>
          <h4>Cantidad: ${e.cant} </h4>
          <h4>Codigo: ${e.codigo}</h4>
          <h4>Subtotal: $${e.precio * e.cant}</h4>
          </div>`
    )
    const mailOptions = {
        from: "REPUBLICA DE 1905 <jaguala99@gmail.com>",
        to: email,
        subject: `Nuevo pedido de ${user}`,
        html: `<h1>Gracias por comprar en Republica de 1905! </h1>
         <h2>Datos de registro</h2>
         <h4>Nombre: ${user}</h4>
         <h4>Email: ${email}</h4>
         <h2>Lista de productos</h2>
         ${listEmail.join("")}
         <h3>Total: $${precioTotal}</h3>
    
       `,
    }

    await transporter.sendMail(mailOptions);
}