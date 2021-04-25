"use strict" ;

//exam objects constructor
function Exam(course_code, name, cfu, score, laude, date) {
    this.course_code = course_code ;
    this.name = name ;
    this.cfu = cfu ;
    this.score = score;
    this.laude = score == 30? laude : false ;
    this.date = date ;

    this.toString = () => `${this.name}(${this.course_code}), ${this.cfu} CFU, ${this.date}, ${this.score}${this.laude?'& Laude':''}`
    /* this.toString = () => {
        return `Course Name: ${this.name}\n-Course Code: ${this.course_code} CFU: ${this.cfu}\n-Date: ${this.date} Score: ${this.score} ${this.laude?'& Laude':''}\n` ;
       } ; */

} ;

//exams list objects constructor
function ExamList(){
    this.exams = [] ;

    this.add = (exam) => this.exams.push(exam) ;
    this.find = (course_code) => {
                                    const result = this.exams.filter( (exam) => exam.course_code == course_code)[0] ;
                                    return result?result:-1 ;
                                } ;
    this.afterDate = (date) => this.exams.filter( (exam) => exam.date > date ) ; 
    this.listByDate = () => this.exams.sort( (a,b) => { 
                                                    return a.date < b.date?-1:1 }) ;
    this.listByScore = () => this.exams.sort( (a,b) => { 
                                                        return a.score < b.score?-1:1 }).reverse() ;    
/*     this.average = () => {
                            const marks = [] ;
                            this.exams.forEach( (exam) => marks.push(exam.score) ) ;
                            return marks.reduce( (tot, curr) => tot = tot + curr) / marks.length ;    
                        }; */
    this.average = () => this.exams.map( ( exam ) => exam.score ).reduce( (tot, curr, i, array) => tot + curr / array.length, 0)
    /* this.toString = () => {
        return `Exams list:\n${this.exams.toString()}Average: ${this.average()} ` ;
        } ; */
    this.toString = () => {
                            const el_strings = this.exams.map( ( exam ) => exam.toString()) ;
                            el_strings.push(`Average: ${this.average()}`) ;
                            el_strings.unshift('Exams list:') ;
                            return el_strings.join('\n') ;
    } ;
    
                    } ;                                

const e1 = new Exam ("prova2", "prova2", 2, 28, false, 3) ;
const e2 = new Exam ("prova1", "prova1", 2, 30, false, 1) ;
const e3 = new Exam ("prova3", "prova3", 2, 24, false, 4) ;
let el = new ExamList() ;
el.add(e1) ;
el.add(e2) ;
el.add(e3) ;

console.log(el.average()) ;