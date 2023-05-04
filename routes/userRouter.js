const express = require('express')
require('dotenv').config()
const router = express.Router()
var bodyParser = require('body-parser');
let async = require('async');
const fs = require('fs');
const bcrypt = require('bcrypt')
const saltRounds = 10;
const moment = require('moment')

//validator form
const {check, validationResult} = require('express-validator')
const registerValidator = require('../routes/validators/registerValidator')
const loginValidator = require('../routes/validators/loginValidator')


// var cookieParser = require('cookie-parser')
// const multiparty = require('multiparty');
router.use(bodyParser.urlencoded({ extended:false }))
router.use(bodyParser.json())

//db Model
const User = require('../models/userModel')
const Email = require('../models/mailModel')

const mongoose = require("mongoose");
db = require("../libs/db")
const urlencodedParser = bodyParser.urlencoded({ extended: false })


//session
const session = require('express-session')

router.use(session({
    secret: 'buitrungkien',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 10 * 60 * 1000 } // Thời gian sống của cookie là 10 phút
}))

//function
async function compare(text, hash) {
    let check = await bcrypt.compare(text, hash);
    return check
}
//resful API
router.get('/', function(req, res) {
    res.render('login')
})

////////////////////login//////////////////////////////////////////////////////
router.get('/login',loginValidator, function(req, res) {
    res.render('login')
})

router.post('/login', loginValidator, async (req, res) => {
    const result = validationResult(req);
  
    if (!result.isEmpty()) {
      return res.status(422).json({ code: 4, message: result });
    }
  
    try {
      // If validation passed
      if (req.body.email == "admin@gmail.com" && req.body.password == "123456") {
        req.session.admin = true
        return res.redirect('/admin')
      }
  
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(401).json({ code: 1, message: 'No user found with this email' });
      }
  
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) {
        return res.status(401).json({ code: 2, message: 'Incorrect password' });
      }
  
      // Login successful
      req.session.user = user;
      res.redirect('/home');
      return res.status(200).json({ code: 0, message: 'Login successful' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ code: 3, message: 'Internal server error' });
    }
  });

///////////////////register/////////////////////////////////////////////////////////////

router.get('/register',registerValidator,(req, res) => {

    res.render('register')
})


router.post('/register', registerValidator, async (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.errors });
    }

    const { username, email, phone, password, address, fullname, birthday } = req.body;

    try {
        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            email: email,
            phone: phone,
            username: username,
            fullname: fullname,
            address: address,
            birthday: birthday,
            password: hashedPassword
        });

        await newUser.save();
        return res.redirect('/login');
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server error');
    }
});


////////////////verify-otp//////////////////////////////////////////////////////////////////////////////////////////

router.get('/verify-otp', (req, res, next)=>{
    res.render('OTP')
})

router.post('/verify-otp', (req, res, next)=>{
    const otp = req.body.otp
    const savedOtp = req.session.otp

    // Kiểm tra thời gian hết hạn của OTP
    const otpExpireTime = req.session.otpExpireTime;
    if (moment() > otpExpireTime) {
        // OTP đã hết hạn, thông báo cho người dùng và yêu cầu nhập lại mã OTP hoặc gửi lại mã mới
        res.render('verify-otp', { error: 'OTP was not useful, Resend' })
    } else {
    // OTP còn hạn, tiếp tục xử lý xác nhận tài khoản
        if (otp === savedOtp) {
            // Mã OTP chính xác
            // Xác nhận đăng ký tài khoản của người dùng
            const user = new User({
                email: req.session.email,
                phone: req.session.phone,
                name: req.session.name,
                address: req.session.address,
                birthday: req.session.birthday,
                password: req.session.password
            });
            user.save().then(() => {
            // Đăng ký tài khoản thành công
                res.redirect('/login')
            }).catch(err => {
                console.log(err)
                res.status(500).send('Đã xảy ra lỗi')
            });
        }
        else {
            // Mã OTP không chính xác
            // Yêu cầu người dùng nhập lại mã OTP hoặc gửi lại mã OTP mới
            res.render('verify-otp', { error: 'OTP code was invalid, please enter again.' })
        }
    }
})

/////////////////////////////////////////////////////////////////////
router.get('/home', (req, res) => {
    res.render('home')
})

router.post('/home', (req, res) => {
    res.render('home')
})

////////////////////////////Sent//////////////////////////////////////////
router.get('/home/sent', (req, res) => {

    res.render('home')
})
router.post('/home/sent', (req, res) => {
    
    res.render('home')
})

////////////////////////////Draft//////////////////////////////////////////
router.get('/home/draft', (req, res) => {

    res.render('home')
})
router.post('/home/draft', (req, res) => {

    res.render('home')
})


module.exports = router