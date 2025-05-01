const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Member = require('../models/Member');

// Ensure uploads directory exists
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
  },
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// POST /api/members — Add member
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, role, email, phone } = req.body;
    const image = req.file?.filename;

    if (!name || !role || !email || !image) {
      return res.status(400).json({ 
        error: 'All fields are required including image.',
        required: ['name', 'role', 'email', 'image']
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Check if email already exists
    const existingMember = await Member.findOne({ email });
    if (existingMember) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const member = await Member.create({ name, role, email, phone, image });
    res.status(201).json(member);
  } catch (err) {
    console.error('Error creating member:', err);
    res.status(500).json({ error: 'Server error while creating member.' });
  }
});

// GET /api/members — Get all members
router.get('/', async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.status(200).json(members);
  } catch (err) {
    console.error('Error fetching members:', err);
    res.status(500).json({ error: 'Server error while fetching members.' });
  }
});

// GET /api/members/:id — Get single member
router.get('/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }
    res.status(200).json(member);
  } catch (err) {
    console.error('Error fetching member:', err);
    res.status(500).json({ error: 'Server error while fetching member.' });
  }
});

// DELETE /api/members/:id — Delete member
router.delete('/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    // Delete the member's image file
    const imagePath = path.join(__dirname, '..', 'uploads', member.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await member.deleteOne();
    res.status(200).json({ message: 'Member deleted successfully' });
  } catch (err) {
    console.error('Error deleting member:', err);
    res.status(500).json({ error: 'Server error while deleting member.' });
  }
});

// PATCH /api/members/:id — Update member
router.patch('/:id', upload.single('image'), async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    const updates = {};
    const allowedUpdates = ['name', 'role', 'email', 'phone'];
    
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    if (req.file) {
      // Delete old image if it exists
      const oldImagePath = path.join(__dirname, '..', 'uploads', member.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
      updates.image = req.file.filename;
    }

    const updatedMember = await Member.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedMember);
  } catch (err) {
    console.error('Error updating member:', err);
    res.status(500).json({ error: 'Server error while updating member.' });
  }
});

module.exports = router;
