const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const Document = require('./models/Document');

const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

mongoose.connect('mongodb://127.0.0.1:27017/realtime-doc', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected')).catch(err => console.error('MongoDB connection error:', err));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 24*60*60*1000 }
}));

function checkUsername(req, res, next) {
  if (req.session.username) next();
  else res.redirect('/enter-username');
}

app.get('/enter-username', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/enter-username.html'));
});

app.post('/enter-username', (req, res) => {
  const { username } = req.body;
  if (!username || !username.trim()) {
    return res.status(400).send('Username is required');
  }
  req.session.username = username.trim();
  res.redirect('/');
});


app.get('/', checkUsername, (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});


app.post('/save', checkUsername, async (req, res) => {
  try {
    const { content } = req.body;
    let doc = await Document.findOne({});
    if (!doc) doc = new Document({ content });
    else doc.content = content;
    await doc.save();
    res.json({ status: 'ok' });
  } catch (err) {
    console.error('Save document error', err);
    res.status(500).json({ status: 'error' });
  }
});

app.get('/document', checkUsername, async (req, res) => {
  try {
    const doc = await Document.findOne({});
    res.json({ content: doc ? doc.content : '' });
  } catch (err) {
    console.error('Get document error', err);
    res.status(500).json({ content: '' });
  }
});

let activeUsers = new Map();
let editorContent = '';

io.on('connection', (socket) => {
  console.log('User connected', socket.id);

  socket.on('join', (username) => {
    if (username) {
      activeUsers.set(socket.id, username);
      io.emit('active users', Array.from(activeUsers.values()));
      socket.emit('text change', editorContent);
    }
  });

  socket.on('chat message', (msg) => {
    const username = activeUsers.get(socket.id) || 'Unknown';
    io.emit('chat message', { username, message: msg });
  });

  socket.on('text change', (content) => {
    editorContent = content;
    socket.broadcast.emit('text change', content);
  });

  socket.on('disconnect', () => {
    activeUsers.delete(socket.id);
    io.emit('active users', Array.from(activeUsers.values()));
    console.log('User disconnected', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});