const mongoose = require('mongoose');
const {Schema} = mongoose;

const urlSchema = new Schema({
    originalURL: String,
    urlCode: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
    // _id: {type: Number},
    // url: '',
    // createdAt: ''
});

mongoose.model('URLShorten', urlSchema);

// module.exports = {URL};