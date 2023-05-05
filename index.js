require('dotenv').config()

const express = require('express')
const app = express()
//db
const mongodb = require('mongoose')
const path = require('path')

//router
const userRoute = require('./routes/userRouter')
const adminRoute = require('./routes/adminRouter')


const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')

//ejs viewer
app.set('view engine', 'ejs')


//Routing User
app.use('/', userRoute)
app.use('/admin',adminRoute)
app.use(express.static(path.join(__dirname, 'public')));

//JSON encode
app.use(express.urlencoded({ extended:false }))
app.use(express.json())



//Crearte Server
const port = process.env.PORT || 8080
app.listen(port, () =>{
    console.log('http://localhost:' + port)
})