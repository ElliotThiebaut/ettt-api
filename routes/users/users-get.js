import express from "express";
import {dbRisichat} from "../../db-connexion.js";

export const router = express.Router()

//GET - retrieve all users
router.get('/risichat/users', async (req, res) => {
    const responseDB = await dbRisichat.collection('users').find().toArray()

    if (responseDB.length) {
        res.send({
            metadata: {
                nbUsers: responseDB.length
            },
            data: responseDB
        })
    } else if (responseDB.length === 0) {
        res.status(204).send()
    } else {
        res.status(500).send({message: 'A error occurred while retrieving the users'})
    }
});

//GET - retrieve specific user
router.get('/risichat/users/:id', async (req, res) => {

    const responseDB = await dbRisichat.collection('users').find({user_id: parseInt(req.params.id)}).toArray()

    if (responseDB.length) {
        res.send({
            metadata: {
                nbUsers: responseDB.length
            },
            data: responseDB
        })
    } else if (responseDB.length === 0) {
        res.status(204).send()
    } else {
        res.status(500).send({message: `A error occurred while retrieving the user with id ${req.params.id}`})
    }
});