import express from "express";
import { msgColl } from "../../db-connexion.js";

export const router = express.Router()

// GET - retrieve all messages
router.get('/risichat/messages', async (req, res) => {

    let responseDB = await msgColl.find().toArray()

    if (responseDB.length) {
        res.send(responseDB)
    } else {
        res.status(204).send({message: 'No message found'})
    }

});


//GET - retrieve messages from a specified user
router.get('/risichat/messages/:username', async (req, res) => {

    let responseDB = await msgColl.find({username: req.params.username}).toArray()

    if (responseDB.length) {
        res.send(responseDB)
    } else {
        res.status(204).send({message: `No message found for user ${req.params.username}`})
    }

});