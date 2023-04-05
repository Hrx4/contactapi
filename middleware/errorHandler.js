const { constant } = require("../constants");

const errorHandler = (err , req , res , next) =>{
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constant.VALIDATION_ERROR:
            res.json({title: "Validation Failed",messege: err.message , subTrace: err.stack})
            break;
        case constant.NOT_FOUND:
            res.json({title: "Not Found",messege: err.message , subTrace: err.stack})
            break;
        case constant.UNAUTHORIZED:
            res.json({title: "unauthorized",messege: err.message , subTrace: err.stack})
            break;
        case constant.FORBIDDEN:
            res.json({title: "forbidden",messege: err.message , subTrace: err.stack})
            break;
        case constant.SERVER_ERROR:
            res.json({title: "server error",messege: err.message , subTrace: err.stack})
            break;
    
        default:
            console.log("No error");
            break;
    }
    

}
module.exports = errorHandler