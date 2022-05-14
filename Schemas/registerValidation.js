const {validationResult} =require('express-validator');

function registerValidation(req,res,next){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.json({erors:errors.array()})
    }
    next()
}

module.exports = registerValidation;