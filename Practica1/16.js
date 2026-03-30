/*
Nombre: Ademar Fernando Duran Pillco
CI: 9892296
Carrera: Informatica
Materia: Programación Web III
Fecha: 30/03/2026
Ejercicio 16
Proporcione un ejemplo para migrar una función con promesas a async/await. 
*/
async function saludar(nom){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Hola " + nom);
        }, 2000);
    });
}
async function migrarAsync(){
    try {
        const res = await saludar("Juancarlos");
        console.log(res);
    }finally{
        console.log("Proceso finalizado :b")
    }
}
migrarAsync();
