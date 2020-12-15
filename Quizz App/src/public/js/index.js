'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongo = require("mongodb");
var mongoose = require('mongoose');



const app = express();
const port = process.env.PORT || 3000
const user = require('./modelos/producto');


app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

app.get('/hola', (req, res) =>{
    res.send("<button>Hola Mundo</>");
});


app.get('/api/product', (req, res) => {

    
    var DanielAlonso = new user
    
        
    DanielAlonso.save( function(err){
        if (err){
            return res.send('error en:'`${err}`)
        }

        console.log("guardado¡")
    })
    


})
app.get('/api/producto/:productId', (req, res) => {

   

})

app.post('/api/producto', (req, res) => {
    console.log('POST user');
    console.log(req.body);

    let user = new user
        
        user.name.firstname = body.req.firstname
        user.name.lastname = body.req.lastname
        user.name.email = body.req.email
        user.name.password = body.req.password
        user.created = body.req.created

    user.save(err, () =>{
        if(err){
            return res.send("error en:"`${err}`)
        }
        console.log('Usuario Guardado')

    })



   
})
app.put('/api/product/:productId', (req, res) => {

})

app.delete('/api/product/:productId', (req, res) => {

})


mongoose.connect('mongodb+srv://LAlonso:chumel.77@cluster0.4nutt.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true }, (err, res) =>{
    if (err) throw err
   console.log("Conexion establecida")
    app.listen(port, ()=> {
    console.log(`API-Rest corriendo en http://localhost:${port}`)
    })
})
