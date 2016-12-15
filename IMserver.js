var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');

// Mongoose import

var mongoose = require('mongoose');

// Mongoose connection to MongoDB 

mongoose.connect('mongodb://localhost/FIM', function (error) {
    if (error) {
        console.log(error);
    }
});

// Mongoose Schema definition

var Schema = mongoose.Schema;

var FacSchema = new Schema(
{
    Aname: 'string',
    CAname: 'string',
    ToPaper: 'string',
    TIoPaper: 'string',
    CTitle: 'string',
    Spg: 'string',
    Epg: 'string',
    place: 'string',
    Vno : 'string',
    IndexedBy: 'string'
});

var LogSchema = new Schema(
{
    name: 'string',
    branch: 'string',
    phonenumber: 'string',
    emailID: 'string',
    password: 'string',
});


var fdetails = mongoose.model('fdetail', FacSchema);

var logs = mongoose.model('log', LogSchema);

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://localhost:%s", port)

// URLS management
    
    
app.post('/postFacD',function(req, res){
		var fd = new fdetails({
        Aname : req.body.Aname,
        CAname : req.body.CAname ,
        ToPaper : req.body.ToPaper ,
        TIoPaper : req.body.TIoPaper ,
        CTitle : req.body.CTitle,
        Spg : req.body.Spg,
        Epg : req.body.Epg,
        place : req.body.place,
        Vno : req.body.Vno,
        IndexedBy : req.body.IndexedBy
        });
		fd.save(function(err, fd) {
			if (err){
				return res.send(500, err);
			}
			return res.json(fd);
		});
        console.log(fd)
	});     

app.post('/postLD',function(req, res){
        var Ld = new logs({
        name : req.body.name,
        branch : req.body.branch ,
        phonenumber : req.body.phonenumber ,
        emailID : req.body.emailID ,
        password : req.body.password ,
        });
        Ld.save(function(err, Ld) {
            if (err){
                return res.send(500, err);
            }
            return res.json(Ld);
        });
        console.log(Ld)
    }); 

app.get('/FDetails', function (req, res) {
    fdetails.find({}, function (err, docs) {
        res.json({ docs: docs });
    });
});

app.get('/LDetails', function (req, res) {
    logs.find({}, function (err, docs) {
        res.json({ docs: docs });
    });
});


/*app.get('/printData', function (req, res) {
    console.log('request made....print 1 ');
   /* pdf.create(html).toStream(function(err, stream){
        console.log(stream);
        stream.pipe(res);
    });

    phantom.create().then(function(ph) {
    ph.createPage().then(function(page) {
        page.open("http://localhost:8081/displaydetails").then(function(status) {
            page.render('publications.pdf').then(function() {
                console.log('Page Rendered');
                ph.exit();
            });
        });
    });
});
});*/

app.get('/displaydetails', function (req, res) {
    res.sendFile(__dirname + '/displaydetails1.html');
});
    
app.get('/home', function(req, res){
    res.sendFile(__dirname + '/main.html');
});

app.get('/home1', function(req, res){
    res.sendFile(__dirname + '/home.html');
});

app.get('/login', function(req, res){
    res.sendFile(__dirname + '/login.html');
});

app.get('/signup', function(req, res){
    res.sendFile(__dirname + '/signUp.html');
});


});