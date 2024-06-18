class ResponseHandler{
    static ErrorHandler(res,message="Something went wrong",status=400){
        
        res.status(status).json({
            status: 'error',
            message:message,
          });
    }

    static SuccessHandler(res,data,message="Success",status=200){
        res.status(status).json({
            status: 'success',
            data,
            message,
          });
    }
}

module.exports=ResponseHandler