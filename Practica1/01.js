/*
Nombre: Ademar Fernando Duran Pillco
CI: 9892296
Carrera: Informatica
Materia: Programación Web III
Fecha: 30/03/2026
Ejercicio 1
Crear una función que cuente cuántas veces aparece cada vocal en un texto y devuelva el resultado en un objeto. 
*/
function miFuncion(x){
    let vocales = {a:0, e:0, i:0, o:0, u:0}
    for (let i = 0; i < x.length; i++){
        let l = x[i].toLowerCase()
        if (l in vocales){
            vocales[l]++
        }
    }
    return vocales
}
let obj = miFuncion("VIVABOLIVIA")
console.log(obj)
