/*
Nombre: Ademar Fernando Duran Pillco
CI: 9892296
Carrera: Informatica
Materia: Programación Web III
Fecha: 30/03/2026
Ejercicio 7
Almacenar el resto de los elementos de un arreglo sin tomar en cuenta los dos primeros elementos de un arreglo, mediante desestructuración. 
*/
function miFuncion(arr){
    let [ , , ...resto ] = arr
    return resto
}

console.log(miFuncion([1,2,3,4,5]))