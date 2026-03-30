/*
Nombre: Ademar Fernando Duran Pillco
CI: 9892296
Carrera: Informatica
Materia: Programación Web III
Fecha: 30/03/2026
Ejercicio 11
Proporcione un ejemplo concreto de encadenamiento de promesas. 
*/
function paso1(){
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Paso 1 listo");
            resolve(5);
        }, 1000);
    });
}

function paso2(num){
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Paso 2 listo");
            resolve(num * 2);
        }, 1000);
    });
}

function paso3(num){
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Paso 3 listo");
            resolve(num + 10);
        }, 1000);
    });
}

paso1()
    .then((res1) => paso2(res1))
    .then((res2) => paso3(res2))
    .then((resFinal) => {
        console.log("Resultado final:", resFinal);
    });