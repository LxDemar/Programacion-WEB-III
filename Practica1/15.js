/*
Nombre: Ademar Fernando Duran Pillco
CI: 9892296
Carrera: Informatica
Materia: Programación Web III
Fecha: 30/03/2026
Ejercicio 15
Proporcione un ejemplo para convertir un callback en una promesa. 
*/
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