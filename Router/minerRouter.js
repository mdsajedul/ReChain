const express = require('express')
const {mineBlock, collectReview} =require('../controller/minerController')

const router = express.Router();

router.get('/mine',mineBlock);
router.post('/collectReview',collectReview)


module.exports = router;