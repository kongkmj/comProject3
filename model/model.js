const mongoose = require('mongoose');

//devices
const airconSchema = require('./devices/aircon');
const aircon = mongoose.model('aircon',airconSchema);


const doorSchema = require('./devices/door');
const door = mongoose.model('door',doorSchema);

const lightSchema = require('./devices/light');
const light = mongoose.model('light',lightSchema);

//sensors
const fireSchema = require('./sensors/fire');
const fire = mongoose.model('fire',fireSchema);

const gasSchema = require('./sensors/gas');
const gas = mongoose.model('gas',gasSchema);

const humiInSchema = require('./sensors/humiIn');
const humiIn = mongoose.model('humiIn',humiInSchema);

const humiOutSchema = require('./sensors/humiOut');
const humiOut = mongoose.model('humiOut',humiOutSchema);

const tempInSchema = require('./sensors/tempIn');
const tempIn = mongoose.model('tempIn',tempInSchema);

const tempOutSchema = require('./sensors/tempOut');
const tempOut = mongoose.model('tempOut',tempOutSchema);

module.exports = Model;
