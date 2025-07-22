const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./config/db'); // MySQL connection
const authRoutes = require('./routes/authRoutes');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Routes

app.use('/api/auth', authRoutes);
// Test Route
app.get('/', (req, res) => {
  res.send('imventory managment sytem project back end project test in browser API with SQL is running...');
});

const PORT = process.env.PORT || 5000; // Default port for MySQL is 3306, but you can set it in your .env file
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
