/*
Nombre: Ademar Fernando Duran Pillco
CI: 9892296
Carrera: Informatica
Materia: Programación Web III
Fecha: 30/03/2026
Ejercicio 3
Crear una función que reciba un arreglo de números y devuelva en un objeto a los pares e impares
*/
function miFuncion(x){
    let con={pares:[],impares:[]}
    for (let i of x){
        if (i%2===0) con.pares.push(i)
        else con.impares.push(i)
    }
    return con
}

let cad = miFuncion([1,2,3,4,5]) 
console.log(cad)