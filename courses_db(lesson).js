"use strict" ;

const sqlite = require('sqlite3') ;
const dayjs = require('dayjs') ;

//exam objects constructor
function Exam(course_code, name, cfu, score, laude, date) {
    this.course_code = course_code ;
    this.name = name ;
    this.cfu = cfu ;
    this.score = score;
    this.laude = score == 30? laude : false ;
    this.date = date ;

    this.toString = () => `${this.name}(${this.course_code}), ${this.cfu} CFU, ${this.date}, ${this.score}${this.laude?'& Laude':''}`


} ;

function ExamList(){
    this.exams = [] ;

    this.add = (exam) => this.exams.push(exam) ;

    this.toString = () => {
        const el_strings = this.exams.map( ( exam ) => exam.toString()) ;
        el_strings.push(`Average: ${this.average()}`) ;
        el_strings.unshift('Exams list:') ;
        return el_strings.join('\n') ;
    } ;
} ;

const db = new sqlite.Database('exams.sqlite',
    (err) => {if(err) throw err ;}) ;

function getAll() {
    const sql = `SELECT course.code, course.name, course.CFU, score.score, score.laude, score.datepassed
    FROM course LEFT JOIN score 
    ON course.code = score.coursecode ` ;

    return new Promise( (resolve, reject) => {
        db.all(sql, (err, rows) => {
            if(err)
                reject (err) ;
            else {
                let list = new ExamList() ;

                for ( const row of rows ) {
                    let exam = new Exam( row.code, row.name, row.cfu, row.score, row.laude, dayjs(row.datepassed)) ;
                list.add(exam) ;
                } ;
                resolve(list.toString()) ;
            }
        }) ;
    }) ;
} ;

async function main() {
    let list = await getAll() ;
    console.log(list) ;
} ;

main() ;