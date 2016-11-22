const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var humiInSchema = new Schema({
  status: {type:String},
  date:{type:String},
  time:{type:String},
});

var HumiIn = mongoose.model('HumiIn',humiInSchema);
module.exports=HumiIn;
