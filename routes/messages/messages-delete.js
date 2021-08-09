import express from "express";
import { msgColl } from "../../db-connexion.js";

export const router = express.Router()

//DELETE - delete a existing message
router.delete('/risichat/delete-message/:id', async (req, res) => {

    await msgColl.deleteOne({message_id : parseInt(req.params.id)})
    res.send('Message deleted chief')
})