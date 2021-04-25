'use strict';

const sqlite = require('sqlite3');
const db = new sqlite.Database('prova.sqlite',
    (err) => { if (err) throw err; });

function countRows() {
    return new Promise((resolve, reject) => {
        db.all('select count(*) as tot from prova',
            (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows[0].tot);
                }
            }
        );
    });
}

async function insertOne() {
    return new Promise((resolve, reject) => {
        db.run('insert into prova values("Nino", "Nini", 15)',
            (err) => {
                if (err) { reject(err); }
                else resolve(true);
            });
    });
}

async function main() {

    let tot = await countRows() ;
    console.log(tot) ;
    insertOne() ;
    tot = await countRows() ;
    console.log(tot) ;
    db.close() ;
    //return 3 ; // will be converted to a Promise
}

main() ;
// db.close() ; // NOOO