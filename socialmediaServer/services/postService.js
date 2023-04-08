const db = require('./db')

//add story
const addStory =(id, name, userphoto, title, desc, photo, date)=>{
    return db.Post.find().then((data)=>{
        // let current = new Date();
        // let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
        // let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
        // let dateTime = cDate + ' ' + cTime;
        if(data){
            const newPost = new db.Post({
                userId: id,
                username: name,
                userphoto: userphoto,
                title: title.charAt(0).toUpperCase() + title.slice(1),
                description: desc.charAt(0).toUpperCase() + desc.slice(1),
                photo: photo,
                comments: [],
                createdOn: date
            })
            newPost.save()
            return{
                statusCode:200,
                message:'Your story uploaded successfully!!!!'
            }
        }
        else{
            return{
                statusCode:400,
                message:'Unable to upload. Try again'
            } 
        }
    })      
}

//get all posts
const getAllPosts =() =>{
    return db.Post.find().then((data)=>{
        if(data){
            return{
                statusCode:200,
                posts:data
            }
        }
        else{
            return{
                statusCode:404,
                message:"No posts Found"
            }
        }
    })
}

//get a post
const getPost =(postId) =>{
    return db.Post.findOne({_id:postId}).then((data)=>{
        if(data){
            return{
                statusCode:200,
                post:data
            }
        }
        else{
            return{
                statusCode:404,
                message:"Post not Available"
            }
        }
    })
}

//add comment
const addComment = (postId,userId,username,userphoto,comment)=>{
    return db.Post.findOne({_id:postId}).then((result)=>{
        if(result){      
            db.Comment.findOneAndUpdate(
                {seqname:"idcounter"},
                {"$inc":{"seqvalue":1}},
                {new:true}
            ).then((counter)=>{
                if(counter == null){
                    const newCounter = new db.Comment({
                        seqname:"idcounter",
                        seqvalue:1
                        })
                        newCounter.save()
                        counterValue=1
                }
                else{
                    counterValue = counter.seqvalue
                }

            result.comments.push({
                id: counterValue,
                userId: userId,
                username: username,
                userphoto: userphoto,
                comment: comment,
            })
            result.save()
        })
            return {
                statusCode: 200,
                message:"Comment posted",
                post: result
            }        
        }
        else{
            return {
                statusCode: 404,
                message: 'Something went wrong'
            }
        }
    })
}

//delete comment
const deleteComment= (postId, commentId)=>{
    
    return db.Post.findOne({_id:postId}).then((result)=>{
        if(result){
            let index=result.comments.findIndex(item=>item.id==commentId)
            let val = result.comments.splice(index,1)
            result.save()
          if(val){
                return {
                    statusCode:200,
                    message:"Comment deleted",
                    post: result
                }
            }
            else{
                return {
                    statusCode:401,
                    message:"Something went wrong"
                }
                }
          }
          else{
            
            return {
                statusCode: 401,
                message: "No post found"
            }
          }      
    })
}

//delete post
const deletePost =(postId)=>{
    return db.Post.deleteOne({_id: postId}).then((data)=>{
        if(data.deletedCount >0){

            return{
                statusCode:200,
                message:"Post deleted successfully"
            }
        }
        else{
            return{
                statusCode:404,
                message:'Something went wrong'
            }
        }
    })
}

//update post
const updatePost =(postId, title, desc, photo) =>{
    return db.Post.findByIdAndUpdate(postId,{
        title: title,
        description: desc,
        photo: photo
    }).then((data)=>{
        if(data){
            return{
                statusCode:200,
                message:"Updated successfully",
                post:data
            }
        }
        else{
            return{
                statusCode:404,
                message:"Something went wrong"
            }
        }
    })
}
module.exports ={
    addStory,
    getAllPosts,
    getPost,
    addComment,
    deleteComment,
    deletePost,
    updatePost
}