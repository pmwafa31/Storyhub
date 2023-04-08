const mongoose = require('mongoose')
mongoose.set('strictQuery', false);

//using mongoose define a connection string
mongoose.connect('mongodb://localhost:27017/postappDB')

userSchema = mongoose.Schema({
    id:Number,
    firstname: String,
    lastname: String,
    email: String,
    phone: Number,
    password: String,
    gender:String,
    dob:String,
    photo:String,
    coverphoto:String,
    place:String,
    occupation:String,
    about:String,
    requests:[],
    friends:[],
    impressions:Number

    })
const User = mongoose.model('User', userSchema)

//table for auto icrement user id
counterSchema = mongoose.Schema({
    seqname:String,
    seqvalue:Number
})
const Counter = mongoose.model('Counter', counterSchema)

//model for stories
postSchema = mongoose.Schema({
    userId:Number,
    username: String,
    userphoto: String,
    title:String,
    description:String,
    photo:String,
    comments:[],
    createdOn: String
    })
const Post = mongoose.model('Post', postSchema)

//table to generate comment id
commentSchema = mongoose.Schema({
    seqname:String,
    seqvalue:Number
})
const Comment = mongoose.model('Comment', commentSchema)

//model for chats
chatSchema = mongoose.Schema({
    members:{
        type: Array
    }
    },
    {
        timestamps: true
    }
)
const Chat = mongoose.model('Chat', chatSchema)

//model for messages
messageSchema = mongoose.Schema({
    chatId:String,
    senderId:String,
    text:String
    },
    {
        timestamps:true
    }
)
const Message = mongoose.model('Message', messageSchema)

module.exports = {
    User,
    Counter,
    Post,
    Comment,
    Chat,
    Message
}