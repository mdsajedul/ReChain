const express = require('express')
const {mineBlock, collectReview, getAllReviews} =require('../controller/minerController')

const router = express.Router();

router.get('/mine',mineBlock);
router.post('/collectReview',collectReview)
router.get('/getMempoolData',getAllReviews)


module.exports = router;