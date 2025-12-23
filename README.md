# 💬 Chatify – Real-Time Chat Application

Chatify is a real-time web-based chat application built using **HTML, CSS (Tailwind CSS), JavaScript**, and **WebSockets**.  
It allows users to join chat rooms, exchange messages instantly, and enjoy a clean, responsive user interface.

This project was developed for academic purposes to demonstrate **real-time communication**, **client–server architecture**, and **modern frontend design**.

---

## 🚀 Features

- 🔐 Username-based authentication (no duplicates)
- 💬 Real-time messaging using WebSockets
- 🏠 Create and join multiple chat rooms
- ⏱ Message timestamps (hours & minutes only)
- ✨ Message formatting support:
  - **Bold** (`**text**`)
  - *Italic* (`*text*`)
  - Clickable links
- 📱 Fully responsive UI (desktop & mobile)
- 🔔 System notifications for join/leave events
- 🧼 Clean, modern UI using Tailwind CSS

---

## 🛠 Technologies Used

| Technology | Purpose |
|---------|--------|
| HTML5 | Application structure |
| Tailwind CSS | Styling & responsive design |
| JavaScript (ES6) | Client-side logic |
| Node.js | Backend runtime |
| WebSockets (`ws`) | Real-time communication |

---
## 📁 Project Structure
```
chatify/
│
├── server.js
├── package.json
├── README.md
│
└── public/
| ├── index.html
| ├── app.js
| └── ui.css
```

---

## ⚙️ Prerequisites

Make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** (comes with Node.js)
- A modern web browser (Chrome / Firefox)

---

## 📦 Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/chatify.git
cd chat-app
```
2️⃣ Install Dependencies

```npm install```

3️⃣ Start the Server
```npm start```

4️⃣ Open in Browser
```
http://localhost:3000
```

🧪 How to Use

Open the application in your browser

Enter a unique username

Join an existing room or create a new one

Start chatting in real-time 🎉

⌨ Message Formatting Guide
Format	Syntax	Example
Bold	**text**	Hello
Italic	*text*	Hello
Link	https://example.com	Clickable link
🧠 System Architecture

Client–Server Model

WebSocket server maintains:

Connected users

Active chat rooms

Messages are broadcasted to users in the same room only

🔐 Security Considerations

Username uniqueness enforced server-side

Empty messages blocked

Input sanitized before rendering

No user impersonation

⚠ Limitations

Messages are not persisted (in-memory only)

No private one-to-one chat

No file sharing

Server reset clears all rooms/messages

🚀 Future Enhancements

Database integration (MongoDB / Firebase)

Private messaging

Typing indicators

Online users list

Emoji & reactions

Authentication with email/password

📄 License

This project is created for educational purposes.
You are free to use, modify, and extend it.



