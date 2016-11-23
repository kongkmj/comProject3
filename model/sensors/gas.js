const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var gasSchema = new Schema({
  status: {type:String},
  date:{type:String},
  time:{type:String},
  createdAt:{type:Date,default:Date.now},
});

var Gas = mongoose.model('Gas',gasSchema);
module.exports=Gas;
