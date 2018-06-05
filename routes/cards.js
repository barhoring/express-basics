const express = require('express');
const router = express.Router();
const { data } = require('../data/flashcardData.json');
const { cards } = data; //  data.cards

router.use(function(req, res, next){
    if(!req.cookies.username)
        return res.redirect('/hello');
    next();
});

router.get('/:id/card-:side', function (req, res) {
    const { id } = req.params;
    const { side } = req.params;
    const quesOrAns = side === 'front' ? 'question' : 'answer';
    const name = req.cookies.username;
    const text = cards[id][quesOrAns];
    let templateData = { text, id, name };
    templateData.sideToShow = 'question';   
    if (side === "front") {
        const { hint } = cards[id];
        templateData.hint = hint;
        templateData.sideToShow = 'answer';
        return res.render('card-front', templateData);
    }
    return res.render('card-back', templateData);
});


router.get('/', function (req, res) {
    const id = getRrandomId(cards.length - 1);
    res.redirect(`/cards/${id}/card-front`);
});

function getRrandomId(max) {
    return Math.round(max * Math.random());
}

//module.exports = router;
module.exports = router;