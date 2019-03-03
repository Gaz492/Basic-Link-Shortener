const express = require('express');
const validUrl = require('valid-url');
const shortId = require("shortid");
const mongoose = require('mongoose');
const URLShorten = mongoose.model('URLShorten');
const router = express.Router();

/* GET users listing. */
router.post('/shorten', async (req, res, next) => {
    const originalURL = req.body.originalURL.toLowerCase();
    const updatedAt = new Date();
    if (validUrl.isUri(originalURL)) {

        try {
            URLShorten.findOne({originalURL}, async(err, shortURL) => {
                if(shortURL){
                    res.status(200).json({urlCode: shortURL.urlCode});
                }else{
                    const urlCode = shortId.generate();
                    const itemToBeSaved = {originalURL, urlCode, updatedAt};

                    // Add the item to db
                    const item = new URLShorten(itemToBeSaved);
                    await item.save();
                    res.status(200).json(itemToBeSaved);
                }
            });
        } catch (err) {
            res.status(401).json('Invalid User Id');
        }
    } else {
        return res.status(401).json('Invalid Original Url.');
    }
});

module.exports = router;
