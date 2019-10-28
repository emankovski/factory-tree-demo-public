const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.status(200).send(`${process.env.BUILD_TAG} server is running normally...`)
});

module.exports = router;
