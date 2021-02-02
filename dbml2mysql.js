const fs = require('fs')
const {exporter} = require('@dbml/core')

// get DBML file content
const dbml = fs.readFileSync('./sample.dbml', 'utf-8')

// generate MySQL from DBML
const mysql = exporter.export(dbml, 'mysql')
console.log(mysql)
