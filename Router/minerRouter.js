const express = require('express')
const {mineBlock} =require('../controller/minerController')

const router = express.Router();

router.get('/mine',mineBlock);

module.exports = router;