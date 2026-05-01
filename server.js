const dns = require('dns');

dns.setServers(['8.8.8.8', '1.1.1.1']);
dns.setDefaultResultOrder('ipv4first');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://YOUR_GITHUB_PAGES_URL.github.io']
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log('Node DNS servers:', dns.getServers());


mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

app.use('/api/projects', require('./routes/projects'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/payment', require('./routes/payment'));

app.get('/', (req, res) => res.json({ message: 'Portfolio API running' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
