import express from "express";
import { dbRisichat } from "../../db-connexion.js";
import {ObjectId} from "mongodb";

export const router = express.Router()

//DELETE - delete a existing message
router.delete('/risichat/delete-user/:id', async (req, res) => {

    let deletedUser = await dbRisichat.collection('users').deleteOne({_id: new ObjectId(req.params.id)})


    if (deletedUser.acknowledged && deletedUser.deletedCount){
        res.send({message:'User deleted'})
    } else if (!deletedUser.deletedCount) {
        res.status(204).send()
    } else {
        res.status(500).send({message:'A error occurred while deleting the user'})
    }
})