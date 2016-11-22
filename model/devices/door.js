const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var doorSchema = new Schema({
  status:{type:String},
  icon:{type:String},
  toggle:{type:String},
  date:{type:String},
  time:{type:String},
  createdAt:{type:Date,default:Date.now},
});

var Door = mongoose.model('Door',doorSchema);
module.exports = Door;
