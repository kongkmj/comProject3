const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var tempOutSchema = new Schema({
  status: {type:String},
  date:{type:String},
  time:{type:String},
  createdAt:{type:Date,default:Date.now},
});

var TempOut = mongoose.model('TempOut',tempOutSchema);
module.exports=TempOut;
