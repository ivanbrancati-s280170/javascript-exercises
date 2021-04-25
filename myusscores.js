"use strict" ;

//exam objects constructor
function Exam(course_code, name, cfu, score, laude, date) {
    this.course_code = course_code ;
    this.name = name ;
    this.cfu = cfu ;
    this.score = score;
    this.laude = score == 30? laude : false ;
    this.date = date ;

    this.toString = () => `${this.name}(${this.course_code}), ${this.cfu} CFU ${this.date} ${this.score} ${this.laude?'& Laude':''}`
} ;

//exam with us score objects constructor
function USExam(course_code, name, cfu, score, laude, date) {
    this.course_code = course_code ;
    this.name = name ;
    this.cfu = cfu ;
    this.score = score;
    if( this.score >= 27 ) this.usscore = 'A' ;
            else if (this.score >= 24 ) this.usscore = 'B' ;
            else if (this.score >= 19 ) this.usscore = 'C' ;
            else if (this.score == 18 ) this.usscore = 'D' ;
    this.laude = score == 30? laude : false ;
    this.date = date ;

    this.toString = () => `${this.name}(${this.course_code}), ${this.cfu} CFU, ${this.date}, ${this.score}${this.laude?'& Laude':''}(IT) ${this.usscore}(US)`

    /* this.toString = () => {
                            return `\nCourse Name: ${this.name}\n-Course Code: ${this.course_code} CFU: ${this.cfu}\n-Date: ${this.date} Score: ${this.score}(IT) ${this.usscore}(US) ${this.laude?'& Laude':''}\n` ;
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
    this.average = () => this.exams.map( ( exam ) => exam.score ).reduce( (tot, curr, i, array) => tot + curr / array.length, 0)

    this.weightedAverage = undefined ;
    this.toString = () => {
        const el_strings = this.exams.map( ( exam ) => exam.toString()) ;
        el_strings.push(`Average: ${this.average()}`) ;
        el_strings.push(this.weightedAverage?this.weightedAverage+'(US Weighted)':'') ;
        el_strings.unshift('Exams list:') ;
        return el_strings.join('\n') ;
    } ;
/*     this.toString = () => {
                            return `Exams list:\n${this.exams.toString()}Average: ${this.average()} ${this.weightedAverage?this.weightedAverage+'(US Weighted)':''}` ;
                           } ;*/   
} ; 
    const usScores = (examList) => {
        const el = new ExamList() ;
        examList.exams.forEach( (exam) => el.add( new USExam( exam.course_code, exam.name, exam.cfu, exam.score, exam.laude, exam.date ))) ;
        return el ;
        /* examList.exams.forEach( (exam) => {
            let usScore = undefined;
            if( exam.score >= 27 ) usScore = 'A' ;
            else if (exam.score >= 24 ) usScore = 'B' ;
            else if (exam.score >= 19 ) usScore = 'C' ;
            else if (exam.score == 18 ) usScore = 'D' ;
            
            exam.usScore = usScore ;
            
        }) ;
        return examList ; */
        }; 

const weightedAverage = (examList) => {
                                    let scoresSum = 0 ;
                                    const equivalence = { A: 4.0, B: 3.0, C: 2.0, D: 1.0 } ;
                                    //(v*p)+...+(vn*pn)/p+...+pn
                                    examList.exams.forEach( (exam) => scoresSum = scoresSum + ( equivalence[exam.usscore] * exam.cfu ) ) ;
                                    let weightsSum = 0 ;
                                    examList.exams.forEach( (exam) => weightsSum = weightsSum + exam.cfu ) ; 
                                    examList.weightedAverage = scoresSum/weightsSum ;
                                    return examList ;
                                    } ; 
                   
const e1 = new Exam ("prova2", "prova2", 6, 28, false, 3) ;
const e2 = new Exam ("prova1", "prova1", 6, 30, true, 1) ;
const e3 = new Exam ("prova3", "prova3", 12, 18, false, 4) ;
let el = new ExamList() ;
el.add(e1) ;
el.add(e2) ;
el.add(e3) ;

let elUS = usScores(el) ;
elUS = weightedAverage(elUS) ;

console.log(elUS.toString()) ;
