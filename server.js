// server.js
// where your node app starts
process.env.PORT=3000;
// init project
var express = require('express');
var app = express();
var moment=require("moment");

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

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

app.get("/api/timestamp/:date", (req,res)=>{
  if(moment.utc(req.params.date, 'YYYY-M-D', true).isValid()){
    res.json({
      unix: new Date(req.params.date).getTime(),
      utc: new Date(req.params.date).toUTCString()
    });
  }else if(isNaN(req.params.date)){
    res.json({
      "error":"Invalid Date"
    });
  }
  else{
    res.json({
      unix: new Date(parseInt(req.params.date)).getTime(),
      utc: new Date(parseInt(req.params.date)).toUTCString()
    });
  }
});
app.get("/api/timestamp/", (req,res)=>{
  let parsed_date=new Date();
  let unixDate=parsed_date.getTime();
  let utcDate=parsed_date.toUTCString();
  res.json({
    unix: unixDate,
    utc: utcDate
  });
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});