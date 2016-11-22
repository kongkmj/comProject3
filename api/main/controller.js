const mongoose = require('mongoose');
const TempIn = require('../../model/sensors/tempIn');
const Aircon = require('../../model/devices/aircon');
const Door = require('../../model/devices/door');
const Light = require('../../model/devices/light');

exports.index = (req,res)=>{
  var status ="";
  var icon = "";
  var toggle = "";
  var status2 ="";
  var toggle2 = "";
  var status3 ="";
  var toggle3 = "";
  Door.findOne({}).sort({createdAt:-1}).exec((err,data)=>{

    if(data ==null){
      status = 'CLOSE';
      icon = "fa fa-lock fa-5x";
      toggle = "fa fa-toggle-off fa-2x";
    }
    else{
     status =""+data.status;
     icon = ""+data.icon;;
     toggle = ""+data.toggle;
     console.log(status);
   }

   Aircon.findOne({}).sort({createdAt:-1}).exec((err,data2)=>{

     if(data2 ==null){
       status2 = 'OFF';
       toggle2 = "fa fa-toggle-off fa-2x";
     }
     else{
      status2 =""+data2.status;
      toggle2 = ""+data2.toggle;
    }

    Light.findOne({}).sort({createdAt:-1}).exec((err,data3)=>{

      if(data3 ==null){
        status3 = 'OFF';
        toggle3 = "fa fa-toggle-off fa-2x";
      }
      else{
       status3 =""+data3.status;
       toggle3 = ""+data3.toggle;
     }
    return res.render('index',{data:status,data2:icon,data3:toggle,data4:status2,data5:toggle2,data6:status3,data7:toggle3});
     })
    })
  })

}
exports.login = (req,res)=>{
  return res.render('login');
}
exports.mealPlanner = (req,res)=>{
  return res.render('meal-planner');
}

exports.temp = (req,res)=>{
  return res.render('temp');
}
exports.humi = (req,res)=>{
  return res.render('humi');
}
exports.gas = (req,res)=>{
  return res.render('gas');
}
exports.fire = (req,res)=>{
  return res.render('fire');
}
