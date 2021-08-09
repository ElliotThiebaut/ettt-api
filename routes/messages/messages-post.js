import express from "express";
import { msgColl, client } from "../../db-connexion.js";

export const router = express.Router()

//POST - create a new message
router.post('/risichat/new-message', async (req, res) => {

    const newMessage = req.body
    let seqDoc = await client.db('risichat').collection('counters').findOneAndUpdate({id: 'messageId'}, {$inc: {seqValue: 1}}, {returnOriginal: false});

    let addedMessage = await msgColl.insertOne({
        message_id: seqDoc.value.seqValue,
        timestamp: Date.now(),
        username: newMessage.username,
        message_content: newMessage.message_content
    })

    console.log(addedMessage)
    if (addedMessage.acknowledged) {
        res.send({message:'Message added'})
    } else {
        res.status(500).send({message:'A error occurred while adding the message'})
    }


});


//POST - update a existing message
router.post('/risichat/update-message/:id', async (req, res) => {

    let updatedMessage = await msgColl.updateOne({message_id : parseInt(req.params.id)}, {$set: req.body})

    if (updatedMessage.acknowledged && updatedMessage.matchedCount){
        res.send({message:'Message updated'})
    } else if (!updatedMessage.matchedCount) {
        res.status(204).send({message:`No message found for message_id ${req.params.id}`})
    } else {
        res.status(500).send({message:'A error occurred while updating the message'})
    }
});