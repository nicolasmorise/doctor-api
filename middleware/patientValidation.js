const { body } = require('express-validator');

exports.patientValidationRules = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').notEmpty().withMessage('email is required').isEmail().withMessage('Email must be valid'),
    body('phone').notEmpty().withMessage('Phone is required'),
    body('dateOfBirth').notEmpty().withMessage('Date of birth is required').isISO8601().withMessage('Date of birth must be a valid date (YYYY-MM-DD)')
];