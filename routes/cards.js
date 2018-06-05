const express =require('express');
const router = express.Router();
const { data } = require('../data/flashcardData.json');
const { cards } = data; //  data.cards


router.get('/:id', function (req, res) {
    //res.locals.prompt = "Who is burried in Grant's tomb?";
    // hint: "Think about who's tomb it is?"
    const { side } = req.query;
    const { id } = req.params;
    if(!Boolean(side)){ // !side 
        return res.redirect(`/cards/${id}?side=question`);
    }

    const name = req.cookies.username;  
    const text = cards[id][side];
    let templateData = { text, id, name};
    templateData.sideToShow = 'question';  
    if(side === "question"){
        const { hint } = cards[id];
        templateData.hint = hint;
        templateData.sideToShow = 'answer';
    }
    res.render('card', templateData);
});

router.get('/', function(req, res){
    const id = getRrandomId(cards.length - 1);
    console.log(id);
    res.redirect(`/cards/${ id }`);
});

function getRrandomId(max){
    return Math.round(max * Math.random());
}

//module.exports = router;
module.exports = router;