require('dotenv').config();
// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//[ME] serve a JSON @ /api endpoint
app.get("/api", (req, res)=>{
  res.json({
    "unix":Date.now(),
    "utc":new Date().toUTCString(),
  })
});

//[ME] routing for the UTC date endpoint
app.get(`/api/:date`, (req, res)=>{
  let myJson = {};
  let {date} = req.params;
  //checking if the string is correct
  let isParsable=(string)=>{
    return isNaN(Date.parse(string))?false:true;
  }
  if(date){
    if(isParsable(date)){
      let myUTC = new Date(date);
      myJson = {
        "utc":myUTC.toUTCString(),
        "unix":myUTC.valueOf(),
      };
    }else if(!isParsable(date) && !isNaN(date)){
      let myUNIX = new Date(Number(date));
      myJson = {
        "utc":myUNIX.toUTCString(),
        "unix":myUNIX.valueOf(),
      };
    }
    else{
      myJson = { error : "Invalid Date" };
    }
  }
  res.json(myJson);

});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
