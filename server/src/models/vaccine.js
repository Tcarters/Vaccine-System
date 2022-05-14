const mongoose = require('mongoose');

const { schemaOptions } = require ('./modelOptions');

const vaccineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, schemaOptions);

module.exports = mongoose.model('Vaccine', vaccineSchema);