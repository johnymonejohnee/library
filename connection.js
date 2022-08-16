const {Pool}= require('pg')
require('dotenv').config()
const pool=new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'books',
    password: process.env.password,
    port: 5432,

})

module.exports=pool
