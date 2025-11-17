const { ObjectId } = require('mongodb');
const mongodb = require('../db/connect');

//Get all doctors info
async function getDoctorsData() {
    const db = mongodb.getDb().db('new_project_db');

    const result = await db.collection('information').find();
    const doctors = await result.toArray();
    return doctors;
}

async function createDoctor(doctor) {
    const db = mongodb.getDb().db('new_project_db');
    const result = await db.collection('information').insertOne(doctor);
    return result
}

async function updateDoctor(id, doctor) {
    const db = mongodb.getDb().db('new_project_db');
    const result = await db.collection('information').replaceOne({_id: new ObjectId(id) }, doctor);
    return result;
}


async function deleteDoctor(id) {
    const db = mongodb.getDb().db('new_project_db');
    const result = await db.collection('information').deleteOne({_id: new ObjectId(id)})
    return result;
}

module.exports = { getDoctorsData, createDoctor, updateDoctor, deleteDoctor };
