function miFuncion(arr){
    let [ , , ...resto ] = arr
    return resto
}

console.log(miFuncion([1,2,3,4,5]))