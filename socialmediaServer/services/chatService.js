const db = require('./db')

const createChat =(senderId, recieverId)=>{
    return db.Chat.findOne({
        members:{$all : [senderId, recieverId]}
    }).then((data)=>{
        if(data){
            return {
                statusCode:200,
                chat:data
            }
        }
        else{
            const newChat = new db.Chat({
                members : [senderId, recieverId]
            })
            newChat.save()
            return{
                statusCode:200,
                chat: newChat
            }
        }
    })      
}

//get chats of a user
const getChat =(userId) =>{
    return db.Chat.find({
        members:Number(userId)
    }).then((data)=>{
        if(data){
            return{
                statusCode:200,
                chats:data
            }
        }
        else{
            return{
                statusCode:404,
                message:"No chats"
            }
        }
    })
}

//get conversation of two users
const getConversation =(firstId, secondId) =>{
    return db.Chat.findOne({
        members:{$all : [firstId, secondId]}
    }).then((data)=>{
        if(data){
            return{
                statusCode:200,
                chats:data
            }
        }
        else{
            return{
                statusCode:404,
                message:"No chats"
            }
        }
    })
}

const addMessage =(chatId,senderId,text)=>{
    return db.Message.find().then((data)=>{
        if(data){
            const newMessage = new db.Message({
                chatId: chatId,
                senderId: senderId,
                text: text
            })
            newMessage.save()
            return{
                statusCode:200,
                data: newMessage
            }
        }
        else{
            return{
                statusCode:400,
                message:'Network issues. Try again'
            } 
        }
    })      
}

//get chats of a user
const getMessage =(chatId) =>{
    return db.Message.find({
        chatId: chatId
    }).then((data)=>{
        if(data){
            return{
                statusCode:200,
                messages:data
            }
        }
        else{
            return{
                statusCode:404,
                message:"No chats"
            }
        }
    })
}

module.exports = {
    createChat,
    getChat,
    getConversation,
    addMessage,
    getMessage
}