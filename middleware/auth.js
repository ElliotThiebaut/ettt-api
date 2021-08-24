import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config()

export const verifyToken = (req, res, next) => {
    let token = ""

    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'No credentials sent' });
    } else {
        token = req.headers.authorization.slice(7)
    }

    try {
        req.tokenUser = jwt.verify(token, process.env.TOKEN_KEY)
    } catch (err) {
        return res.status(401).send({message: 'Invalid Token'});
    }
    return next()
}