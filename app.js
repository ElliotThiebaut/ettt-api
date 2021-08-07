const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const {MongoClient} = require('mongodb');
const db = require('db-functions');

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

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.get('/messages', async (req, res) => {
    res.send(await db.findAllMessages())
});


app.get('/messages/:username', async (req, res) => {

    res.send(await db.findUserMessages(req.params.username))
});




app.post('/new-message', async (req, res) => {

    const newMessage = req.body
    await db.createMessage({
        username: newMessage.name,
        message: newMessage.message
    })

    res.send('Message received chief')
});


app.post('/update-message/:id', async (req, res) => {
    await db.updateMessage(req.params.id, req.body)
    res.send('Messaged updated chief')
});




app.delete('/delete-message/:id', async (req, res) => {
    await db.deleteMessage(req.params.id)
    res.send('Message deleted chief')
})






mongoConnect().catch(console.error);
app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));