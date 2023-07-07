const errorHandler = (err, req, res, next) => {
  
  
    let statusCode = err.statusCode || 500; 
    let message = err.message || "Internal Server Error";
  

    if (err.name === "ValidationError") {
      statusCode = 400; 
      message = extractValidationErrors(err);
    } else if (err.name === "UnauthorizedError") {
      statusCode = 401; 
      message = "Unauthorized";
    }
  
    
    console.error("Error:", err);
  
   
    res.status(statusCode).json({ error: message });
  };
  
  export default errorHandler;
  