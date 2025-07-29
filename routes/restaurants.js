const express = require('express');
const router = express.Router();

const sampleRestaurants = [
  { id: 1, name: 'Pizza Palace' },
  { id: 2, name: 'Sushi Central' },
  { id: 3, name: 'Burger Hub' }
];

router.get('/', (req, res) => {
  res.json(sampleRestaurants);
});

module.exports = router;
