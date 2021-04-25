"use strict" ;

let ciao = ["11", 2, "Dajana", false] ;

//ciao.unshift("Ivan") ;
ciao[5] = "Ivan" ;

for( let elem in ciao ) {
    console.log(ciao[elem]) ;
}

console.log(ciao.length) ;

let a = {x : 1} ;
let b = {x : 1} ;
let c = a ;

console.log(a==b) ;
console.log(a==c) ;
