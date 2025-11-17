const { body } = require('express-validator');

exports.doctorValidationRules = [
  body('referringLast').notEmpty().withMessage('Referring Last is required'),
  body('referringFirst').notEmpty().withMessage('Referring First is required'),
  body('referringMI').optional().isString().withMessage('Referring MI must be text'),
  body('referringTitle').notEmpty().withMessage('Referring Title is required'),
  body('referringAddress').notEmpty().withMessage('Referring Address is required'),
  body('referringCity').notEmpty().withMessage('Referring City is required'),
  body('referringState').notEmpty().withMessage('Referring State is required'),
  body('referringZip')
    .notEmpty().withMessage('Referring Zip is required')
    .isPostalCode('US').withMessage('Invalid ZIP code'),
  body('referringClinic').notEmpty().withMessage('Referring Clinic is required'),
  body('referringPhone')
    .notEmpty().withMessage('Referring Phone is required')
    .isString(),
  body('referringFaxNo')
    .notEmpty().withMessage('Referring Fax No is required')
    .isString()
];
