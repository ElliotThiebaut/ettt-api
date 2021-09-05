import express from "express";
import { dbRisichat } from "../../db-connexion.js";
import {verifyToken as auth} from "../../middleware/auth.js";
import {ObjectId} from "mongodb";

export const router = express.Router()



// GET - retrieve all messages
router.get('/risichat/messages', auth, async (req, res) => {

    let optionsQuery = {
        sort: {timestamp: -1}
    }

    if (req.query.order && req.query.order === 'first') {
        optionsQuery.sort = {timestamp: 1}
    }
    if (req.query.limit) {
        optionsQuery.limit = parseInt(req.query.limit)
    }
    if (req.query.skip) {
        optionsQuery.skip = parseInt(req.query.skip)
    }

    const responseDB = await dbRisichat.collection('general').find({}, optionsQuery).toArray()

    let messages = []
    for (const message of responseDB) {
        const authorMessage = await dbRisichat.collection('users').findOne({_id: new ObjectId(message.author_id)}, {projection: {password: 0, verificationToken: 0, accessToken: 0}})
        let author = authorMessage
        if (!authorMessage) {
            author = {
                username: "Deleted User",
                avatarUrl: "https://static.thenounproject.com/png/1995052-200.png",
                roles: [
                    "user"
                ]
            }
        }

        messages.push({
            _id: message._id,
            author,
            timestamp: message.timestamp,
            edited_timestamp: message.edited_timestamp,
            content: message.content
        })
    }

    if (responseDB.length) {
        res.send({
            metadata: {
                nbMessage: responseDB.length
            },
            messages
        })
    } else if (responseDB.length === 0) {
        console.log(`No message found in /messages/get-all`)
        res.status(204).send({message: 'No messages found'})
    } else {
        console.log(`A error occurred while retrieving the messages in /messages/get-all`)
        res.status(500).send({message: 'A error occurred while retrieving the messages'})
    }

});


//GET - retrieve messages from a specified user
router.get('/risichat/messages/:author_id', auth, async (req, res) => {
    let optionsQuery = {
        sort: {timestamp: -1}
    }

    if (req.query.order && req.query.order === 'first') {
        optionsQuery.sort = {timestamp: 1}
    }
    if (req.query.limit) {
        optionsQuery.limit = parseInt(req.query.limit)
    }
    if (req.query.skip) {
        optionsQuery.skip = parseInt(req.query.skip)
    }

    const responseDB = await dbRisichat.collection('general').find({author_id: req.params.author_id}, optionsQuery).toArray()

    let messages = []
    for (const message of responseDB) {
        const authorMessage = await dbRisichat.collection('users').findOne({_id: new ObjectId(message.author_id)}, {projection: {password: 0, verificationToken: 0, accessToken: 0}})
        let author = authorMessage
        if (!authorMessage) {
            author = {
                username: "Deleted User",
                avatarUrl: "https://static.thenounproject.com/png/1995052-200.png",
                roles: [
                    "user"
                ]
            }
        }
        messages.push({
            _id: message._id,
            author,
            timestamp: message.timestamp,
            edited_timestamp: message.edited_timestamp,
            content: message.content
        })
    }

    if (responseDB.length) {
        res.send({
            metadata: {
                nbMessage: responseDB.length
            },
            messages
        })
    } else if (responseDB.length === 0) {
        console.log(`No message found in /messages/get-by-user`)
        res.status(204).send({message: 'No messages found'})
    } else {
        console.log(`A error occurred while retrieving the messages in /messages/get-by-user`)
        res.status(500).send({message: 'A error occurred while retrieving the messages'})
    }

});