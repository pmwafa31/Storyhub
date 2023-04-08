const db = require('./db')
const jwt = require('jsonwebtoken')

//register
const register =(firstname,lastname,email,phone,pswd,photo,dob)=>{
    //check account is in mongodb
    let counterValue;
    return db.User.findOne({phone}).then((data)=>{
        if(data){
            //account already exist
            return {
                statusCode:403,//due to user error
                message:'Account already exist!!'
            }
        }
        else{
            db.Counter.findOneAndUpdate(
                {seqname:"idcounter"},
                {"$inc":{"seqvalue":1}},
                {new:true}
            ).then((counter)=>{
                if(counter == null){
                    const newCounter = new db.Counter({
                        seqname:"idcounter",
                        seqvalue:1
                        })
                        newCounter.save()
                        counterValue=1
                }
                else{
                    counterValue = counter.seqvalue
                }

                 //to add new user
                const newUser = new db.User({
                    id:counterValue,
                    firstname:firstname.charAt(0).toUpperCase() + firstname.slice(1),
                    lastname:lastname.charAt(0).toUpperCase() + lastname.slice(1),
                    email:email,
                    phone:phone,
                    password:pswd,
                    photo:photo,
                    dob:dob
                })
            //to save new user in mongoDB
            newUser.save()
            })
           
            return {
                statusCode:200,
                message:'Registration successful!!!You can now login.'
            }
        }
    })
}

//login
const login =(phone,pswd)=>{
    //check phone and pswd in mongodb
    let phn = Number(phone)
    return db.User.findOne({
        phone:phn,
        password:pswd
    }).then((result)=>{
        if(result){
            //generate token
            const token = jwt.sign({phoneNum:phone},'secretsuperkey')
            return {
                statusCode:200,
                message:'Login successful!!',
                name:result.firstname+" "+result.lastname,
                phone:phn,
                id:result.id,
                photo:result.photo,
                about:result.about,
                place:result.place,
                occupation:result.occupation,
                requests:result.requests,
                friends:result.friends,
                dob:result.dob,
                token
            }
        }
        else{
            return {
                statusCode:404,
                message:'Invalid credentials!!'
            }
        }
    })
}

//add friend
const addFriend = (fromId, toId, frm_name,frm_photo)=>{
    return db.User.findOne({id:toId}).then((result)=>{
        if(result){     
            if(result.requests.find(item=>item.id == fromId)){
                return{
                    statusCode: 401,
                    message:"Already sent request earlier",
                }
            } 
            else{
                result.requests.push({
                    id: fromId,
                    username: frm_name,
                    userphoto: frm_photo,
                })
                result.save()
           
                return {
                    statusCode: 200,
                    message:"Request send",
                    }   
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

//accept Friend 
const acceptFriend = (fromId, toId, to_name,to_photo, token)=>{
    return db.User.findOne({id:toId}).then((result)=>{
        let friend = result.requests.find(item =>item.id ==fromId)
        if(result){    
            db.User.findOne({id:fromId}) .then((data)=>{
                data.friends.push({
                            id: toId,
                            username: to_name,
                            userphoto: to_photo,
                        })
                        data.save()             
            })
           
            result.friends.push({
                id: fromId,
                username: friend.username,
                userphoto: friend.userphoto,
            })
            let index=result.requests.findIndex(item=>item.id==fromId)
            result.requests.splice(index,1)
            result.save()
            return {
                statusCode: 200,
                message:'Added to your friend list',
                name:result.firstname+" "+result.lastname,
                    phone:result.phone,
                    id:result.id,
                    photo:result.photo,
                    about:result.about,
                    place:result.place,
                    occupation:result.occupation,
                    requests:result.requests,
                    friends:result.friends,
                    dob:result.dob,
                    token
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

//get chats of a user
const getFriend =(userId) =>{
    return db.User.findOne({
        id: userId
    }).then((result)=>{
        if(result){
            return{
                statusCode:200,
                id:result.id,
                name:result.firstname+" "+result.lastname,
                photo:result.photo
            }
        }
        else{
            return{
                statusCode:404,
                message:"No user"
            }
        }
    })
}

module.exports = {
    register,
    login,
    addFriend,
    acceptFriend,
    getFriend
}