import express from "express";
import {dbRisichat} from "../../db-connexion.js";
import {ObjectId} from "mongodb";
import {verifyToken as auth} from "../../middleware/auth.js";

export const router = express.Router()

//GET - retrieve all users
router.get('/risichat/users', auth, async (req, res) => {
    const responseDB = await dbRisichat.collection('users').find().project({password: 0, verificationToken: 0, accessToken: 0}).toArray()

    if (responseDB.length) {
        res.send({
            metadata: {
                nbUsers: responseDB.length
            },
            data: responseDB
        })
    } else if (responseDB.length === 0) {
        console.log(`No users found in /users/get-all`)
        res.status(204).send({message: 'No user found'})
    } else {
        console.log(`A error occurred while retrieving the users in /users/get-all`)
        res.status(500).send({message: 'A error occurred while retrieving the users'})
    }
});

//GET - retrieve specific user
router.get('/risichat/users/:id', auth, async (req, res) => {

    const responseDB = await dbRisichat.collection('users').findOne({_id: new ObjectId(req.params.id)}, {projection: {password: 0, verificationToken: 0, accessToken: 0}})

    if (responseDB) {
        res.send({responseDB})
    } else if (!responseDB) {
        console.log(`No user found with id ${req.params.id} in /users/get-with-id`)
        res.status(204).send({message: 'No user found'})
    } else {
        console.log(`A error occurred while retrieving the user with id ${req.params.id} in /users/get-with-id`)
        res.status(500).send({message: `A error occurred while retrieving the user`})
    }
});