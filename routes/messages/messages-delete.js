import express from "express";
import { dbRisichat } from "../../db-connexion.js";

export const router = express.Router()

//DELETE - delete a existing message
router.delete('/risichat/delete-message/:id', async (req, res) => {

    let deletedMessage = await dbRisichat.collection('general').deleteOne({message_id : parseInt(req.params.id)})


    if (deletedMessage.acknowledged && deletedMessage.deletedCount){
        res.send({message:'Message deleted'})
    } else if (!deletedMessage.deletedCount) {
        res.status(204).send()
    } else {
        res.status(500).send({message:'A error occurred while deleting the message'})
    }
})