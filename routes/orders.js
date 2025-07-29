const express = require('express');
const router = express.Router();

let orders = [];
let idCounter = 1;

router.get('/', (req, res) => {
  res.json(orders);
});

router.post('/', (req, res) => {
  const { items } = req.body;
  if (!Array.isArray(items) || !items.length) {
    return res.status(400).json({ error: 'Invalid order' });
  }
  const order = { id: idCounter++, items, status: 'Pending' };
  orders.push(order);
  res.status(201).json(order);
});

module.exports = router;
