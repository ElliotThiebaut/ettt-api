import express from "express";
import {dbRisichat} from "../../db-connexion.js";
import {ObjectId} from "mongodb";

export const router = express.Router()

//GET - retrieve all users
router.get('/risichat/users', async (req, res) => {
    const responseDB = await dbRisichat.collection('users').find().project({password: 0, verificationToken: 0, accessToken: 0}).toArray()

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

    //TODO Change .find() to .findOnde()
    const responseDB = await dbRisichat.collection('users').find({_id: new ObjectId(req.params.id)}).project({password: 0, verificationToken: 0, accessToken: 0}).toArray()

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