const express = require('express');
const router = express.Router();

let lat = 1.29;
let lng = 103.85;

function move() {
  const deltaLat = (Math.random() - 0.5) * 0.001;
  const deltaLng = (Math.random() - 0.5) * 0.001;
  lat += deltaLat;
  lng += deltaLng;
}

router.get('/', (req, res) => {
  move();
  res.json({ lat, lng });
});

module.exports = router;
