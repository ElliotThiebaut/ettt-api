const {ObjectId} = require("mongodb");

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


module.exports = {
    createMessage,
    findUserMessages,
    findAllMessages,
    updateMessage,
    deleteMessage
}