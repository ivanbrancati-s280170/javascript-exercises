"use strict" ;

const sqlite = require('sqlite3') ;

//open db
const db = new sqlite.Database( 'prova.sqlite',
(err) => { if(err) throw err; }) ;

//queries
const sql = 'SELECT * FROM prova' ;
const sql2 = 'SELECT COUNT(*) FROM prova' ;
const sql3 = 'SELECT * FROM prova WHERE ID = ?' ;

//returns all the rows
db.all(sql, 
    (err, rows) => {
        if (err) throw err ;
        rows.forEach( (row) => console.log(row));
    }) ;

//using parameters
db.all(sql3, [1],
    (err, rows) => {
        if (err) throw err ;
        rows.forEach( (row) => console.log(row));
    }) ;

//executes something for each row without storing it
db.each(sql, 
    (err, row) => {
        if (err) throw err ;
        console.log(row);
    }) ;

//returns only the first row
db.get(sql2, 
    (err, row) => {
        if (err) throw err ;
        console.log(row['COUNT(*)']);
    }) ;

//insert values (async)
async function insertRow(par1, par2, par3) {
    //const sql = `INSERT INTO prova VALUES (${par1}, ${par2}, ${par3})` ;
    return new Promise( (resolve, reject) => {
        db.run("INSERT INTO prova VALUES ('Peppe', 'Pippo', 6)" , 
            (err) => {
                if (err) reject (err) ;
                else resolve('Done!') ;
            }) ;
    });
} ;     
async function main() {
let prova = await insertRow('Nino', 'Dangelo', 4) ;
console.log(prova) ;
}
 main() 
//close db
db.close() ;