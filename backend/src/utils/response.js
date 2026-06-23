const AlreadyExist =(res, messege = " alreday exist")=>{
    return res.status(409).json({
    messege:messege,
    success : false,
    })
}
const InternalServerError = (res, messege = "Internal Server Error",error)=>{
    return res.status(500).json({
      message : messege,
      success: false,
      error: error.message,
    });
}
const Created = (res, messege = "Added")=>{
    return res.status(201).json({
    messege: messege,
    success: true,
})
}

const NotFound = (res,messege = "Not Found")=>{
     return res.status(404).json({
    messege: messege,
    success : false,
    })
}

export {
    InternalServerError , Created , NotFound , AlreadyExist
}