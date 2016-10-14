const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();


const http = require('http').Server(app);
const io = require('socket.io')(http);

const port =3000;
var a=0;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/',(req,res)=>{ return res.render('index')});
app.post('/',(req,res)=>{
  //console.log(req.body.led);
  if(req.body.led == 'ON'){
    console.log("LED ON");
  }
 res.redirect('/');
})
function inc() {

  a++;
  //console.log(a);
  io.emit('test',a);
  setTimeout(inc,1000);
}
inc();

http.listen(port,()=>{
  console.log(`Server listening at port 3000`);
});
