const router = require('express').Router();
const controller = require('../controller/controller');

const { doctorValidationRules } = require('../middleware/doctorValidation');
const { handleValidationErrors } = require('../middleware/validation');


router.get('/doctors', controller.getDoctorsDatas);

router.post('/doctors', doctorValidationRules, handleValidationErrors, controller.createDoctorData);

router.put('/doctors/:id', doctorValidationRules, handleValidationErrors, controller.updateDoctorData);

router.delete('/doctors/:id', controller.deleteDoctorData);

module.exports = router;