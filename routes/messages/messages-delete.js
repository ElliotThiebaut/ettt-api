import express from "express";
import { dbRisichat } from "../../db-connexion.js";
import {verifyToken as auth} from "../../middleware/auth.js";
import {ObjectId} from "mongodb";

export const router = express.Router()

//DELETE - delete a existing message
router.delete('/risichat/messages/:id', auth, async (req, res, next) => {

    let dbMessage = await dbRisichat.collection('general').findOne({_id: new ObjectId(req.params.id)})

    if (!dbMessage) {
        console.log(`No message found with id ${req.params.id} in /message/delete`)
        res.status(204).send({message: 'No message found'})
    }
    if (dbMessage.author_id.toLocaleString() !== req.tokenUser.user_id) {
        console.log('Not authorized to delete user in /users/update-user')

        res.status(401).send({message: 'Not authorized to delete message'})
        return next()
    }

    let deletedMessage = await dbRisichat.collection('general').deleteOne({_id: new ObjectId(req.params.id)})


    if (deletedMessage.acknowledged && deletedMessage.deletedCount){
        res.send({message:'Message deleted'})
    } else if (!deletedMessage.deletedCount) {
        console.log(`No message found with id ${req.params.id} in /message/delete`)
        res.status(204).send({message: 'No message found'})
    } else {
        console.log(`A error occurred while deleting the message with id ${req.params.id} in /messages/delete`)
        res.status(500).send({message:'A error occurred while deleting the message'})
    }
})