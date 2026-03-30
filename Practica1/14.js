/*
Nombre: Ademar Fernando Duran Pillco
CI: 9892296
Carrera: Informatica
Materia: Programación Web III
Fecha: 30/03/2026
Ejercicio 14
Proporcione un ejemplo para convertir una promesa en un callback. 
*/
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