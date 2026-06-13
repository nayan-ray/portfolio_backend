import multer from "multer";



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/productImages/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + '-' + file.originalname)
  }
})

const ALLOWED_FILE_TYPES = ['png', 'jpg', 'jpeg'];
  
  const fileFilter =(req, file, cb)=>{
    //take extension name from file
    const extension =  file.mimetype.split('/')[1];
    //check  if extension is in allowed file type

    if( !ALLOWED_FILE_TYPES.includes(extension) ){
       cb(createError(400, 'file type not allowed'), false)
    } else{

      cb(null, true)

    }
   
  }


const upload = multer({ storage: storage, fileFilter: fileFilter, limits : { fileSize : 1024 * 1024 * 5 } }); //5MB

export default upload;