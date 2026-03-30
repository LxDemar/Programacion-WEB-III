function miFuncion(callback){
    setTimeout(() => {
        callback("juan");
    }, 2000)
}
function saludar(nom){
    console.log("Hola",nom);
}
miFuncion(saludar);
