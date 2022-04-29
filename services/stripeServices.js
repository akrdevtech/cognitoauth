require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_API_KEY);

const createPaymentMethodCard = async (card) => {
    const paymentMethod = await stripe.paymentMethods.create({
        type: 'card',
        card: {
            number: '4242424242424242',
            exp_month: 4,
            exp_year: 2023,
            cvc: '314',
        },
    });
    return paymentMethod
}


module.exports = {
    paymentMethod: {
        create: {
            card: createPaymentMethodCard,
        }
    }
}