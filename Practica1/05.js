/*
Nombre: Ademar Fernando Duran Pillco
CI: 9892296
Carrera: Informatica
Materia: Programación Web III
Fecha: 30/03/2026
Ejercicio 5
Crear una función que determine si una cadena es palíndromo (se lee igual al derecho y al revés). 
*/
function alrevez(x){
    let al=""
    for (let i = x.length-1; i >= 0; i--){
        al=al+x[i]
    }
    return al
}
function miFuncion(x){
    let al=alrevez(x)
    return x==al
}

let cad = miFuncion("oruro") 
console.log(cad)