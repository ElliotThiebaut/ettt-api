import express from "express";
import { msgColl } from "../../db-connexion.js";

export const router = express.Router()

// GET - retrieve all messages
router.get('/risichat/messages', async (req, res) => {

    let responseDB = await msgColl.find().toArray()

    if (responseDB.length) {
        res.send({
            metadata: {
                numberOfMessages: responseDB.length
            },
            data: responseDB
        })
    } else if (responseDB.length === 0) {
        res.status(204).send()
    } else {
        res.status(500).send({message: 'A error occurred while retrieving the messages'})
    }

});


//GET - retrieve messages from a specified user
router.get('/risichat/messages/:username', async (req, res) => {

    let responseDB = await msgColl.find({username: req.params.username}).toArray()

    if (responseDB.length) {
        res.send({
            metadata: {
                numberOfMessages: responseDB.length
            },
            data: responseDB
        })
    } else if (responseDB.length === 0) {
        res.status(204).send()
    } else {
        res.status(500).send({message: `A error occurred while retrieving the messages of ${req.params.username}`})
    }

});