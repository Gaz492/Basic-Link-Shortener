const express = require('express');
const mongoose = require('mongoose');
const URLShorten = mongoose.model('URLShorten');
const router = express.Router();

router.get('/:code', async (req, res, next) => {
    const urlCode = req.params.code;
    const item = await URLShorten.findOne({urlCode: urlCode});
    if (item) {
        res.redirect(item.originalURL);
    }else{
        res.redirect('/error')
    }
});

module.exports = router;
