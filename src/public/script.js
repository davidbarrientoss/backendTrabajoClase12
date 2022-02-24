const socket=io();

socket.on("newUser",alert("nuevo cliente conectado"))

let productForm=document.getElementById("productForm")

productForm.addEventListener("submit",async()=>{
    socket.emit("newProductEntered")
})