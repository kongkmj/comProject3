const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var lightSchema = new Schema({
  status:{type:String},
  toggle:{type:String},
  date:{type:String},
  time:{type:String},
  createdAt:{type:Date,default:Date.now},
});

var Light = mongoose.model('Light',lightSchema);
module.exports = Light;
