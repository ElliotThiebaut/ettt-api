import express from "express";
import bcrypt from "bcrypt";
import {client, dbRisichat} from "../../db-connexion.js";

export const router = express.Router()
const saltRounds = 10;

//POST - create a new user
router.post('/risichat/auth/register', async (req, res,next) => {
    const newUser = req.body
    const passwordHash = await bcrypt.hash(newUser.password, saltRounds)

    if (!newUser.password || !newUser.username || !newUser.email) {
        console.log('Missing request parameters in /risichat/auth/register')
        res.status(400).send({message: 'Missing request parameters'})
        return next();
    }

    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    let valideEmail = emailRegex.test(newUser.email.toLowerCase())
    if (!valideEmail) {
        console.log('Invalid email format in /risichat/auth/register')
        res.status(400).send({message: 'Invalid email format'})
        return next();
    }

    let addedUser = await dbRisichat.collection('users').insertOne({
        password: passwordHash,
        username: newUser.username,
        email: newUser.email,
        avatarUrl: 'https://static.thenounproject.com/png/1995052-200.png',
        verified: 'pending',
        verificationToken: '',
        roles: ['user']
    })


    if (addedUser.acknowledged) {
        console.log(`User added with id ${addedUser.insertedId.toLocaleString()} in /risichat/auth/register`)
        res.status(201).send({message:'User added', id: addedUser.insertedId.toLocaleString()})
    } else {
        console.log('A error occurred while adding the user in /risichat/auth/register')
        res.status(500).send({message:'A error occurred while adding the user'})
    }
})