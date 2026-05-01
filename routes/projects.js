const express = require('express');
const router = express.Router();

const projects = [
  {
    id: 1,
    title: "Student Attendance System",
    category: "Web App",
    description: "A complete digital attendance management system for schools and colleges. Mark, track, and generate reports for student attendance with role-based access for admin and teachers.",
    tech: ["Python", "Django", "MySQL", "Bootstrap"],
    features: ["Role-based login", "Attendance reports", "Student dashboard", "Export to Excel"],
    price: { basic: 3000, standard: 6000, premium: 10000 },
    icon: "📋",
    color: "#4F46E5"
  },
  {
    id: 2,
    title: "Face Attendance System",
    category: "AI/ML",
    description: "AI-powered attendance system using facial recognition. Automatically detects and marks attendance when a student appears in front of the camera.",
    tech: ["Python", "OpenCV", "face_recognition", "Flask", "SQLite"],
    features: ["Real-time face detection", "Auto mark attendance", "Admin panel", "Report generation"],
    price: { basic: 5000, standard: 9000, premium: 15000 },
    icon: "🤖",
    color: "#7C3AED"
  },
  {
    id: 3,
    title: "Resume Analyzer",
    category: "AI/ML",
    description: "AI-powered tool that analyzes resumes and gives job match scores, keyword suggestions, and improvement tips to help students get hired faster.",
    tech: ["Python", "NLP", "Streamlit", "PyPDF2", "spaCy"],
    features: ["PDF upload", "ATS score", "Keyword analysis", "Skill gap detection"],
    price: { basic: 4000, standard: 7000, premium: 12000 },
    icon: "📄",
    color: "#0891B2"
  },
  {
    id: 4,
    title: "Expense Tracker",
    category: "Web App",
    description: "Personal finance tracker with monthly budgeting, category-wise spending charts, and smart savings suggestions for students.",
    tech: ["React", "Node.js", "MongoDB", "Chart.js"],
    features: ["Budget planning", "Visual charts", "Category tracking", "Monthly reports"],
    price: { basic: 2500, standard: 5000, premium: 8000 },
    icon: "💰",
    color: "#059669"
  },
  {
    id: 5,
    title: "Emotion Detection",
    category: "AI/ML",
    description: "Real-time emotion detection system using deep learning that identifies human emotions from webcam feed — useful for engagement analysis.",
    tech: ["Python", "TensorFlow", "OpenCV", "Keras", "Flask"],
    features: ["7 emotion classes", "Real-time detection", "Engagement analytics", "REST API"],
    price: { basic: 5000, standard: 10000, premium: 18000 },
    icon: "😊",
    color: "#DC2626"
  },
  {
    id: 6,
    title: "WhatsApp Web Clone",
    category: "Web App",
    description: "Full-featured WhatsApp web clone with real-time messaging, group chats, image sharing, and online status — built with WebSocket technology.",
    tech: ["React", "Node.js", "Socket.io", "MongoDB", "Cloudinary"],
    features: ["Real-time chat", "Group messages", "Image sharing", "Online status"],
    price: { basic: 6000, standard: 12000, premium: 20000 },
    icon: "💬",
    color: "#16A34A"
  },
  {
    id: 7,
    title: "QR Attendance System",
    category: "Web App",
    description: "Dynamic QR code-based attendance system. New QR every session prevents proxy attendance. Students scan to mark, admin sees live dashboard.",
    tech: ["Python", "Django", "QRCode", "Bootstrap", "SQLite"],
    features: ["Dynamic QR codes", "Anti-proxy system", "Live dashboard", "Location tracking"],
    price: { basic: 3500, standard: 7000, premium: 11000 },
    icon: "📱",
    color: "#B45309"
  },
  {
    id: 8,
    title: "AI Student Result Analyzer",
    category: "AI/ML",
    description: "Smart result analysis tool that predicts student performance, identifies weak areas, and gives personalized study suggestions using machine learning.",
    tech: ["Python", "Scikit-learn", "Pandas", "Streamlit", "Matplotlib"],
    features: ["Performance prediction", "Weak area detection", "Study suggestions", "Visual reports"],
    price: { basic: 4500, standard: 8000, premium: 14000 },
    icon: "📊",
    color: "#9333EA"
  }
];

router.get('/', (req, res) => {
  res.json(projects);
});

router.get('/:id', (req, res) => {
  const project = projects.find(p => p.id === parseInt(req.params.id));
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json(project);
});

module.exports = router;
