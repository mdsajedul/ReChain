const express = require('express')
const {mineBlock, collectReview, getAllReviews, getBlocks,deleteReview} =require('../controller/minerController')

const router = express.Router();

router.post('/mine',mineBlock);
router.post('/collectReview',collectReview)
router.get('/getMempoolData',getAllReviews)
router.get('/blocks',getBlocks)
router.post('/deleteReview',deleteReview)


module.exports = router;