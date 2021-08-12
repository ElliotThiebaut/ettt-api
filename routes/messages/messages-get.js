import express from "express";
import { msgColl } from "../../db-connexion.js";

export const router = express.Router()

// GET - retrieve all messages
router.get('/risichat/messages', async (req, res) => {
    let responseDB = await msgColl.find().toArray()
    res.send({ ...responseDB })
});


//GET - retrieve messages from a specified user
router.get('/risichat/messages/:username', async (req, res) => {
    let responseDB = await msgColl.find({username: req.params.username}).toArray()
    res.send({ ...responseDB })
});