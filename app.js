const express =require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const app = express();
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

app.set('view engine', 'pug');

app.get('/', function (req, res) {
    console.log('home page');
    const name = req.cookies.username;
    if(!name)
        res.redirect('/hello');
    res.render('index', {name});
});

app.get('/cards', function (req, res) {
    //res.locals.prompt = "Who is burried in Grant's tomb?";
    // hint: "Think about who's tomb it is?"
    res.render('card', {prompt: "Who is burried in Grant's tomb?"});
});

app.get('/hello', function (req, res) {
    const name = req.cookies.username;
    if(name)
        res.redirect('/');
    res.render('hello');
});


app.post('/hello', function (req, res) {
    res.cookie('username', req.body.username);
    res.redirect('/');
    
});

app.listen(3000, function(){
    console.log('The application run is running on localhost:3000');
});

app.post('/goodbye', function(req, res){
    res.clearCookie('username');
    res.redirect('/hello');
});

