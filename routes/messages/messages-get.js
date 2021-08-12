import express from "express";
import { msgColl } from "../../db-connexion.js";

export const router = express.Router()

// GET - retrieve all messages
router.get('/risichat/messages', async (req, res) => {

    let optionsQuery = {
        sort: {message_id: -1},
    }

    const queryMaker = (order, limit) => {
        if (order === 'first') {
            return {
                sort: {message_id: 1},
                limit: parseInt(limit)
            }
        } else if (order === 'last') {
             return {
                 sort: {message_id: -1},
                 limit: parseInt(limit)
             }
        } else {
            return false
        }
    }

    if (req.query.limit && req.query.order) {
        optionsQuery = queryMaker(req.query.order, req.query.limit)
    } else if (req.query.limit && !req.query.order) {
        optionsQuery = queryMaker('last', req.query.limit)
    } else if (!req.query.limit && req.query.order) {
        optionsQuery = queryMaker(req.query.order, 0)
    }

    if (optionsQuery) {
        const responseDB = await msgColl.find({}, optionsQuery).toArray()

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

    } else {
        res.status(400).send({message: 'An error occurred with the parameter of the request'})
    }

});


//GET - retrieve messages from a specified user
router.get('/risichat/messages/:username', async (req, res) => {

    let optionsQuery = {
        sort: {message_id: -1},
    }

    const queryMaker = (order, limit) => {
        if (order === 'first') {
            return {
                sort: {message_id: 1},
                limit: parseInt(limit)
            }
        } else if (order === 'last') {
            return {
                sort: {message_id: -1},
                limit: parseInt(limit)
            }
        } else {
            return false
        }
    }

    if (req.query.limit && req.query.order) {
        optionsQuery = queryMaker(req.query.order, req.query.limit)
    } else if (req.query.limit && !req.query.order) {
        optionsQuery = queryMaker('last', req.query.limit)
    } else if (!req.query.limit && req.query.order) {
        optionsQuery = queryMaker(req.query.order, 0)
    }

    if (optionsQuery) {
        const responseDB = await msgColl.find({username: req.params.username}, optionsQuery).toArray()

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

    } else {
        res.status(400).send({message: 'An error occurred with the parameter of the request'})
    }

});