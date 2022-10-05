const socket = io()

const btnChat = document.getElementById("btnChat")
const btnProductos = document.getElementById("btnProductos")

// btnProductos.addEventListener("click", () => {
//     socket.emit("newProd")
// })

// socket.on("productos", (productos) => {
//     const divProductos = document.getElementById("productos")
//     divProductos.innerHTML = productos.map(producto => {
//         return (
//             `<tr>
//                 <td>
//                     ${producto.title}
//                 </td>
//                 <td>
//                     ${producto.price}
//                 </td>
//                 <td>
//                     <img src="${producto.thumbnail}" alt="IMG ${producto.title}">
//                 </td>
//                 </tr>`
//         )
//     })
// })



btnChat.addEventListener("click", () => {
    const user = document.getElementById("email").value
    if (user !== "" && tieneArroba(user)) {
        const date = new Date()
        const fecha = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} a las ${date.getHours()}:${date.getMinutes()}hs`;
        const texto = document.getElementById("texto").value
        const msj = { author: user, fecha: fecha, text: texto }
        socket.emit("newMsj", msj)
    }
    else {
        alert("Para poder utilizar el chat debe ingresar su email")
    }
})

socket.on("chat", (chat) => {
    const divChat = document.getElementById("chat")
    console.log(chat)
    if (chat[0]) {
        divChat.innerHTML = chat.map(msj => {
            return (
                `<div><p class="badge bg-dark bg-opacity-50  rounded-pill fs-6 " > 
                      <small class="text-danger  fs-6 ms-3">${msj.author} : 
                      <small class="text-light text-opacity-25 ms-1 fs-6">${msj.text}</small>
                      <small class="badge bg-light text-dark bg-gradient bg-opacity-10 rounded-pill ms-4 ">${msj.fecha}</small> 
                      </small> 
                      </p>
                </div>`
            )
        }).join("")
    } else {
        divChat.innerHTML = "<div><p>Aún no hay mensajes</p></div>"
    }
})

const tieneArroba = (user) => {
    for (const letra of user) {
        if (letra == "@") {
            return true
        }
    }
    return false
}