import express from 'express';
import bodyParser from "body-parser";
import {MongoClient} from 'mongodb'
import {ObjectId} from "mongodb";
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()
const app = express();
const port = 3000;
const mongoUri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/?authSource=admin`
const client = new  MongoClient(mongoUri)
let msgColl = client.db('risichat').collection('general')

async function mongoConnect() {
    try {
        await client.connect();

    } catch (e) {
        console.error(e);
    }
}


app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


let createMessage = async (newMessage) => {
    await msgColl.insertOne(newMessage)
}

let findUserMessages = async (nameUser) => {
    return await msgColl.find({username: nameUser}).toArray()
}

let findAllMessages = async () => {
    return await msgColl.find().toArray()
}

let updateMessage = async (id, updatedMessage) => {
    const objectId = new ObjectId(id);
    await msgColl.updateOne({_id : objectId}, {$set: updatedMessage})
}

let deleteMessage = async (id) => {
    const objectId = new ObjectId(id);
    await msgColl.deleteOne({_id : objectId})
}


app.get('/messages', async (req, res) => {
    res.send(await findAllMessages())
});


app.get('/messages/:username', async (req, res) => {

    res.send(await findUserMessages(req.params.username))
});




app.post('/new-message', async (req, res) => {

    const newMessage = req.body
    let seqDoc = await client.db('risichat').collection('counters').findOneAndUpdate({id: 'messageId'}, {$inc: {seqValue: 1}}, {returnOriginal: false});

    await createMessage({
        message_id: seqDoc.value.seqValue,
        timestamp: Date.now(),
        username: newMessage.username,
        message_content: newMessage.message_content
    })

    res.send('Message received chief')
});


app.post('/update-message/:id', async (req, res) => {
    await updateMessage(req.params.id, req.body)
    res.send('Messaged updated chief')
});




app.delete('/delete-message/:id', async (req, res) => {
    await deleteMessage(req.params.id)
    res.send('Message deleted chief')
})


mongoConnect().catch(console.error);
app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));