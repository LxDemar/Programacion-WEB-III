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