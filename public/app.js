const ws = new WebSocket("ws://localhost:3000");

const state = {
  username: "",
  room: null
};

// Elements
const loginView = document.getElementById("loginView");
const chatView = document.getElementById("chatView");
const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("usernameInput");

const roomList = document.getElementById("roomList");
const currentUser = document.getElementById("currentUser");
const activeRoom = document.getElementById("activeRoom");

const messages = document.getElementById("messages");
const messageForm = document.getElementById("messageForm");
const messageInput = document.getElementById("messageInput");

const roomModal = document.getElementById("roomModal");
const roomForm = document.getElementById("roomForm");
const roomInput = document.getElementById("roomInput");

// Login
loginForm.onsubmit = e => {
  e.preventDefault();
  state.username = usernameInput.value.trim();
  ws.send(JSON.stringify({ type: "join", username: state.username, room: "General" }));
  loginView.classList.add("hidden");
  chatView.classList.remove("hidden");
  currentUser.textContent = state.username;
};

// Socket messages
ws.onmessage = e => {
  const data = JSON.parse(e.data);

  if (data.type === "rooms") renderRooms(data.rooms);
  if (data.type === "message") addMessage(data);
  if (data.type === "system") addSystemMessage(data.message);
};

// Rooms
function renderRooms(rooms) {
  roomList.innerHTML = "";
  rooms.forEach(room => {
    const btn = document.createElement("button");
    btn.className = "block w-full p-2 rounded hover:bg-gray-700 text-left";
    btn.textContent = `# ${room}`;
    btn.onclick = () => joinRoom(room);
    roomList.appendChild(btn);
  });
}

function joinRoom(room) {
  state.room = room;
  activeRoom.textContent = `# ${room}`;
  messages.innerHTML = "";
  messageForm.classList.remove("hidden");
}

// Messaging
messageForm.onsubmit = e => {
  e.preventDefault();
  if (!messageInput.value.trim()) return;
  ws.send(JSON.stringify({ type: "message", text: messageInput.value }));
  messageInput.value = "";
};

function addMessage({ username, text, time }) {
  const div = document.createElement("div");
  div.innerHTML = `
    <div class="text-sm text-gray-400">${username} • ${time}</div>
    <div class="bg-gray-800 p-3 rounded max-w-lg">
      ${format(text)}
    </div>`;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function addSystemMessage(msg) {
  const div = document.createElement("div");
  div.className = "text-center text-gray-500 text-sm";
  div.textContent = msg;
  messages.appendChild(div);
}

// Formatting
function format(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/https?:\/\/\S+/g, url =>
      `<a href="${url}" class="text-blue-400 underline" target="_blank">${url}</a>`
    );
}

// Room modal
document.getElementById("openRoomModal").onclick = () => roomModal.classList.remove("hidden");
document.getElementById("closeRoomModal").onclick = () => roomModal.classList.add("hidden");

roomForm.onsubmit = e => {
  e.preventDefault();
  ws.send(JSON.stringify({ type: "createRoom", room: roomInput.value.trim() }));
  roomInput.value = "";
  roomModal.classList.add("hidden");
};

document.getElementById("logoutBtn").onclick = () => location.reload();
