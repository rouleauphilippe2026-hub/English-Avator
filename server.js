

const express = require('express');
const stripe = require('stripe')('YOUR_STRIPE_SECRET_KEY'); // Remplacez par votre clé secrète Stripe
const app = express();
const port = 3000;

app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: req.body.items,
        mode: 'payment',
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel',
    });

    res.json({ id: session.id });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
