const appError = require('../utils/appError');
const handleCasteError = err =>{

      const  message = `Invalid ${err.path}: ${err.value}`
      
      return new appError(message,404);
         
    
}
const handleDuplicateError = err =>{
    
      const  message = `"${err.keyValue.name}" already exists. Please try another value.`
      
      return new appError(message,404);
         
    
}
const sendErrorDev = (err,res) =>{
    res.status(err.statusCode).send({
        status:err.status,
        message:err.message,
        error:err,
        stack:err.stack
    })
}

const sendErrorProd = (err,res) =>{
    
    res.status(err.statusCode).send({
        status:err.status,
        message:err.message,
    })
}

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'fail';
    err.message = err.message || `failed to find ${req.originalUrl}`;
    if(process.env.nodeEnv === 'development'){
     
            sendErrorDev(err,res);
        

    }
    else if(process.env.nodeEnv === 'production'){
        let error = {...err};
    
        if(err.name === 'CastError'){
            error = handleCasteError(error);
            sendErrorProd(error,res);
        }
        else if(err.code ===11000){
            error = handleDuplicateError(error);
            sendErrorProd(error,res);
        }
     else
      sendErrorProd(error,res);
    }
   
}