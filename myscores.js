"use strict" ;

const scores = [18, 30, 25, 22, 27, 21, 18, 30, 29, 28] ;

//function to improve the scores
const improveScores = (scores) => {
                                             
    let avg = avgScores(scores) ;
    let scores2 = [...scores] ; 

    const lowest1 = scores2.sort((a,b) => (a-b))[0] ;
    const lowest2 = scores2.sort((a,b) => (a-b))[1] ;
    
    let indexToRemove = scores.indexOf(lowest1) ;
    scores.splice(indexToRemove, 1) ;

    indexToRemove = scores.indexOf(lowest2) ;
    scores.splice(indexToRemove, 1) ;

    scores.push(Math.round(avg), Math.round(avg)) ;
    
    return scores ;
}

//function to compute the average
/* const avgScores = (scores) => {
    //let tot = 0 ;
    //for (const elem of scores) {
    //    tot = tot + elem ;    
    //}
    let tot = scores.reduce( (sum, elem) => sum = sum + elem ) ;

    return tot/scores.length ;
} */
const avgScores = (scores) => scores.reduce( (sum, elem, i, array) => sum + elem / array.length, 0 ) ;


console.log(`Initial scores: ${scores}`) ;
console.log(`Average: ${avgScores(scores)}`)
const improvedScores = improveScores(scores) ;
console.log(`Improved scores: ${improvedScores}`) ;
console.log(`Average: ${avgScores(improvedScores)}`)
