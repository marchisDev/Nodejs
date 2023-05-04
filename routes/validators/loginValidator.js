const {check} = require('express-validator')

module.exports = [
    check('email')
    .exists().withMessage('Please provide a valid email address')
    .notEmpty().withMessage('Email field was not provided')
    .isEmail().withMessage('Invalid email address'),

    check('password')
    .exists().withMessage('Please provide a password')
    .notEmpty().withMessage('Password was not provided')
    .isLength({min:6}).withMessage('Password must be at least 6 characters'),

]