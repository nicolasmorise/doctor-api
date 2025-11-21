const { ObjectId } = require('mongodb');
const mongodb = require('../db/connect');

const patientsModel = {}

patientsModel.getPatient = async function () {
    const db = mongodb.getDb().db('new_project_db');
    
    const result = await db.collection('patients').find();
    const doctors = await result.toArray();
    return doctors;
}

patientsModel.createPatient = async function (patient) {
    const db = mongodb.getDb().db('new_project_db');
    const result = await db.collection('patients').insertOne(patient);
    return result
}

patientsModel.updatePatient = async function (id, patient) {
        const db = mongodb.getDb().db('new_project_db');
        const result = await db.collection('patients').replaceOne({_id: new ObjectId(id) }, patient);
        return result;
}

patientsModel.deletePatient = async function (id) {
    const db = mongodb.getDb().db('new_project_db');
    const result = await db.collection('patients').deleteOne({_id: new ObjectId(id)})
    return result;
}

module.exports = patientsModel