const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.send('Quiz route');
});


module.exports = router;
