/*
Nombre: Ademar Fernando Duran Pillco
CI: 9892296
Carrera: Informatica
Materia: Programación Web III
Fecha: 30/03/2026
Ejercicio 4
Crear una función que reciba un arreglo de números y devuelva el número mayor y el menor, en un objeto. 
*/
function miFuncion(x){
    let may=x[0]
    let men=x[0]
    for (let i of x){
        if (i>may) may=i
        else if (i<men) men=i
    }
    return {may,men}
}

let cad = miFuncion([3,1,5,4,2] )
console.log(cad)