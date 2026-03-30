function paso1(callback){
    setTimeout(() => {
        console.log("Paso 1");
        callback(5);
    }, 1000);
}
function paso2(num, callback){
    setTimeout(() => {
        console.log("Paso 2");
        callback(num * 2);
    }, 1000);
}
function paso3(num, callback){
    setTimeout(() => {
        console.log("Paso 3");
        callback(num + 10);
    }, 1000);
}

paso1((res1) => {
    paso2(res1, (res2) => {
        paso3(res2, (res3) => {
            console.log("Resultado:", res3);
        });
    });
});