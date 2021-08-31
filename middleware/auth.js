import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { dbRisichat } from "../db-connexion.js";
import {ObjectId} from "mongodb";

dotenv.config()

export const verifyToken = async (req, res, next) => {
    let token = ""

    if (!req.headers.authorization) {
        console.log('No credentials sent in /middleware/auth')
        return res.status(403).send({ message: 'No credentials sent' });
    } else {
        token = req.headers.authorization.slice(7)
    }

    try {
        req.tokenUser = jwt.verify(token, process.env.TOKEN_KEY)
    } catch (err) {
        console.log('Invalid Token in /middleware/auth')
        return res.status(401).send({message: 'Invalid Token'});
    }

    let dbUser = await dbRisichat.collection('users').findOne({_id: new ObjectId(req.tokenUser.user_id)})

    if (!dbUser) {
        console.log('The user associated with the token was not found in /middleware/auth')
        return res.status(404).send({message: 'The user associated with the token was not found'});
    } else if (dbUser.accessToken === token) {
        return next()
    } else {
        console.log('Invalid Token in /middleware/auth')
        return res.status(401).send({message: 'Invalid Token'});
    }


}