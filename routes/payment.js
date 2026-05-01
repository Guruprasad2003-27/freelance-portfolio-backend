const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Payment = require('../models/Payment');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

router.post('/create-order', async (req, res) => {
  try {
    const { amount, name, email, projectType } = req.body;

    const options = {
      amount: amount * 100,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);

    const payment = new Payment({
      name, email, projectType,
      amount,
      razorpayOrderId: order.id,
      status: 'created'
    });
    await payment.save();

    res.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to create order' });
  }
});

router.post('/verify', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      await Payment.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        { razorpayPaymentId: razorpay_payment_id, status: 'paid' }
      );
      res.json({ success: true, message: 'Payment verified successfully!' });
    } else {
      await Payment.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        { status: 'failed' }
      );
      res.status(400).json({ success: false, message: 'Payment verification failed' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Verification error' });
  }
});

module.exports = router;
