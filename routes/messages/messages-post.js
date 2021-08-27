import express from "express";
import { dbRisichat, client } from "../../db-connexion.js";
import {ObjectId} from "mongodb";
import {verifyToken as auth} from "../../middleware/auth.js";
import xss from "xss"

export const router = express.Router()

//POST - create a new message
router.post('/risichat/new-message', auth, async (req, res) => {

    const newMessage = req.body

    let addedMessage = await dbRisichat.collection('general').insertOne({
        author_id: req.tokenUser.user_id,
        timestamp: Date.now(),
        edited_timestamp: null,
        content: xss(newMessage.content),
        reactions: []
    })

    if (addedMessage.acknowledged) {
        res.status(201).send({message:'Message added', id: addedMessage.insertedId.toLocaleString()})
    } else {
        res.status(500).send({message:'A error occurred while adding the message'})
    }


});


//POST - update a existing message
router.post('/risichat/update-message/:id', async (req, res) => {

    let updatedMessage = await dbRisichat.collection('general').updateOne({message_id : parseInt(req.params.id)}, {$set: req.body})

    if (updatedMessage.acknowledged && updatedMessage.matchedCount){
        res.send({message:'Message updated'})
    } else if (!updatedMessage.matchedCount) {
        res.status(204).send()
    } else {
        res.status(500).send({message:'A error occurred while updating the message'})
    }
});