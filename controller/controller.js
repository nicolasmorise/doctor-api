const models = require('../models/models');

const getDoctorsDatas = async (req, res, next) => {
  try {
    const data = await models.getDoctorsData();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

const createDoctorData = async (req, res, next) => {
  try {
    const doctor = {
      "Referring Last": req.body.referringLast,
      "Referring First": req.body.referringFirst,
      "Referring MI": req.body.referringMI,
      "Referring Title": req.body.referringTitle,
      "Referring Address": req.body.referringAddress,
      "Referring City": req.body.referringCity,
      "Referring State": req.body.referringState,
      "Referring Zip": req.body.referringZip,
      "Referring Clinic": req.body.referringClinic,
      "Referring Phone": req.body.referringPhone,
      "Referring Fax No": req.body.referringFaxNo
    };

    const result = await models.createDoctor(doctor);

    if (!result.acknowledged) {
      return res.status(500).json({ error: "Failed to create doctor" });
    }

    res.status(201).json({
      message: "Doctor created successfully",
      id: result.insertedId
    });

  } catch (err) {
    next(err);
  }
};

const updateDoctorData = async (req, res, next) => {
  try {
    const doctorId = req.params.id;

    const doctor = {
      "Referring Last": req.body.referringLast,
      "Referring First": req.body.referringFirst,
      "Referring MI": req.body.referringMI,
      "Referring Title": req.body.referringTitle,
      "Referring Address": req.body.referringAddress,
      "Referring City": req.body.referringCity,
      "Referring State": req.body.referringState,
      "Referring Zip": req.body.referringZip,
      "Referring Clinic": req.body.referringClinic,
      "Referring Phone": req.body.referringPhone,
      "Referring Fax No": req.body.referringFaxNo
    };

    const result = await models.updateDoctor(doctorId, doctor);

    if (result.matchedCount === 0)
      return res.status(404).json({ error: "Doctor not found" });

    res.status(200).json({
      message: result.modifiedCount === 0
        ? "No changes made"
        : "Doctor updated successfully"
    });

  } catch (err) {
    next(err);
  }
};

const deleteDoctorData = async (req, res, next) => {
  try {
    const id = req.params.id;

    const result = await models.deleteDoctor(id);

    if (result.deletedCount === 0)
      return res.status(404).json({ error: "Doctor not found" });

    res.status(200).json({ message: "Doctor deleted successfully" });

  } catch (err) {
    next(err);
  }
};

module.exports = {
  getDoctorsDatas,
  createDoctorData,
  updateDoctorData,
  deleteDoctorData
};
