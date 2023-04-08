const express = require('express')
const server = express()
const cors = require('cors')
const userservice = require('./services/userService')
const postservice = require('./services/postService')
const chatservice = require('./services/chatService')

const imageservice = require('./services/imageService')
const jwtMiddleware = require('./middlewares/jwtMiddleware')
const imageMiddleware = require('./middlewares/imageUploadmiddleware')

server.use(cors({
    origin:'http://localhost:3000'
}))

//to parse json data
server.use(express.json({limit:'25mb'}))
server.listen(8000,()=>{
    console.log('server started at 8000');
})

//register api call
server.post('/register',(req,res)=>{
    userservice.register(req.body.fname,req.body.lname,req.body.email, req.body.phone, req.body.pwd,req.body.photo,req.body.dob).then((result)=>{
        res.status(result.statusCode).json(result)
    })
})
//login api call
server.post('/login', (req,res)=>{
    userservice.login(req.body.phone, req.body.pwd).then((result)=>{
        res.status(result.statusCode).json(result)
    })
})


//upload story image
// server.post('/upload_image',imageMiddleware.upload.single('imageUrl'), (req,res)=>{
//     console.log(req.body);
//     imageservice.uploadImage(req.body.name, req.body.file).then((result)=>{
//         res.status(result.statusCode).json(result)

//     })
// })
//add story api call
server.post('/add_story',jwtMiddleware.jwtMiddleware,(req,res)=>{
    postservice.addStory(req.body.userId,req.body.username,req.body.userphoto,req.body.title,req.body.description,req.body.photo,req.body.createdDate).then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//get all posts
server.get('/all_posts',(req,res)=>{
    postservice.getAllPosts().then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//get a particular post 
server.get('/get_post/:postId',(req,res)=>{
    postservice.getPost(req.params.postId).then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//add comments
server.post('/add_comment',jwtMiddleware.jwtMiddleware,(req,res)=>{
    postservice.addComment(req.body.postId,req.body.userId,req.body.username,req.body.userphoto,req.body.comment).then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//delete comment
server.post('/delete_comment',jwtMiddleware.jwtMiddleware, (req,res)=>{
    postservice.deleteComment(req.body.postId, req.body.commentId).then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//delete post
server.delete('/delete_post/:postId',jwtMiddleware.jwtMiddleware, (req,res)=>{
    postservice.deletePost(req.params.postId).then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//update post
server.put('/update_post/:postId',jwtMiddleware.jwtMiddleware, (req,res)=>{
    postservice.updatePost(req.params.postId, req.body.title, req.body.description, req.body.photo).then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//add friend
server.post('/add_friend',jwtMiddleware.jwtMiddleware, (req,res)=>{
    userservice.addFriend(req.body.fromId, req.body.toId,req.body.fromName, req.body.fromPhoto).then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//accept friend
server.post('/accept_friend',jwtMiddleware.jwtMiddleware, (req,res)=>{
    userservice.acceptFriend(req.body.fromId, req.body.toId,req.body.toName, req.body.toPhoto, req.headers.authorization).then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//create chat
server.post('/create_chat', (req,res)=>{
    chatservice.createChat(req.body.senderId, req.body.receiverId).then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//get chat of a user
server.get('/get_all_chat/:userId',(req,res)=>{
    chatservice.getChat(req.params.userId).then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//get chat includes two  users
server.get('/get_chat/:firstId/:secondId',(req,res)=>{
    chatservice.getConversation(req.params.firstId, req.params.secondId).then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//add message
server.post('/add_message', (req,res)=>{
    chatservice.addMessage(req.body.chatId,req.body.senderId, req.body.text).then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//get messages of a chat
server.get('/get_messages/:chatId',(req,res)=>{
    chatservice.getMessage(req.params.chatId).then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//get friend details
server.get('/get_friend/:userId',(req,res)=>{
    userservice.getFriend(req.params.userId).then((result)=>{
        res.status(result.statusCode).json(result)
    })
})