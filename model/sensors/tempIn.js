const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var tempInSchema = new Schema({
  status: {type:String},
  date:{type:String},
  time:{type:String},
  createdAt:{type:Date,default:Date.now},
});

var TempIn = mongoose.model('TempIn',tempInSchema);
module.exports=TempIn;
