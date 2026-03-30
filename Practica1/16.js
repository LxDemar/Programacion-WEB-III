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