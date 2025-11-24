const { body } = require('express-validator');

exports.doctorValidationRules = [
  body('referringLast')
    .notEmpty()
    .withMessage('Referring Last is required'),

  body('referringFirst')
    .notEmpty()
    .withMessage('Referring First is required'),

  body('referringClinic')
    .notEmpty()
    .withMessage('Referring Clinic is required'),

  body('referringPhone')
    .notEmpty()
    .withMessage('Referring Phone is required')
    .isString()
    .withMessage('Referring Phone must be text'),

  body('referringFaxNo')
    .notEmpty()
    .withMessage('Referring Fax No is required')
    .isString()
    .withMessage('Referring Fax No must be text'),

  // Everything else optional:
  body('referringMI').optional().isString(),
  body('referringTitle').optional().isString(),
  body('referringAddress').optional().isString(),
  body('referringCity').optional().isString(),
  body('referringState').optional().isString(),
  body('referringZip').optional().isString()
];
