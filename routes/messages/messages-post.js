import express from "express";
import { dbRisichat } from "../../db-connexion.js";
import {ObjectId} from "mongodb";
import {verifyToken as auth} from "../../middleware/auth.js";
import xss from "xss"

export const router = express.Router()

//POST - create a new message
router.post('/risichat/new-message', auth, async (req, res, next) => {

    const newMessage = req.body

    if (!newMessage.content) {
        console.log('Cannot add message with empty content in /messages/new-message')
        res.status(400).send({message: 'Cannot add message with empty content'})
        return next()
    }

    let addedMessage = await dbRisichat.collection('general').insertOne({
        author_id: req.tokenUser.user_id,
        timestamp: Date.now(),
        edited_timestamp: null,
        content: xss(newMessage.content),
        reactions: {}
    })

    if (addedMessage.acknowledged) {
        console.log(`Message ${addedMessage.insertedId.toLocaleString()} added in /messages/new-message`)
        res.status(201).send({message:'Message added', id: addedMessage.insertedId.toLocaleString()})
    } else {
        console.log('A error occurred while adding the message in /messages/new-message')
        res.status(500).send({message:'A error occurred while adding the message'})
    }


});


//POST - update a existing message
router.post('/risichat/update-message/:id', auth, async (req, res, next) => {

    const messageToUpdate = req.body

    if (messageToUpdate.content) {
        let dbMessage = await dbRisichat.collection('general').findOne({_id: new ObjectId(req.params.id)})

        if (!dbMessage) {
            console.log('No message find in /messages/update-message')
            res.status(404).send({message: 'No message find'})
            return next()
        }

        if (dbMessage.author_id !== req.tokenUser.user_id) {
            console.log('Not authorized to update message in /messages/update-message')
            res.status(401).send({message: 'Not authorized to update message'})
            return next()
        }

        const updateMessage = {
            $set: {
                edited_timestamp: Date.now(),
                content: messageToUpdate.content
            }
        }


        let updatedMessage = await dbRisichat.collection('general').updateOne({_id : new ObjectId(req.params.id)}, updateMessage)


        if (updatedMessage.acknowledged && updatedMessage.matchedCount){
            res.send({message:'Message updated'})
        } else {
            console.log('A error occurred while updating the message in /messages/update-message')
            res.status(500).send({message:'A error occurred while updating the message'})
        }
    } else {
        console.log('Cannot update message with empty content in /messages/update-message')
        res.status(400).send({message: 'Cannot update message with empty content'})
    }

});