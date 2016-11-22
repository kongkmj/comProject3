const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var tempOutSchema = new Schema({
  status: {type:String},
  date:{type:String},
  time:{type:String},
});

var TempOut = mongoose.model('TempOut',tempOutSchema);
module.exports=TempOut;
