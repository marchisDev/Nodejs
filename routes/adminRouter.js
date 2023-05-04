var express = require('express');
var bodyParser = require('body-parser');
let async = require('async');
const fs = require('fs');
const bcrypt = require("bcrypt");
const saltRounds = 10;
// var cookieParser = require('cookie-parser');


//db model
const User = require('../models/userModel')
const Mail = require('../models/mailModel')

//mongoose
const mongoose = require("mongoose")
db = require("../libs/db")


//admin router
const admin = express.Router();

//session
const session = require('express-session')

admin.use(session({
    secret: 'buitrungkien',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 10 * 60 * 1000 } // Thá»i gian sá»‘ng cá»§a cookie lĂ  10 phĂºt
}))

//function

//api
admin.get('/admin', (req, res)=>{
    res.render('admin')
})



module.exports = admin