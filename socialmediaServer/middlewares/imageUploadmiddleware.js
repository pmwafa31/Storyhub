// const multer = require('multer')
// const {GridFsStorage} = require('multer-gridfs-storage')

// console.log("inside middleware");
// const storage = new GridFsStorage({
//     url: 'mongodb://localhost:27017/postappDB',
//     options: {useNewUrlParser: true},
//     file: (request, file)=>{
//         console.log(file);
//         const match = ["image/png", "image/jpg"];

//         if(match.indexOf(file.memeType) === -1) 
//             return`${Date.now()}-blog-${file.originalname}`;

//         return {
//             bucketName: "photos",
//             filename: `${Date.now()}-blog-${file.originalname}`
//         }
//     }
// })

// const upload = multer({storage})

// module.exports = {
//     upload
// }
