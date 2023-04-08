const url = 'http://localhost:8000'

const uploadImage =(filename,file) =>{
    if(!file){
        return{
            statusCode: 404,
            message:'Not found'
        }
    }
    else{
        const imageUrl = `${url}/file/${file.filename}`
        return{
            statusCode: 200,
            imageUrl: imageUrl
        }
    }
}

module.exports={
    uploadImage
}