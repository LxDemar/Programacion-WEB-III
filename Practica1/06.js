/*
Nombre: Ademar Fernando Duran Pillco
CI: 9892296
Carrera: Informatica
Materia: Programación Web III
Fecha: 30/03/2026
Ejercicio 6
Tomar los dos primeros elementos de un arreglo y almacenarlos en dos variables mediante desestructuración. 
*/
function miFuncion(arr){
    let [a, b] = arr
    return {a, b}
}
console.log(miFuncion([1,2,3,4]))