var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var methodOverride = require('method-override');
var nodemailer = require("nodemailer");

var app = express();

app.use(express.static(__dirname + '/public'));

app.use(morgan('combined'))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


/*
Here we are configuring our SMTP Server details.
STMP is mail server which is responsible for sending and recieving email.
*/
var smtpTransport = nodemailer.createTransport("SMTP", {
    service: "MAIL SERVICE",
    auth: {
        user: "YOUR EMAIL",
        pass: "PASSWORD"
    }
});
/*------------------SMTP Over-----------------------------*/

/*------------------Routing Started ------------------------*/

app.get('/', function(req, res) {
    res.sendfile('index.html');
});

/*
app.get('/send', function(req, res) {
    var mailOptions = {
        from: req.query.from,
        to: req.query.to,
        subject: req.query.subject,
        text: req.query.text
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response) {
        if (error) {
            console.log(error);
            res.end("error");
        } else {
            console.log("Message sent: " + response.message);
            res.end("sent");
        }
    });
});
*/

app.post('/send', function(req, res, next) {
    // console.log(req.query);
    // console.log(req.body);
    
    mailOptions = req.body;
    console.log(mailOptions);

    smtpTransport.sendMail(mailOptions, function(error, response) {
        if (error) {
            console.log(error);
            res.end("error");
        } else {
            console.log("Message sent: " + response.message);
            res.end("sent");
        }
    });

    // res.set('Content-Type', 'application/json'); // tell Angular that this is JSON
    res.send('success');
})


app.listen(3000, function() {
    console.log("Express Started on Port 3000");
});