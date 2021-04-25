"use strict" ;

//js Date type
let now = new Date() ;

console.log(now) ;

//import dayjs
const dayjs = require('dayjs') ;


//create dayjs dates
let now2 = dayjs() ;
let date = dayjs('2021-03-15T13:37') ;
let date2 = dayjs('2021-01-01') ;

//print dayjs dates
console.log(now2.format()) ;
console.log(date.toString()) ;
console.log(date2.format('DD-MM-YYYY')) ;

//get and set methods
const date2_day = date2.get('date') ;
//const date2_day = date2.get('date') ; //works the same
//const date2_day = date2.day() ; //works the same
console.log(date2_day) ;

const date2_month = date2.get('month') ; //PAY ATTENTION! Jan = 0, Feb = 1, ....
console.log(date2_month) ;

const date2_year = date2.get('year') ;
console.log(date2_year) ;

const date_hour= date.get('hour') ;
console.log(date_hour) ;

const date_minute = date.get('minute') ;
console.log(date_minute) ;

const newDate = date2.set('date', 15) ;
console.log(newDate.format()) ;

//modify methods
/*
.add/.subtract
.startOf/ .endOf
d1.diff(d2, ‘unit’)
*/

//comparison methods
/* 
.isBefore/ .isSame/ .isAfter
.isBetween
.isLeapYear/.daysInMonth
 */
console.log(newDate.subtract(1, 'year').format()) ;
console.log(newDate.isBefore(dayjs('2004-04-03'))) ;