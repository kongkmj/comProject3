const mongoose = require('mongoose');
const TempIn = require('../../model/sensors/tempIn');
const TempOut = require('../../model/sensors/tempOut');
const HumiIn = require('../../model/sensors/humiIn');
const HumiOut = require('../../model/sensors/humiOut');
const Gas = require('../../model/sensors/gas');
const Fire = require('../../model/sensors/fire');
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

  // 도어락 이전데이터
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
   }
   // 에어컨 이전 데이터
   Aircon.findOne({}).sort({createdAt:-1}).exec((err,data2)=>{

     if(data2 ==null){
       status2 = 'OFF';
       toggle2 = "fa fa-toggle-off fa-2x";
     }
     else{
      status2 =""+data2.status;
      toggle2 = ""+data2.toggle;
    }

    //전등 이전 데이터
    Light.findOne({}).sort({createdAt:-1}).exec((err,data3)=>{

      if(data3 ==null){
        status3 = 'OFF';
        toggle3 = "fa fa-toggle-off fa-2x";
      }
      else{
       status3 =""+data3.status;
       toggle3 = ""+data3.toggle;
     }
    return res.render('index',{data:status,data2:icon,data3:toggle,data4:status3,data5:toggle3,data6:status2,data7:toggle2});
     })
    })
  })

}
exports.login = (req,res)=>{
  return res.render('login');
}

exports.door = (req,res)=>{
  Door.find({}).sort({createdAt:-1}).exec((err,door)=>{
    return res.render('door',{data:door});
  })
}

exports.light = (req,res)=>{
  Light.find({}).sort({createdAt:-1}).exec((err,light)=>{
    return res.render('light',{data:light});
  })
}

exports.aircon = (req,res)=>{
  Aircon.find({}).sort({createdAt:-1}).exec((err,aircon)=>{
    return res.render('aircon',{data:aircon});
  })
}

exports.temp = (req,res)=>{
  // 온도 이전 데이터
  TempIn.count().exec((err,cnt1)=>{
    TempOut.count().exec((err,cnt2)=>{
      if(cnt1<20 &&cnt2<20){
        TempIn.find({}).sort({createdAt:-1}).exec((err,tempIn)=>{
            TempOut.find({}).sort({createdAt:-1}).exec((err,tempOut)=>{
             return res.render('temp',{data: tempIn,data2:tempOut,data3:cnt1,data4:cnt2});
          })
        })
      }
      else if(cnt1>=20 && cnt2<20){
        TempIn.find({}).limit(20).sort({createdAt:-1}).exec((err,tempIn)=>{
            TempOut.find({}).sort({createdAt:-1}).exec((err,tempOut)=>{
             return res.render('temp',{data: tempIn,data2:tempOut,data3:20,data4:cnt2});
          })
        })
      }
      else if(cnt2>=20 && cnt1<20){
        TempIn.find({}).sort({createdAt:-1}).exec((err,tempIn)=>{
            TempOut.find({}).limit(20).sort({createdAt:-1}).exec((err,tempOut)=>{
             return res.render('temp',{data: tempIn,data2:tempOut,data3:cnt1,data4:20});
          })
        })
      }
      else{
        TempIn.find({}).limit(20).sort({createdAt:-1}).exec((err,tempIn)=>{
            TempOut.find({}).limit(20).sort({createdAt:-1}).exec((err,tempOut)=>{
             return res.render('temp',{data: tempIn,data2:tempOut,data3:20,data4:20});
          })
        })
      }
    })
  })
}

exports.humi = (req,res)=>{
  // 습도 이전 데이터
  HumiIn.count().exec((err,cnt1)=>{
    HumiOut.count().exec((err,cnt2)=>{
      if(cnt1<20 &&cnt2<20){
        HumiIn.find({}).sort({createdAt:-1}).exec((err,humiIn)=>{
            TempOut.find({}).sort({createdAt:-1}).exec((err,humiOut)=>{
             return res.render('humi',{data: humiIn,data2:humiOut,data3:cnt1,data4:cnt2});
          })
        })
      }
      else if(cnt1>=20 && cnt2<20){
        HumiIn.find({}).limit(20).sort({createdAt:-1}).exec((err,humiIn)=>{
            HumiOut.find({}).sort({createdAt:-1}).exec((err,humiOut)=>{
             return res.render('humi',{data: humiIn,data2:humiOut,data3:20,data4:cnt2});
          })
        })
      }
      else if(cnt2>=20 && cnt1<20){
        HumiIn.find({}).sort({createdAt:-1}).exec((err,humiIn)=>{
            HumiOut.find({}).limit(20).sort({createdAt:-1}).exec((err,humiOut)=>{
             return res.render('humi',{data: humiIn,data2:humiOut,data3:cnt1,data4:20});
          })
        })
      }
      else{
        HumiIn.find({}).limit(20).sort({createdAt:-1}).exec((err,humiIn)=>{
            HumiOut.find({}).limit(20).sort({createdAt:-1}).exec((err,humiOut)=>{
             return res.render('humi',{data: humiIn,data2:humiOut,data3:20,data4:20});
          })
        })
      }
    })
  })
}

exports.gas = (req,res)=>{
  // 가스 이전데이터
  Gas.count().exec((err,cnt)=>{
      if(cnt<20){
        Gas.find({}).sort({createdAt:-1}).exec((err,gas)=>{
             return res.render('gas',{data: gas,data2:cnt});
        })
      }
      else{
        Gas.find({}).limit(20).sort({createdAt:-1}).exec((err,gas)=>{
             return res.render('gas',{data: gas,data2:20});
        })
      }
  })
}
exports.fire = (req,res)=>{
  // 화재 이전 데이터
  Fire.count().exec((err,cnt)=>{
      if(cnt<20){
        Fire.find({}).sort({createdAt:-1}).exec((err,fire)=>{
             return res.render('fire',{data: fire,data2:cnt});
        })
      }
      else{
        Fire.find({}).limit(20).sort({createdAt:-1}).exec((err,fire)=>{
             return res.render('fire',{data: fire,data2:20});
        })
      }
  })
}
