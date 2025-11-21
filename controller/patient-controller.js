const patientModels = require('../models/patientModels');
const patientController = {}


patientController.getPatientData = async function(req, res, next){
  try {
    const data = await patientModels.getPatient();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

patientController.createPatientData = async function(req, res, next){
    try {
        const patient = {
        "name": req.body.name,
        "email": req.body.email,
        "phone": req.body.phone,
        "dateOfBirth": req.body.dateOfBirth
        };

        const result = await patientModels.createPatient(patient);

        if (!result.acknowledged) {
        return res.status(500).json({ error: "Failed to create patient" });
        }

        res.status(201).json({
        message: "Patient created successfully",
        id: result.insertedId
        });

    } catch (err) {
        next(err);
    }
};

patientController.updatePatientData = async function(req, res, next){
    try {
        const patientId = req.params.id;
    
        const patient = {
            "name": req.body.name,
            "email": req.body.email,
            "phone": req.body.phone,
            "dateOfBirth": req.body.dateOfBirth
        };
    
        const result = await patientModels.updatePatient(patientId, patient);
    
        if (result.matchedCount === 0)
          return res.status(404).json({ error: "Patient not found" });
    
        res.status(200).json({
          message: result.modifiedCount === 0
            ? "No changes made"
            : "Patient updated successfully"
        });
    
      } catch (err) {
        next(err);
      }
};

patientController.deletePatientData = async function(req, res, next){
  try {
    const id = req.params.id;

    const result = await patientModels.deletePatient(id);

    if (result.deletedCount === 0)
      return res.status(404).json({ error: "Patient not found" });

    res.status(200).json({ message: "Patient deleted successfully" });

  } catch (err) {
    next(err);
  }
};

module.exports = patientController;