/*
Nombre: Ademar Fernando Duran Pillco
CI: 9892296
Carrera: Informatica
Materia: Programación Web III
Fecha: 30/03/2026
Ejercicio 13
Proporcione un ejemplo concreto donde el anidamiento de promesas se puede reescribir mejor con async/await haciendo el código más limpio y mantenible. 
*/
function paso1(){
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Paso 1");
            resolve(5);
        }, 1000);
    });
}
function paso2(num){
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Paso 2");
            resolve(num * 2);
        }, 1000);
    });
}
function paso3(num){
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Paso 3");
            resolve(num + 10);
        }, 1000);
    });
}

async function ejecutar(){
    const r1 = await paso1();
    const r2 = await paso2(r1);
    const r3 = await paso3(r2);
    console.log("Resultado:", r3);
}

ejecutar();