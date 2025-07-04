require('dotenv').config(); // ✅ Load .env first

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const http = require('http');
const { Server } = require('socket.io');

const User = require('./models/User');
const Report = require('./models/Report');
const Product = require('./models/Product');
const Cart = require('./models/Cart'); // Optional, if used
const Resource = require('./models/Resource'); // ✅ Make sure this exists

const app = express();
const server = http.createServer(app);

// ==== Socket.IO Setup ====
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// ==== Middleware ====
app.use(cors());
app.use(express.json());

// ==== MongoDB Connection ====
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// ==== Socket.IO Chat Events ====
io.on('connection', (socket) => {
  console.log(`🔌 User connected: ${socket.id}`);

  socket.on('send_message', (data) => {
    io.emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log(`❌ User disconnected: ${socket.id}`);
  });
});

// ==== AUTH ROUTES ====

// Signup
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: 'All fields are required' });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ success: true, message: 'Signup successful' });
  } catch (err) {
    console.error('❌ Signup Error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'Email and password are required' });

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });
    res.status(200).json({ success: true, token, message: 'Login successful' });
  } catch (err) {
    console.error('❌ Login Error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// ==== REPORT ROUTES ====
app.get('/api/reports', async (req, res) => {
  try {
    const reports = await Report.find();
    res.json(reports);
  } catch (error) {
    console.error('❌ Error fetching reports:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/reports', async (req, res) => {
  const {
    title,
    description,
    mediaUrl,
    liveLocationLink,
    location,
    timestamp,
    reportType,
  } = req.body;

  if (!title || !description || !reportType) {
    return res.status(400).json({ message: 'Required fields missing' });
  }

  try {
    const newReport = new Report({
      title,
      description,
      mediaUrl: mediaUrl || '',
      liveLocationLink: liveLocationLink || '',
      location: location || null,
      timestamp: timestamp || new Date(),
      reportType,
    });

    await newReport.save();
    res.status(201).json({ success: true, message: 'Report submitted successfully' });
  } catch (error) {
    console.error('❌ Error submitting report:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ==== PRODUCT ROUTES ====
app.post('/api/products', async (req, res) => {
  const { title, description, imageUrl, price, userId } = req.body;

  if (!title || !userId) {
    return res.status(400).json({ message: 'Title and user ID are required' });
  }

  try {
    const product = new Product({
      title,
      description: description || '',
      imageUrl: imageUrl || '',
      price: price || 0,
      postedBy: userId,
      isDonated: false,
    });

    await product.save();
    res.status(201).json({ success: true, message: 'Product added', product });
  } catch (err) {
    console.error('❌ Add Product Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find().populate('postedBy', 'name email');
    res.json(products);
  } catch (err) {
    console.error('❌ Fetch Products Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('postedBy', 'name');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error('❌ Single Product Fetch Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/products/:id/buy', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (product.isDonated) {
      return res.status(400).json({ message: 'Product already taken/donated' });
    }

    product.isDonated = true;
    await product.save();

    res.json({ success: true, message: 'Product successfully taken/donated' });
  } catch (err) {
    console.error('❌ Buy Product Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


// ==== SERVER START ====
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});









