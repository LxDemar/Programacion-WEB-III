/*
Nombre: Ademar Fernando Duran Pillco
CI: 9892296
Carrera: Informatica
Materia: Programación Web III
Fecha: 30/03/2026
Ejercicio 9
Crear una promesa que devuelva un mensaje de éxito después de 3 segundos. 
*/
function miPromesa(nom){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Hola " + nom);
        }, 3000);
    });
}

miPromesa("Pepe").then((mensaje) => {
    console.log(mensaje);
});