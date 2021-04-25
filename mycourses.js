"use strict" ;

//function to create exams array (from exams string)
const createExamsArray = (exams) => exams.split(", ") ;

//function to create acronyms array (from exams array)
const createAcronymsArray = (exams_array) => {  
                                                let acronyms_array = exams_array.map( elem => elem.split(" ").map( (el) => el.slice(0,1) ).join("").toUpperCase()) ;
                                                return acronyms_array ;
                                                };

//function to create exams 'objects'
const createExamsObjects = (exams_array, acronyms_array) => {
                                                                let exams = [] ; 
                                                                exams_array.forEach( (elem, index) => exams.push([acronyms_array[index], elem]) ) ;
                                                            return exams ;                                                                
                                                            } ;  


const examsString = "Web Applications I, Computer Architectures, Data Science and Database Technology, Computer network technologies and services, Information systems security, Software engineering, System and device programming" ;
const examsArray = createExamsArray(examsString) ;
const acronymsArray = createAcronymsArray(examsArray) ;
const exams = createExamsObjects(examsArray, acronymsArray).sort( (a,b) => a[0] >= b[0] ? 1 : -1) ; ;

console.log("List of exams:" );
exams.forEach( (exam) => console.log(`${exam[0]}->${exam[1]}`)) ;