const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var airconSchema = new Schema({
  status:{type:String},
  toggle:{type:String},
  date:{type:String},
  time:{type:String},
  createdAt:{type:Date,default:Date.now},
});

var Aircon = mongoose.model('Aircon',airconSchema);
module.exports = Aircon;
