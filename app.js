const express =require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const app = express();

app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

app.set('view engine', 'pug');

const mainRoutes = require('./routes');
const cardRoutes = require('./routes/cards');

app.use('/static', express.static('public'));
//app.set('views', path.join(__dirname, 'views'));

app.use(mainRoutes);

app.use('/cards', cardRoutes);

app.use(function(req, res, next){
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next){
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});

app.listen(3000, function(){
    console.log('The application run is running on localhost:3000');
});