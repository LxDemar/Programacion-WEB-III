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