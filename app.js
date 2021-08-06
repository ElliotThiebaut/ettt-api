const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const {MongoClient} = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config()

const app = express();
const port = 3000;
const mongoUri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/?authSource=admin`
const client = new  MongoClient(mongoUri)
let msgColl = client.db('api-messages').collection('messages')

async function mongoConnect() {
    try {
        await client.connect();

    } catch (e) {
        console.error(e);
    }
}




async function createMessage(newMessage) {
    await msgColl.insertOne(newMessage)
}

async function findUserMessages(nameUser) {
    return await msgColl.find({username: nameUser}).toArray()
}

async function findAllMessages() {
    return await msgColl.find().toArray()
}

async function updateMessage(id, updatedMessage) {
    const objectId = new ObjectId(id);
    await msgColl.updateOne({_id : objectId}, {$set: updatedMessage})
}

async function deleteMessage(id) {
    const objectId = new ObjectId(id);
    await msgColl.deleteOne({_id : objectId})
}




app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.get('/messages', async (req, res) => {
    res.send(await findAllMessages())
});


app.get('/messages/:username', async (req, res) => {

    res.send(await findUserMessages(req.params.username))
});




app.post('/new-message', async (req, res) => {

    const newMessage = req.body
    await createMessage({
        username: newMessage.name,
        message: newMessage.message
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