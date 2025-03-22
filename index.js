// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const foodRoutes = require('./routes/foodRoute.js');
const drinkRoutes = require('./routes/drinksRoute.js');
const brunchRoutes = require('./routes/brunchRoutes.js');

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: 'https://deepnetsoft-test-client.vercel.app', // Correct active frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Use CORS middleware with the specified options
app.use(cors(corsOptions));
app.use(bodyParser.json()); // Middleware to parse JSON

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
app.use('/api/foods', foodRoutes);
app.use('/api/drinks', drinkRoutes);
app.use('/api/brunches', brunchRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
