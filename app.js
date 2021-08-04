const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Fake Database
let messages = [
    {
        "name": "fallen",
        "message": "Issou crying",
        'id': 0
    },
    {
        "name": "captain_obvious",
        "message": "goodbye my friend",
        'id': 1
    }
];

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/messages', (req, res) => {
    if (messages) {
        res.json(messages)
    } else {
        res.send('no messages');
    }
});

app.get('/messages/:id', (req, res) => {
    // Reading isbn from the URL
    const id = req.params.id;

    // Searching books for the isbn
    for (let message of messages) {

        if (message.id === parseInt(id)) {
            res.json(message);
            return;
        }
    }

    // Sending 404 when not found something is a good practice
    res.status(404).send('Message not found');
});

app.post('/new', (req, res) => {
    const newMessage = req.body

    console.log(newMessage)
    messages.push(newMessage)

    res.send('Message received chief')
});

app.delete('messages/:id', (req, res) => {
    const id = req.params.id

    messages = messages.filter(i => {
        return i.id !== parseInt(id);
    })

    res.send('Message deleted')
})

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));