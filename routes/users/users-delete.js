import express from "express";
import { dbRisichat } from "../../db-connexion.js";
import {ObjectId} from "mongodb";
import {verifyToken as auth} from "../../middleware/auth.js";

export const router = express.Router()

//DELETE - delete a existing message
router.delete('/risichat/users/:id', auth, async (req, res, next) => {

    let dbUser = await dbRisichat.collection('users').findOne({_id: new ObjectId(req.params.id)})
    if (dbUser._id.toLocaleString() !== req.tokenUser.user_id) {
        console.log('Not authorized to delete user in /users/update-user')
        res.status(401).send({message: 'Not authorized to delete user'})
        return next()
    }

    let deletedUser = await dbRisichat.collection('users').deleteOne({_id: new ObjectId(req.params.id)})


    if (deletedUser.acknowledged && deletedUser.deletedCount){
        res.send({message:'User deleted'})
    } else if (!deletedUser.deletedCount) {
        console.log(`No user found with id ${req.params.id} in /users/delete`)
        res.status(204).send({message:'User not found'})
    } else {
        console.log(`A error occurred while deleting the user with id ${req.params.id} in /users/delete`)
        res.status(500).send({message:'A error occurred while deleting the user'})
    }
})