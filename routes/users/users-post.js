import express from "express";
import bcrypt from "bcrypt";
import {dbRisichat} from "../../db-connexion.js";
import {ObjectId} from "mongodb";
import {verifyToken as auth} from "../../middleware/auth.js";

export const router = express.Router()
const saltRounds = 10;

//POST - update a existing user
router.post('/risichat/update-user/:id', auth, async (req, res) => {
    const updateUser = {
        $set: {}
    }

    if (req.body.username) {
        updateUser.$set.username = req.body.username
    }
    if (req.body.email) {
        updateUser.$set.email = req.body.email
    }
    if (req.body.roles) {
        updateUser.$set.roles = req.body.roles
    }
    if (req.body.password) {
        updateUser.$set.password = await bcrypt.hash(req.body.password, saltRounds)
    }

    
    let updatedUser = await dbRisichat.collection('users').updateOne({_id : new ObjectId(req.params.id)}, updateUser)

    if (updatedUser.acknowledged && updatedUser.matchedCount){
        res.send({message:'User updated'})
    } else if (!updatedUser.matchedCount) {
        res.status(204).send()
    } else {
        res.status(500).send({message:'A error occurred while updating the user'})
    }
})