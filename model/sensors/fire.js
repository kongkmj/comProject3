const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var fireSchema = new Schema({
  status: {type:String},
  date:{type:String},
  time:{type:String},
  createdAt:{type:Date,default:Date.now},
});

var Fire = mongoose.model('Fire',fireSchema);

module.exports=Fire;
