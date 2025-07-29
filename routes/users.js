const express = require('express');
const router = express.Router();

// In-memory user store
const users = {};

// Sign up new user
router.post('/signup', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  if (users[username]) {
    return res.status(409).json({ error: 'User already exists' });
  }
  users[username] = {
    username,
    password,
    profile: { location: '', currency: 'USD' }
  };
  res.status(201).json({ username, profile: users[username].profile });
});

// Login existing user
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users[username];
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  res.json({ username, profile: user.profile });
});

// Get user profile
router.get('/:username', (req, res) => {
  const user = users[req.params.username];
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ username: user.username, profile: user.profile });
});

// Update profile
router.put('/:username', (req, res) => {
  const user = users[req.params.username];
  if (!user) return res.status(404).json({ error: 'User not found' });
  user.profile = { ...user.profile, ...req.body.profile };
  res.json({ username: user.username, profile: user.profile });
});

module.exports = router;
