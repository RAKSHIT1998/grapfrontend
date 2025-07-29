const express = require('express');
const path = require('path');
const app = express();

const restaurants = require('./routes/restaurants');
const driver = require('./routes/driver');

app.use(express.static(path.join(__dirname)));

app.use('/api/restaurants', restaurants);
app.use('/api/driver', driver);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
