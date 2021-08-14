import express from "express";
import { dbRisichat } from "../../db-connexion.js";

export const router = express.Router()



// GET - retrieve all messages
router.get('/risichat/messages', async (req, res) => {

    let optionsQuery = {
        sort: {message_id: -1}
    }

    if (req.query.order && req.query.order === 'first') {
        optionsQuery.sort = {message_id: 1}
    }
    if (req.query.limit) {
        optionsQuery.limit = parseInt(req.query.limit)
    }
    if (req.query.skip) {
        optionsQuery.skip = parseInt(req.query.skip)
    }

    const responseDB = await dbRisichat.collection('risichat').find({}, optionsQuery).toArray()

    if (responseDB.length) {
        res.send({
            metadata: {
                nbMessage: responseDB.length
            },
            data: responseDB
        })
    } else if (responseDB.length === 0) {
        res.status(204).send()
    } else {
        res.status(500).send({message: 'A error occurred while retrieving the messages'})
    }

});


//GET - retrieve messages from a specified user
router.get('/risichat/messages/:username', async (req, res) => {

    let optionsQuery = {
        sort: {message_id: -1}
    }

    if (req.query.order && req.query.order === 'first') {
        optionsQuery.sort = {message_id: 1}
    }
    if (req.query.limit) {
        optionsQuery.limit = parseInt(req.query.limit)
    }
    if (req.query.skip) {
        optionsQuery.skip = parseInt(req.query.skip)
    }

    const responseDB = await dbRisichat.collection('risichat').find({username: req.params.username}, optionsQuery).toArray()

    if (responseDB.length) {
        res.send({
            metadata: {
                nbMessage: responseDB.length
            },
            data: responseDB
        })
    } else if (responseDB.length === 0) {
        res.status(204).send()
    } else {
        res.status(500).send({message: 'A error occurred while retrieving the messages'})
    }

});