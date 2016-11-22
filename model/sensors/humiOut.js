const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var humiOutSchema = new Schema({
  status: {type:String},
  date:{type:String},
  time:{type:String},
});

var HumiOut = mongoose.model('HumiOut',humiOutSchema);
module.exports=HumiOut;
