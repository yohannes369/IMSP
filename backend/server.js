// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const db = require('./config/db'); // MySQL connection
// const authRoutes = require('./routes/authRoutes');
// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// // Routes

// app.use('/api/auth', authRoutes);
// // Test Route
// app.get('/', (req, res) => {
//   res.send('imventory managment sytem project back end project test in browser API with SQL is running...');
// });

// const PORT = process.env.PORT || 5000; // Default port for MySQL is 3306, but you can set it in your .env file
// app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes'); // Your existing routes
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const allowedOrigin = 'http://localhost:5173'; // Your frontend URL

app.use(cors({
  origin: allowedOrigin,
  credentials: true,       // Allow cookies and credentials
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Inventory Management System backend running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
