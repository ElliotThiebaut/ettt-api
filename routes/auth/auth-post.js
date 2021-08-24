import express from "express";
import bcrypt from "bcrypt";
import {dbRisichat} from "../../db-connexion.js";
import jwt from "jsonwebtoken";

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

    let findDuplicateUser = await dbRisichat.collection('users').findOne({email: newUser.email.toLowerCase()})
    if (findDuplicateUser) {
        console.log('Email already used in /risichat/auth/register')
        res.status(400).send({message: 'Email already used'})
        return next();
    }

    let addedUser = await dbRisichat.collection('users').insertOne({
        password: passwordHash,
        username: newUser.username,
        email: newUser.email.toLowerCase(),
        avatarUrl: 'https://static.thenounproject.com/png/1995052-200.png',
        verified: 'pending',
        verificationToken: '',
        accessToken:'',
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


router.post('/risichat/auth/login', async (req, res, next) => {
    const user = req.body

    if (!user.password || !user.email) {
        console.log('Missing request parameters in /risichat/auth/login')
        res.status(400).send({message: 'Missing request parameters'})
        return next();
    }

    let dbUser = await dbRisichat.collection('users').findOne({email: user.email.toLowerCase()})
    if (!dbUser) {
        console.log('No user found in /risichat/auth/login')
        res.status(400).send({message: 'No user found'})
        return next();
    }

    if (await bcrypt.compare(user.password, dbUser.password)) {
        const token = jwt.sign(
            { user_id: dbUser._id.toLocaleString(), email: dbUser.email, roles: dbUser.roles },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );

        let updatedUser = await dbRisichat.collection('users').updateOne({_id: dbUser._id},{$set:{accessToken: token}})
        if (updatedUser.acknowledged) {
            console.log(`User ${dbUser._id} logged in successfully in /risichat/auth/login`)
            res.send({user_id: dbUser._id, accessToken: token})
        } else {
            console.log(`Error while updating user accessToken in /risichat/auth/login`)
            res.status(500).send({message:'A error occurred while updating the user'})
        }


    } else {
        console.log('Invalid credentials in /risichat/auth/login')
        res.status(400).send({message: 'Invalid credentials'})
        return next();
    }
})