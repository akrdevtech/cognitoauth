var express = require('express');
var router = express.Router();
const stripeServices = require('../services/stripeServices');

router.post('/payment_methods/card', function (req, res, next) {
    const { number, exp_month, exp_year, cvc } = req.body;
    const card = {
        number,
        exp_month,
        exp_year,
        cvc,
    };
    stripeServices.paymentMethod.create.card(card)
        .then(data => res.send(data))
        .catch(err => res.send(err.message))
});

module.exports = router;
