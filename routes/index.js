const express = require('express');
const mongoose = require('mongoose');
const URLShorten = mongoose.model('URLShorten');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/:code', async (req, res, next) => {
    const urlCode = req.params.code;
    const item = await URLShorten.findOne({urlCode: urlCode});
    if (item) {
        res.redirect(item.originalURL);
    }else{
        res.render('error', {title: 'Error'})
    }
});

module.exports = router;
