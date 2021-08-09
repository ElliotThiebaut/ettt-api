import express from "express";
import { msgColl, client } from "../../db-connexion.js";

export const router = express.Router()

//POST - create a new message
router.post('/risichat/new-message', async (req, res) => {

    const newMessage = req.body
    let seqDoc = await client.db('risichat').collection('counters').findOneAndUpdate({id: 'messageId'}, {$inc: {seqValue: 1}}, {returnOriginal: false});

    await msgColl.insertOne({
        message_id: seqDoc.value.seqValue,
        timestamp: Date.now(),
        username: newMessage.username,
        message_content: newMessage.message_content
    })

    res.send('Message received chief')
});


//POST - update a existing message
router.post('/risichat/update-message/:id', async (req, res) => {

    await msgColl.updateOne({message_id : parseInt(req.params.id)}, {$set: req.body})
    res.send('Messaged updated chief')
});