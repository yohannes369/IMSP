



//corect   one

// const express = require('express');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');
// const authRoutes = require('./routes/authRoutes'); // Your existing routes
// const dotenv = require('dotenv');

// dotenv.config();

// const app = express();

// const allowedOrigin = 'http://localhost:5173'; // Your frontend URL

// app.use(cors({
//   origin: allowedOrigin,
//   credentials: true,       // Allow cookies and credentials
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// }));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// app.use('/api/auth', authRoutes);

// app.get('/', (req, res) => {
//   res.send('Inventory Management System backend running...');
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));






const express = require('express');
const passport = require('./config/passport');
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
// const staffRoutes = require('./routes/staffRoutes'); // ✅ Add staff routes
const adminRoutes = require("./routes/adminRoutes" )// ✅ Add admin routes
const itemRoutes = require('./routes/itemRoutes'); // ✅ Add item routes
// const itemRequestRoutes = require('./routes/itemRequestRoutes');

// const managerRoutes = require('./routes/managerRoutes');
const requestRoutes = require('./routes/requestRoutes');

require('dotenv').config();

const app = express();

// ✅ CORS setup for frontend (React at port 5173)
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// ✅ Middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ Session middleware (used by Passport)
app.use(session({
  secret: process.env.SESSION_SECRET || 'jo',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // set secure: true in production
}));

// ✅ Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// ✅ Routes
app.use('/api/auth', authRoutes);   // e.g., login, register, Google OAuth
app.use('/api/admin', adminRoutes); // ✅ Admin actions: create user, assign role, activate/deactivate
app.use('/api/items', itemRoutes);
// app.use('/api/item-requests', itemRequestRoutes);
// app.use('/api/manager', managerRoutes);
app.use('/api', requestRoutes);
// ✅ Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
