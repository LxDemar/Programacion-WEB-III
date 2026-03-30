/*
Nombre: Ademar Fernando Duran Pillco
CI: 9892296
Carrera: Informatica
Materia: Programación Web III
Fecha: 30/03/2026
Ejercicio 2
Crear una función que invierta el orden de las palabras en una frase. 
*/
function miFuncion(x){
    let al=""
    for (let i = x.length-1; i >= 0; i--){
        al=al+x[i]
    }
    return al
}

let cad = miFuncion("HOLAMUNDO") 
console.log(cad)