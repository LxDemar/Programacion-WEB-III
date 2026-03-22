function miFuncion(x){
    let vocales = {a:0, e:0, i:0, o:0, u:0}
    for (let i = 0; i < x.length; i++){
        let l = x[i].toLowerCase()
        if (l in vocales){
            vocales[l]++
        }
    }
    return vocales
}

let obj = miFuncion("VIVABOLIVIA")
console.log(obj)