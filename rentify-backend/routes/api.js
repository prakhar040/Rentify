const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Property = require('../models/Property');

// User registration
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, password, userType } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword,
      userType,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware for authentication
const auth = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, 'secret');
    req.user = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Post property
router.post('/properties', auth, async (req, res) => {
  try {
    const { place, area, bedrooms, bathrooms, nearbyHospitals, nearbyColleges } = req.body;
    const newProperty = new Property({
      place,
      area,
      bedrooms,
      bathrooms,
      nearbyHospitals,
      nearbyColleges,
      seller: req.user,
    });
    await newProperty.save();
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all properties
router.get('/properties', async (req, res) => {
  try {
    const properties = await Property.find().populate('seller', 'firstName lastName');
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get property by ID
router.get('/properties/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('seller', 'firstName lastName');
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;