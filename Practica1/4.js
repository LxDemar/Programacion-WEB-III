function miFuncion(x){
    let may=x[0]
    let men=x[0]
    for (let i of x){
        if (i>may) may=i
        else if (i<men) men=i
    }
    return {may,men}
}

let cad = miFuncion([3,1,5,4,2] )
console.log(cad)