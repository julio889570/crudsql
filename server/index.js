const express = require('express');
const bodyParser = require("body-parser")
const {createPool} = require('mysql');
const app = express();
const cors = require('cors')

    const db = createPool({
        host:'localhost',
        user:'sqluser',
        password: 'password',
        database: "mydb"
    })
    app.use(cors())
    app.use(express.json())
    app.use(bodyParser.urlencoded({extended:true}))

    app.get('/api/get',(req,res)=>{
        const sqlSelect = "SELECT *  FROM moviereviews"
        db.query(sqlSelect, (err, result)=>{
            res.send(result)
            console.log(err)
    }) 
    })

    app.post('/api/insert',(req,res)=>{
        const movieName = req.body.movieName;
        const movieReview = req.body.movieReview;
    db.query("INSERT INTO moviereviews (MovieName,movieReview) VALUES (?,?)", [movieName, movieReview], (err, result)=>{
            console.log(err)
        
    }) 
    })
    app.delete('/api/delete/:id',(req, res)=>{
        const id = req.params.id;
        db.query("DELETE FROM moviereviews WHERE id =?", id, (err, result)=>{
          if(err)  console.log(err)
        })
    })
    app.put('/api/update/:id',(req, res)=>{
        const id = req.params.id
        const movieReview = req.body.movieReview
        db.query("UPDATE moviereviews SET movieReview = ? WHERE id = ?", [movieReview, id],(err, result)=>{
            console.log(err)
        })
    })
app.listen(3001, () =>{
    console.log('server runing on port', 3001)
})
