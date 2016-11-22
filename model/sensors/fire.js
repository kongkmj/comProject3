const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var fireSchema = new Schema({
  status: {type:String},
  date:{type:String},
  time:{type:String},
});

var Fire = mongoose.model('Fire',fireSchema);

module.exports=Fire;
