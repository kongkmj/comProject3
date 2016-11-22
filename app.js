const express = require('express');
const path = require('path');
const net = require('net');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('events').EventEmitter.prototype._maxListeners = 9999999;

const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);


var now = new Date();
var year = now.getFullYear();
var month = now.getMonth();
var day = now.getDate();
var hour = now.getHours();
var min = now.getMinutes();
var second = now.getSeconds();

const port =3000;
const tcpPort= 5000;
const tcpPort2 = 4444;



const server = net.createServer((client)=>{
  console.log('Client connection :');
  console.log('   local = %s:%s',client.localAddress,client.localport);
  console.log('   remote = %s:%s',client.remoteAddress,client.remotePort);
  //client.setTimeout(500);
  client.setEncoding('utf8');

  // 데이터 수신시
  client.on('data',(data)=>{
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth();
    var day = now.getDate();
    var hour = now.getHours();
    var min = now.getMinutes();
    var second = now.getSeconds();
    var time ='' +year+month+day+hour+min+second;

    var arduinoData =""+data;
    var arduinoArray = arduinoData.split(',');

    // 화재
    var fire = new Fire({
      status: arduinoArray[3],
      date: time,
      time: (hour+":"+min+":"+second)
    })
    fire.save((err,fire)=>{})

    // 가스
    var gas = new Gas({
      status: (arduinoArray[2]-100)/10,
      date: time,
      time: (hour+":"+min+":"+second)
    })
    gas.save((err,gas)=>{})

    // 실외 습도
    var humiOut = new HumiOut({
      status: arduinoArray[1],
      date: time,
      time: (hour+":"+min+":"+second)
    })
    humiOut.save((err,humiOut)=>{})

    // 실외 온도
    var tempOut = new TempOut({
      status: arduinoArray[0],
      date: time,
      time: (hour+":"+min+":"+second)
    })
    tempOut.save((err,tempOut)=>{})

    console.log("아두이노에서 "+arduinoArray);
    io.emit("arduinoArray",arduinoArray);
    io.emit("arduinoTemp",arduinoArray[0]);
    io.emit("arduinoHumi",arduinoArray[1]);
    io.emit("arduinoGas",(arduinoArray[2]-100)/10);
    io.emit("arduinoFire",arduinoArray[3]);
    console.log('Received data from client on port %d: %s', client.remotePort,data.toString());
    console.log('  Bytes received: '+client.bytesRead);
    //writeData(client,'Sending: '+data.toString());
    console.log('  Bytes sent: '+client.bytesWritten);

  });
  client.on('end',()=>{
    console.log('Client diisconnected');
    server.getConnections((err,count)=>{
      console.log('Remaing Connection: '+ count);
    });
  });
  client.on('error',(err)=>{
    console.log('Socket Error: '+JSON.stringify(err));
  });
  client.on('timeout',()=>{
    console.log('Socket Timed out');
  });
});

const server2 = net.createServer((client)=>{
  console.log('Client connection :');
  console.log('   local = %s:%s',client.localAddress,client.localport);
  console.log('   remote = %s:%s',client.remoteAddress,client.remotePort);
  //client.setTimeout(500);
  client.setEncoding('utf8');
  io.on('connection',(socket)=>{

    // 습도 이전데이터
    HumiIn.find({}).limit(20).sort({date:-1}).exec(function (err,data){
      var value = new Array(20);

      for(var i=value.length-1, j=0; i>-1;i--,j++){
        value[j] = data[i];
      }
      HumiOut.find({}).limit(20).sort({date:-1}).exec(function (err,data){
        var value2 = new Array(20);

        for(var i=value.length-1, j=0; i>-1;i--,j++){
          value2[j] = data[i];
        }
        socket.emit("Humi",value,value2);
      });
    });
    // 온도 이전데이터
    TempIn.find({}).limit(20).sort({date:-1}).exec(function (err,data){
      var value = new Array(20);

      for(var i=value.length-1, j=0; i>-1;i--,j++){
        value[j] = data[i];
      }
      TempOut.find({}).limit(20).sort({date:-1}).exec(function (err,data){
        var value2 = new Array(20);

        for(var i=value.length-1, j=0; i>-1;i--,j++){
          value2[j] = data[i];
        }
        socket.emit("Temp",value,value2);
      });
    });

    // 가스 이전데이터
    /*
    Gas.count({date: /^20161022/},function (err,count){
      console.log(count);
    })
   */
      Gas.find({}).limit(20).sort({date:-1}).exec(function (err,data){
        var value = new Array(20);

        for(var i=value.length-1, j=0; i>-1;i--,j++){
          value[j] = data[i];
        }
        socket.emit("Gas",value);
      });




    // 가스 이전데이터
      Fire.find({}).limit(20).sort({date:-1}).exec(function (err,data){
        var value = new Array(20);

        for(var i=value.length-1, j=0; i>-1;i--,j++){
          value[j] = data[i];
        }
        socket.emit("Fire",value);
      });



    // 도어락 소켓
    socket.on('door',(doorcnt)=>{
      console.log("count"+doorcnt);
      var now = new Date();
      var year = now.getFullYear();
      var month = now.getMonth();
      var day = now.getDate();
      var hour = now.getHours();
      var min = now.getMinutes();
      var second = now.getSeconds();
      var time =""+year+month+day+hour+min+second;

      if(doorcnt==true){
        var door = new Door({
          status:"OPEN",
          date : time,
          icon : "fa fa-unlock fa-5x",
          toggle: "fa fa-toggle-on fa-2x",
          time: (hour+":"+min+":"+second)
        })
        door.save((err,door)=>{})

        writeData(client,"1"); // 도어락 OPEN
      }
      else if(doorcnt==false){
        var door = new Door({
          status:'CLOSE',
          icon : "fa fa-lock fa-5x",
          toggle: "fa fa-toggle-off fa-2x",
          date: time,
          time: (hour+":"+min+":"+second)
        })
        door.save((err,door)=>{})

        writeData(client,"2"); // 도어락 CLOSE
      }
    });
    // 전등 소켓
    socket.on('light',(lightcnt)=>{
      var now = new Date();
      var year = now.getFullYear();
      var month = now.getMonth();
      var day = now.getDate();
      var hour = now.getHours();
      var min = now.getMinutes();
      var second = now.getSeconds();
      var time =""+year+month+day+hour+min+second;

      if(lightcnt==true){
        var light = new Light({
          status: 'ON',
          date: time,
          toggle: "fa fa-toggle-on fa-2x",
          time: (hour+":"+min+":"+second)
        })
        light.save((err,light)=>{})

        writeData(client,"3"); // 전등 ON
      }
      else if(lightcnt==false){
        // 전등
        var light = new Light({
          status: 'OFF',
          date: time,
          toggle: "fa fa-toggle-off fa-2x",
          time: (hour+":"+min+":"+second)
        })
        light.save((err,light)=>{})

        writeData(client,"4"); // 전등 OFF
      }
    });
    // 에어컨 소켓
    socket.on('aircon',(airconcnt)=>{
      var now = new Date();
      var year = now.getFullYear();
      var month = now.getMonth();
      var day = now.getDate();
      var hour = now.getHours();
      var min = now.getMinutes();
      var second = now.getSeconds();
      var time =""+year+month+day+hour+min+second;

      if(airconcnt==true){
        var aircon = new Aircon({
          status: 'ON',
          date: time,
          toggle: "fa fa-toggle-on fa-2x",
          time: (hour+":"+min+":"+second)
        })
        aircon.save((err,aircon)=>{})

        writeData(client,"5"); // 에어컨  ON
      }
      else if(airconcnt==false){
        var aircon = new Aircon({
          status: 'OFF',
          date: time,
          toggle: "fa fa-toggle-off fa-2x",
          time: (hour+":"+min+":"+second)
        })
        aircon.save((err,aircon)=>{})

        writeData(client,"6"); // 에어컨 OFF
      }
    });
  })

  // 데이터 수신시
  client.on('data',(data)=>{
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth();
    var day = now.getDate();
    var hour = now.getHours();
    var min = now.getMinutes();
    var second = now.getSeconds();
    var time = year+'/'+month+'/'+day+' '+hour+min+second;


    var raspiData =""+data;
    var raspiArray = raspiData.split(',');


    // 실내 온도
    var tempIn = new TempIn({
      status: raspiArray[0],
      date : time,
      time: (hour+":"+min+":"+second)
    })
    tempIn.save((err,tempIn)=>{})

    // 실내 습도
    var humiIn = new HumiIn({
      status: raspiArray[1],
      date : time,
      time: (hour+":"+min+":"+second)
    })
    humiIn.save((err,humiIn)=>{})




    console.log("라즈베리파이에서 "+raspiArray);
    io.emit("raspiArray",raspiArray);
    io.emit("raspiTemp",raspiArray[0]);
    io.emit("raspiHumi",raspiArray[1]);

    console.log('Received data from client on port %d: %s', client.remotePort,data.toString());
    console.log('  Bytes received: '+client.bytesRead);
    //writeData(client,'Sending: '+data.toString());
    console.log('  Bytes sent: '+client.bytesWritten);
  });
  client.on('end',()=>{
    console.log('Client diisconnected');
    server2.getConnections((err,count)=>{
      console.log('Remaing Connection: '+ count);
    });
  });
  client.on('error',(err)=>{
    console.log('Socket Error: '+JSON.stringify(err));
  });
  client.on('timeout',()=>{
    console.log('Socket Timed out');
  });
});

server.listen(tcpPort,()=>{
  console.log('Sever listening: '+JSON.stringify(server.address()));
  server.on('close',()=>{
    console.log('Server Terminated');
  });
  server.on('error',(err)=>{
    console.log('Server Error: '+JSON.stringify(err));
  });
});

server2.listen(tcpPort2,()=>{
  console.log('Sever listening: '+JSON.stringify(server2.address()));
  server2.on('close',()=>{
    console.log('Server Terminated');
  });
  server2.on('error',(err)=>{
    console.log('Server Error: '+JSON.stringify(err));
  });
});

// TCP 쓰기함수
function writeData(socket,data) {
  var success = !socket.write(data);
  if(!success){
    (function(socket,data){
      socket.once('drain',()=>{
        writeData(socket,data);
      });
    })(socket,data);
  }
}

//DB
mongoose.connect("mongodb://127.0.0.1:27017");
var db = mongoose.connection;
db.once("open",()=>{
  console.log("DB connected");
})
db.on("error",(err)=>{
  console.log("DB ERROR: ",err);
})
//devices
const Aircon = require('./model/devices/aircon');
const Door = require('./model/devices/door');
const Light = require('./model/devices/light');


//sensors
const Fire = require('./model/sensors/fire');
const Gas = require('./model/sensors/gas');
const HumiIn = require('./model/sensors/humiIn');
const HumiOut = require('./model/sensors/humiOut');
const TempIn = require('./model/sensors/tempIn');
const TempOut = require('./model/sensors/tempOut');


// view engine setup
app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/',require('./api/main'));

io.on('connection',(socket)=>{
  console.log('a user connected!');
  socket.on('chat message',function (msg) {
    //time

    if(hour>=12){
      hour = '오후 '+(hour-12);
    }
    else{
      hour = '오전 '+hour;
    }
    var time = hour+':'+min;
    io.emit('chat message',msg,time);
  });
});

http.listen(port,()=>{
  console.log(`Server listening at port 3000`);
});
module.exports = app;
