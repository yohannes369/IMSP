



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





 //corect one 


// const express = require('express');
// const passport = require('./config/passport');
// const session = require('express-session');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');
// const authRoutes = require('./routes/authRoutes');
// // const staffRoutes = require('./routes/staffRoutes'); // ✅ Add staff routes
// const adminRoutes = require("./routes/adminRoutes" )// ✅ Add admin routes
// const itemRoutes = require('./routes/itemRoutes'); // ✅ Add item routes
// // const itemRequestRoutes = require('./routes/itemRequestRoutes');

// // const managerRoutes = require('./routes/managerRoutes');
// const requestRoutes = require('./routes/requestRoutes');


// //  const r = require('./routes/r'); // ✅ Add request routes
// const clerkRoutes = require('./routes/clerk');;


// require('dotenv').config();

// const app = express();

// // ✅ CORS setup for frontend (React at port 5173)
// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true,
// }));

// // ✅ Middlewares
// app.use(express.json());
// app.use(cookieParser());

// // ✅ Session middleware (used by Passport)
// app.use(session({
//   secret: process.env.SESSION_SECRET || 'jo',
//   resave: false,
//   saveUninitialized: false,
//   cookie: { secure: false } // set secure: true in production
// }));

// // ✅ Passport initialization
// app.use(passport.initialize());
// app.use(passport.session());

// // ✅ Routes
// app.use('/api/auth', authRoutes);   // e.g., login, register, Google OAuth
// app.use('/api/admin', adminRoutes); // ✅ Admin actions: create user, assign role, activate/deactivate
// app.use('/api/items', itemRoutes);
// // app.use('/api/item-requests', itemRequestRoutes);
// // app.use('/api/manager', managerRoutes);
// app.use('/api', requestRoutes);

// // app.use('/api/requests', clerkRoutes);

// app.use('/api', clerkRoutes);

// // ✅ Server start
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




// corect

// const express = require('express');
// const passport = require('./config/passport');
// const session = require('express-session');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');
// const path = require('path');

// const authRoutes = require('./routes/authRoutes');
// const adminRoutes = require("./routes/adminRoutes");
// const itemRoutes = require('./routes/itemRoutes');
// const requestRoutes = require('./routes/requestRoutes');
// const clerkRoutes = require('./routes/clerk');
// const returnRoutes =  require('./routes/returnRoutes');
// require('dotenv').config();

// const app = express();

// // CORS setup: allow frontend at localhost:5173 to access backend
// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true,
// }));

// // Parse JSON and cookies
// app.use(express.json());
// app.use(cookieParser());

// // Serve barcode images statically from the /barcodes folder in backend root
// // Make sure barcode PNG files are saved in this folder
// app.use('/barcodes', express.static(path.join(__dirname, 'barcodes')));

// // Session and passport setup
// app.use(session({
//   secret: process.env.SESSION_SECRET || 'jo',
//   resave: false,
//   saveUninitialized: false,
//   cookie: { secure: false } // Set secure: true if using HTTPS
// }));
// app.use(passport.initialize());
// app.use(passport.session());

// // Register routes
// app.use('/api/auth', authRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/items', itemRoutes);
// app.use('/api', requestRoutes);
// app.use('/api', clerkRoutes);
// app.use('/api', returnRoutes);
// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// corect one

// const express = require('express');
// const passport = require('./config/passport');
// const session = require('express-session');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');
// const path = require('path');
// const http = require('http'); // needed for socket.io
// const { Server } = require('socket.io');

// const authRoutes = require('./routes/authRoutes');
// const adminRoutes = require("./routes/adminRoutes");
// const itemRoutes = require('./routes/itemRoutes');
// const requestRoutes = require('./routes/requestRoutes');
// const clerkRoutes = require('./routes/clerk');
// const returnRoutes =  require('./routes/returnRoutes');
// require('dotenv').config();

// const app = express();
// const server = http.createServer(app); // create HTTP server for socket.io
// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST', 'PUT'],
//     credentials: true
//   }
// });

// // Make io accessible in routes/controllers
// app.set('io', io);

// // CORS setup
// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true,
// }));

// // Parse JSON and cookies
// app.use(express.json());
// app.use(cookieParser());

// // Serve barcode images
// app.use('/barcodes', express.static(path.join(__dirname, 'barcodes')));

// // Session and passport setup
// app.use(session({
//   secret: process.env.SESSION_SECRET || 'jo',
//   resave: false,
//   saveUninitialized: false,
//   cookie: { secure: false } // true if using HTTPS
// }));
// app.use(passport.initialize());
// app.use(passport.session());

// // Register routes (keep URLs unchanged)
// app.use('/api/auth', authRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/items', itemRoutes);
// app.use('/api', requestRoutes);
// app.use('/api', clerkRoutes);
// app.use('/api', returnRoutes);

// // Optional: log connections
// io.on('connection', (socket) => {
//   console.log('Client connected:', socket.id);
//   socket.on('disconnect', () => console.log('Client disconnected:', socket.id));
// });

// // Start server with socket.io
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// const express = require('express');
// const passport = require('./config/passport');
// const session = require('express-session');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');
// const path = require('path');
// const http = require('http'); // needed for socket.io
// const { Server } = require('socket.io');

// const authRoutes = require('./routes/authRoutes');
// const adminRoutes = require("./routes/adminRoutes");
// const itemRoutes = require('./routes/itemRoutes');
// const requestRoutes = require('./routes/requestRoutes');
// const clerkRoutes = require('./routes/clerk');
// const returnRoutes =  require('./routes/returnRoutes');
// const forcastRoute = require('./routes/forcastRoute');
// require('dotenv').config();

// const app = express();
// const server = http.createServer(app);

// // Socket.IO setup
// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST', 'PUT'],
//     credentials: true
//   }
// });

// // Make io accessible in routes/controllers
// app.set('io', io);

// // CORS setup
// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true,
// }));

// // Parse JSON and cookies
// app.use(express.json());
// app.use(cookieParser());

// // Serve barcode images
// app.use('/barcodes', express.static(path.join(__dirname, 'barcodes')));

// // Session and passport setup
// app.use(session({
//   secret: process.env.SESSION_SECRET || 'jo',
//   resave: false,
//   saveUninitialized: false,
//   cookie: { secure: false } 
// }));
// app.use(passport.initialize());
// app.use(passport.session());

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/items', itemRoutes);
// app.use('/api', requestRoutes);
// app.use('/api', clerkRoutes);
// app.use('/api', returnRoutes);
// app.use('/api', forcastRoute);

// // Socket.IO connection logging
// io.on('connection', (socket) => {
//   console.log('Client connected:', socket.id);
//   socket.on('disconnect', () => console.log('Client disconnected:', socket.id));
// });

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const express = require('express');
const passport = require('./config/passport');
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const http = require('http'); // needed for socket.io
const { Server } = require('socket.io');

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require("./routes/adminRoutes");
const itemRoutes = require('./routes/itemRoutes');
const requestRoutes = require('./routes/requestRoutes');
const clerkRoutes = require('./routes/clerk');
const returnRoutes = require('./routes/returnRoutes');
const forcastRoute = require('./routes/forcastRoute');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT'],
    credentials: true
  }
});

// Make io accessible in routes/controllers
app.set('io', io);

// 🔹 Pass io instance to request controller for real-time events
const requestController = require('./controllers/requestController');
if (requestController.setSocketIo) {
  requestController.setSocketIo(io);
}

// CORS setup
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// Parse JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Serve barcode images
app.use('/barcodes', express.static(path.join(__dirname, 'barcodes')));

// Session and passport setup
app.use(session({
  secret: process.env.SESSION_SECRET || 'jo',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } 
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/items', itemRoutes);
app.use('/api', requestRoutes);
app.use('/api', clerkRoutes);
app.use('/api', returnRoutes);
app.use('/api', forcastRoute);

// Socket.IO connection logging
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  socket.on('disconnect', () => console.log('Client disconnected:', socket.id));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
