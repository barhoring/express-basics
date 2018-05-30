const express =require('express');
const router = express.Router();

router.get('/', function (req, res) {
    //res.locals.prompt = "Who is burried in Grant's tomb?";
    // hint: "Think about who's tomb it is?"
    res.render('card', {prompt: "Who is burried in Grant's tomb?"});
});

//module.exports = router;
module.exports = router;