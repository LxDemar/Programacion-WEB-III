function miFuncion(x){
    let al=""
    for (let i = x.length-1; i >= 0; i--){
        al=al+x[i]
    }
    return al
}

let cad = miFuncion("HOLAMUNDO") 
console.log(cad)