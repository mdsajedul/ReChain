
function test(req,res,send){
    res.send('work properly')
}

function getReviewInfo(req,res,send){
    let reviewInfo = req.body;
    res.send(reviewInfo)
}

module.exports={
    test,
    getReviewInfo
}