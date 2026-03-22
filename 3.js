function miFuncion(x){
    let con={pares:[],impares:[]}
    for (let i of x){
        if (i%2===0) con.pares.push(i)
        else con.impares.push(i)
    }
    return con
}

let cad = miFuncion([1,2,3,4,5]) 
console.log(cad)