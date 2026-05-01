const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  projectType: { type: String, required: true },
  budget: { type: String },
  message: { type: String, required: true },
  status: { type: String, enum: ['new', 'contacted', 'in-progress', 'completed'], default: 'new' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Contact', contactSchema);
