/*
Nombre: Ademar Fernando Duran Pillco
CI: 9892296
Carrera: Informatica
Materia: Programación Web III
Fecha: 30/03/2026
Ejercicio 16
Proporcione un ejemplo para migrar una función con promesas a async/await. 
*/
function saludar(nom){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Hola " + nom);
        }, 2000);
    });
}

async function mostrar(){
    const res = await saludar("Juan");
    console.log(res);
}

mostrar();