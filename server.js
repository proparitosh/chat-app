const WebSocket = require("ws");
const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static("public"));

const users = new Map();       // ws -> { username, room }
const rooms = new Map();       // roomName -> Set of usernames

function broadcast(room, data) {
  wss.clients.forEach(client => {
    if (
      client.readyState === WebSocket.OPEN &&
      users.has(client) &&
      users.get(client).room === room
    ) {
      client.send(JSON.stringify(data));
    }
  });
}

wss.on("connection", ws => {
  ws.on("message", message => {
    let data;
    try {
      data = JSON.parse(message);
    } catch {
      return;
    }

    if (data.type === "join") {
      const { username, room } = data;

      // Prevent duplicate usernames
      for (let u of users.values()) {
        if (u.username === username) {
          ws.send(JSON.stringify({ type: "error", message: "Username already taken" }));
          return;
        }
      }

      users.set(ws, { username, room });

      if (!rooms.has(room)) rooms.set(room, new Set());
      rooms.get(room).add(username);

      broadcast(room, {
        type: "system",
        message: `${username} joined the room`
      });

      ws.send(JSON.stringify({
        type: "rooms",
        rooms: Array.from(rooms.keys())
      }));
    }

    if (data.type === "message") {
      const user = users.get(ws);
      if (!user || !data.text.trim()) return;

      broadcast(user.room, {
        type: "message",
        username: user.username,
        text: data.text,
        time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        })
      });
    }

    if (data.type === "createRoom") {
      if (!rooms.has(data.room)) {
        rooms.set(data.room, new Set());
      }
      ws.send(JSON.stringify({
        type: "rooms",
        rooms: Array.from(rooms.keys())
      }));
    }
  });

  ws.on("close", () => {
    const user = users.get(ws);
    if (!user) return;

    rooms.get(user.room)?.delete(user.username);
    broadcast(user.room, {
      type: "system",
      message: `${user.username} left the room`
    });

    users.delete(ws);
  });
});

server.listen(3000, () =>
  console.log("✅ Server running at http://localhost:3000")
);
