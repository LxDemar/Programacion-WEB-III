function miPromesa(nom){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Hola " + nom);
        }, 2000);
    });
}
function conCallback(nom, callback){
    miPromesa(nom).then((resultado) => {
        callback(resultado);
    });
}

conCallback("Juan", (mensaje) => {
    console.log(mensaje);
});