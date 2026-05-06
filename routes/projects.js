const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Project Schema
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, default: 'Web App' },
  description: { type: String, default: '' },
  tech: [String],
  features: [String],
  icon: { type: String, default: '📁' },
  color: { type: String, default: '#7c5cfc' },
  price: {
    basic: { type: Number, default: 0 },
    standard: { type: Number, default: 0 },
    premium: { type: Number, default: 0 },
  },
  createdAt: { type: Date, default: Date.now },
});

const Project = mongoose.model('Project', projectSchema);

// Default projects to show if DB is empty
const defaultProjects = [
  { id: 1, title: 'Student Attendance System', category: 'Web App', description: 'Digital attendance management for schools and colleges. Mark, track, and generate reports with role-based access.', tech: ['Python', 'Django', 'MySQL'], features: ['Role-based login', 'Attendance reports', 'Student dashboard', 'Export to Excel'], price: { basic: 999, standard: 1500, premium: 3500 }, icon: '📋', color: '#4F46E5' },
  { id: 2, title: 'Resume Analyzer Web App', category: 'AI/ML', description: 'AI-powered tool that analyzes resumes and gives job match scores, keyword suggestions, and improvement tips.', tech: ['Python', 'NLP', 'Streamlit', 'PyPDF2'], features: ['PDF upload', 'ATS score', 'Keyword analysis', 'Skill gap detection'], price: { basic: 999, standard: 1500, premium: 2500 }, icon: '📄', color: '#0891B2' },
  { id: 3, title: 'Expense Tracker', category: 'Web App', description: 'Personal finance tracker with monthly budgeting, category-wise spending charts, and savings suggestions.', tech: ['React', 'Node.js', 'MongoDB', 'Chart.js'], features: ['Budget planning', 'Visual charts', 'Category tracking', 'Monthly reports'], price: { basic: 599, standard: 1500, premium: 2500 }, icon: '💰', color: '#059669' },
  { id: 4, title: 'Emotion Detection', category: 'AI/ML', description: 'Real-time emotion detection using deep learning that identifies human emotions from webcam feed.', tech: ['Python', 'TensorFlow', 'OpenCV', 'Flask'], features: ['7 emotion classes', 'Real-time detection', 'Engagement analytics', 'REST API'], price: { basic: 1500, standard: 3000, premium: 6000 }, icon: '😊', color: '#DC2626' },
  { id: 5, title: 'WhatsApp Web Clone', category: 'Web App', description: 'Full-featured WhatsApp web clone with real-time messaging, group chats, image sharing, and online status.', tech: ['React', 'Node.js', 'Socket.io', 'MongoDB'], features: ['Real-time chat', 'Group messages', 'Image sharing', 'Online status'], price: { basic: 1200, standard: 1700, premium: 2500 }, icon: '💬', color: '#16A34A' },
  { id: 6, title: 'QR Attendance', category: 'Web App', description: 'Dynamic QR code-based attendance system. New QR every session prevents proxy attendance.', tech: ['Python', 'Django', 'QRCode', 'Bootstrap'], features: ['Dynamic QR codes', 'Anti-proxy system', 'Live dashboard', 'Location tracking'], price: { basic: 999, standard: 1500, premium: 2000 }, icon: '📱', color: '#B45309' },
  { id: 7, title: 'AI Student Result Analyzer', category: 'AI/ML', description: 'Smart result analysis tool that predicts student performance and gives personalized study suggestions.', tech: ['Python', 'Scikit-learn', 'Pandas', 'Streamlit'], features: ['Performance prediction', 'Weak area detection', 'Study suggestions', 'Visual reports'], price: { basic: 1000, standard: 1500, premium: 3000 }, icon: '📊', color: '#9333EA' },
];

// GET all projects
router.get('/', async (req, res) => {
  try {
    const dbProjects = await Project.find().sort({ createdAt: -1 });
    if (dbProjects.length > 0) {
      res.json(dbProjects);
    } else {
      res.json(defaultProjects);
    }
  } catch (err) {
    res.json(defaultProjects);
  }
});

// GET single project by id or _id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Try MongoDB _id first
    if (mongoose.Types.ObjectId.isValid(id)) {
      const project = await Project.findById(id);
      if (project) return res.json(project);
    }

    // Fall back to default projects by numeric id
    const project = defaultProjects.find(p => p.id === parseInt(id));
    if (project) return res.json(project);

    res.status(404).json({ message: 'Project not found' });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching project' });
  }
});

// POST — add new project (admin only)
router.post('/', async (req, res) => {
  try {
    const { title, category, description, tech, features, icon, color, price } = req.body;
    const project = new Project({ title, category, description, tech, features, icon, color, price });
    await project.save();
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create project' });
  }
});

// DELETE project
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (mongoose.Types.ObjectId.isValid(id)) {
      await Project.findByIdAndDelete(id);
      return res.json({ message: 'Deleted successfully' });
    }
    res.status(400).json({ message: 'Invalid ID' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete project' });
  }
});

module.exports = router;
