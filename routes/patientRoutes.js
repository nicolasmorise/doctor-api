const router = require("express").Router();
const patientController = require("../controller/patient-controller");
const patientRules = require("../middleware/patientValidation")
const errorValidator = require("../middleware/validation")

const ensureAuth = require('../middleware/ensureAuth');

router.use(ensureAuth)

router.get("/patients", patientController.getPatientData);

router.post("/patients", patientRules.patientValidationRules, errorValidator.handleValidationErrors, patientController.createPatientData);

router.put("/patients/:id", patientRules.patientValidationRules, errorValidator.handleValidationErrors, patientController.getPatientData);

router.delete("/patients/:id", patientController.deletePatientData);

module.exports = router;
