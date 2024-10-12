// app.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check connection
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// Middleware to parse JSON
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const indexRouter = require('./routes/index');
const galleryRouter = require('./routes/gallery');
const projectsRouter = require('./routes/projects');
const productsRouter = require('./routes/products');

app.use('/', indexRouter);
app.use('/gallery', galleryRouter);
app.use('/projects', projectsRouter);
app.use('/products', productsRouter);

// Start the server
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
