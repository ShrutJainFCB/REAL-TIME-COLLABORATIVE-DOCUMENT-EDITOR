const socket = io();

const editor = document.getElementById('editor');
const messagesDiv = document.getElementById('messages');
const userList = document.getElementById('user-list');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const themeSelector = document.getElementById('themeSelector');

// Username prompt or retrieval from sessionStorage
let username = sessionStorage.getItem('username');
if (!username) {
  username = prompt('Enter your username');
  if (!username) username = 'User' + Math.floor(Math.random() * 1000);
  sessionStorage.setItem('username', username);
}

socket.emit('join', username);

// Update active users list
socket.on('active users', users => {
  userList.innerHTML = '';
  users.forEach(user => {
    const li = document.createElement('li');
    li.textContent = user;
    userList.appendChild(li);
  });
});

// Handle incoming chat messages
socket.on('chat message', ({ username, message }) => {
  const div = document.createElement('div');
  div.innerHTML = `<strong>${username}:</strong> ${message}`;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

// Send chat message
sendBtn.onclick = () => {
  const msg = messageInput.value.trim();
  if (msg) {
    socket.emit('chat message', msg);
    messageInput.value = '';
  }
};

// Emit text changes
editor.addEventListener('input', () => {
  const content = editor.innerHTML;
  socket.emit('text change', content);
});

// Update text from server
socket.on('text change', newContent => {
  if (editor.innerHTML !== newContent) {
    editor.innerHTML = newContent;
  }
});

// Formatting functions
function format(command) {
  document.execCommand(command, false, null);
}
function insertImage() {
  const url = prompt('Enter image URL');
  if (url) document.execCommand('insertImage', false, url);
}
function insertLink() {
  const url = prompt('Enter URL');
  if (url) document.execCommand('createLink', false, url);
}

// THEME SWITCHER LOGIC

// Apply theme to body and save to localStorage
function applyTheme(theme) {
  document.body.className = ''; // Remove all classes
  document.body.classList.add(theme);
  localStorage.setItem('selectedTheme', theme);
}

// When user changes theme via select dropdown
themeSelector.addEventListener('change', () => {
  const selected = themeSelector.value || 'emerald-theme';
  applyTheme(selected);
});

// On page load, load saved theme or default to emerald-theme
window.addEventListener('load', () => {
  const savedTheme = localStorage.getItem('selectedTheme') || 'emerald-theme';
  applyTheme(savedTheme);
  themeSelector.value = savedTheme;
});