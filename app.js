
let express=require('express')
const app=express()
let db=require('./connection')

var jwt=require('jsonwebtoken')


var cors=require('cors')
var bodyParser = require('body-parser')
var jsonParser=bodyParser.json();

app.use(cors());


//db connection

db.connect((err,res)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("db connected")
    }
})


//display books data

app.get('/books',(req,res)=>{
    let getbooks='select * from bookinfo'

    db.query(getbooks,(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            
            res.send(result.rows)
        }

        

    })

})






//add books into the database

app.post('/books1',(req,res)=>{

    
    const data=req.body;
    let addbook=`insert into bookinfo(id,name,author,year,pages)
    values('${data.id}','${data.name}','${data.author}','${data.year}','${data.pages}')`
    console.log(addbook)

    db.query(addbook,(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log("data added succesfully")
        }

    })




})

//retrieve data from database by specifying a condition

app.post('/books',jsonParser,(req,res)=>{

    let getyear=`select * from bookinfo where name='${req.body.name}' and author= '${req.body.author}'`
    db.query(getyear,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log('suces')
            res.send(result.rows)
            
        }
    })


})

//update books data

app.patch('/books',(req,res)=>{
    let edit=req.body
    let updated=`UPDATE bookinfo
    SET name = '${edit.name}', year= ${edit.year}
    WHERE id = ${edit.id};
    `

    db.query(updated,(err,result)=>{
        if(err) {
            console.log(err)
        }
        else{
            console.log("val updated")
        }

    })
})

//delete books

app.delete('/books/:id',async (req,res)=>{
    let data=req.body;
    let code=(`DELETE FROM bookinfo WHERE id='${req.params.id}'`)
    console.log(code)
    let reply =await db.query(code);
    if(reply){
        console.log("succesfuully deleted")
        res.send("deleted")
    }
    else{
        console.log("error occured")
    }


})








app.listen(5000,(err,res)=>{
    if(err){
        console.log('error occured')
    }
    else{
        console.log("server started")

    }
    
})