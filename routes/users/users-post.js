import express from "express";
import bcrypt from "bcrypt";
import {client, dbRisichat} from "../../db-connexion.js";

export const router = express.Router()
const saltRounds = 10;

//POST - create a new user
router.post('/risichat/new-user', async (req, res) => {
    const newUser = req.body
    let seqDoc = await client.db('risichat').collection('counters').findOneAndUpdate({id: 'userId'}, {$inc: {seqValue: 1}}, {returnOriginal: false});
    const passwordHash = await bcrypt.hash(newUser.password, saltRounds)

    let addedUser = await dbRisichat.collection('users').insertOne({
        user_id: seqDoc.value.seqValue,
        password: passwordHash,
        username: newUser.username,
        email: newUser.email,
        roles: ['user']
    })

    if (addedUser.acknowledged) {
        res.status(201).send({message:'User added'})
    } else {
        res.status(500).send({message:'A error occurred while adding the user'})
    }
})

//POST - update a existing user
router.post('/risichat/update-user/:id', async (req, res) => {
    const updateUser = {
        $set: {}
    }

    if (req.body.username) {
        updateUser.$set.username = req.body.username
    }
    if (req.body.email) {
        updateUser.$set.email = req.body.email
    }
    if (req.body.roles) {
        updateUser.$set.roles = req.body.roles
    }
    if (req.body.password) {
        updateUser.$set.password = await bcrypt.hash(req.body.password, saltRounds)
    }

    
    let updatedUser = await dbRisichat.collection('users').updateOne({user_id : parseInt(req.params.id)}, updateUser)

    if (updatedUser.acknowledged && updatedUser.matchedCount){
        res.send({message:'User updated'})
    } else if (!updatedUser.matchedCount) {
        res.status(204).send()
    } else {
        res.status(500).send({message:'A error occurred while updating the user'})
    }
})