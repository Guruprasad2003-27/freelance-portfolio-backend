const express = require('express');
const router = express.Router();
const { Resend } = require('resend');
const Contact = require('../models/Contact');

const resend = new Resend(process.env.RESEND_API_KEY);

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, projectType, budget, message } = req.body;

    const contact = new Contact({ name, email, phone, projectType, budget, message });
    await contact.save();

    try {
      await resend.emails.send({
        from: 'Portfolio <onboarding@resend.dev>',
        to: process.env.EMAIL_USER,
        subject: `New Project Request: ${projectType} from ${name}`,
        html: `
          <h2>New Project Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Project Type:</strong> ${projectType}</p>
          <p><strong>Budget:</strong> ${budget || 'Not specified'}</p>
          <p><strong>Message:</strong> ${message}</p>
        `
      });
    } catch (emailErr) {
      console.error('Email failed:', emailErr.message);
    }

    const waMessage = encodeURIComponent(
      `Hi! I'm ${name}. I'm interested in: ${projectType}.\nBudget: ${budget || 'TBD'}\n\n${message}`
    );
    const waLink = `https://wa.me/${process.env.WHATSAPP_NUMBER}?text=${waMessage}`;

    res.json({ success: true, whatsappLink: waLink, message: 'Request submitted successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to submit request' });
  }
});

router.get('/all', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching contacts' });
  }
});

module.exports = router;