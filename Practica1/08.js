/*
Nombre: Ademar Fernando Duran Pillco
CI: 9892296
Carrera: Informatica
Materia: Programación Web III
Fecha: 30/03/2026
Ejercicio 8
Realizar un código para ejecutar una función callback después 2 segundos. 
*/
function miFuncion(callback){
    setTimeout(() => {
        callback("juan");
    }, 2000)
}
function saludar(nom){
    console.log("Hola",nom);
}
miFuncion(saludar);
