function miFuncion(callback){
    setTimeout(() => {
        callback("Hola Juan");
    }, 2000);
}
function conPromesa(){
    return new Promise((resolve) => {
        miFuncion((resultado) => {
            resolve(resultado);
        });
    });
}

conPromesa().then((mensaje) => {
    console.log(mensaje);
});