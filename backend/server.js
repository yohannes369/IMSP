
const express = require('express');
const passport = require('./config/passport');
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require("./routes/adminRoutes");
const itemRoutes = require('./routes/itemRoutes');
const requestRoutes = require("./routes/requestFormRoutes");
const clerkRoutes = require('./routes/clerkRoutes');
const model22Routes = require('./routes/model22Routes');
const chatRoutes = require("./routes/chatRoutes");
const returnRoutes = require("./routes/returnroute");
const contactRoutes = require('./routes/contactRoutes');
const reportRoutes = require("./routes/itemInventoryReportRoutes");
require('dotenv').config();

const app = express();
const server = http.createServer(app);

// --------------------
// Socket.IO setup
// --------------------
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }
});

// Middleware to make io accessible in req
app.use((req, res, next) => {
  req.io = io;
  next();
});

// --------------------
// CORS setup
// --------------------
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// --------------------
// Parse JSON and cookies
// --------------------
app.use(express.json());
app.use(cookieParser());

// --------------------
// Serve static files (barcodes)
// --------------------
app.use('/barcodes', express.static(path.join(__dirname, 'barcodes')));

// --------------------
// Session and Passport
// --------------------
app.use(session({
  secret: process.env.SESSION_SECRET || 'jo',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } 
}));
app.use(passport.initialize());
app.use(passport.session());

// --------------------
// Routes
// --------------------
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/items', itemRoutes);
app.use("/api/requests", requestRoutes);
app.use('/api/clerk', clerkRoutes);
app.use('/api/model22', model22Routes);
app.use('/api/', contactRoutes);
app.use("/api/reports", reportRoutes);
// Chat API
app.use("/api/chat", chatRoutes);
app.use("/api/returns", returnRoutes);
// --------------------
// Socket.IO events
// --------------------
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// --------------------
// Start server
// --------------------
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
