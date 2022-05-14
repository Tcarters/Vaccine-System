const mongoose = require('mongoose');
const { schemaOptions } = require ('./modelOptions');
const Schema = mongoose.Schema;



const placeSchema = new mongoose.Schema({
   name: {
       type: String,
       required: true
   },
   address: {
       type: String,
       required: true
   },
   creator: {
       type: Schema.Types.ObjectId,
       ref: 'User',
       required: true
   }

}, schemaOptions);

module.exports = mongoose.model('Place', placeSchema);