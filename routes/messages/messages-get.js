import express from "express";
import { msgColl } from "../../db-connexion.js";

export const router = express.Router()

// GET - retrieve all messages
router.get('/risichat/messages', async (req, res) => {
    res.send(await msgColl.find().toArray())
});


//GET - retrieve messages from a specified user
router.get('/risichat/messages/:username', async (req, res) => {

    res.send(await msgColl.find({username: req.params.username}).toArray())
});