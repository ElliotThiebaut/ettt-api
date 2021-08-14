import express from "express";
import {client, dbRisichat} from "../../db-connexion.js";

export const router = express.Router()

//POST - create a new user
router.post('/risichat/new-users', async (req, res) => {
    const newUser = req.body
    let seqDoc = await client.db('risichat').collection('counters').findOneAndUpdate({id: 'userId'}, {$inc: {seqValue: 1}}, {returnOriginal: false});

    let addedUser = await dbRisichat.collection('users').insertOne({
        user_id: seqDoc.value.seqValue,
        password: newUser.password,
        username: newUser.username,
        roles: ['user']
    })
})