require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const connectDB = require("./config/db");
const socketHandler = require("./socket/socketHandler");
const roomRoutes = require("./routes/roomRoutes");

// Connect to MongoDB
connectDB();

const app = express();
const server = http.createServer(app);

// ================================
// 🔥 SOCKET.IO SETUP (MUST BE BEFORE ROUTES)
// ================================
const io = new Server(server, {
  cors: {
    origin: [
      "https://aws-cloud-connect-fhtb6hbey-samdev007-pixels-projects.vercel.app",
      "http://localhost:5173",
      "http://localhost:3000"
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ['websocket', 'polling'],
});

app.set("io", io);

// Attach socket handler
socketHandler(io);

// ================================
// 🔥 CORS CONFIG FOR PRODUCTION
// ================================
app.use(
  cors({
    origin: [
      "https://aws-cloud-connect-fhtb6hbey-samdev007-pixels-projects.vercel.app",
      "http://localhost:5173",
      "http://localhost:3000"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(express.json());

// API Routes
app.use("/api/rooms", roomRoutes);

// ================================
// 🔥 MESSAGE ROUTES
// ================================
const messageRoutes = require("./routes/messageRoutes");
app.use("/api/messages", messageRoutes(io));

// ================================
// 🔥 HEALTH CHECK ROUTE
// ================================
app.get("/", (req, res) => {
  res.send("AWS Cloud Connect Backend Running 🚀");
});

// ================================
// 🔥 START SERVER
// ================================
const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log(`🟣 Server running on port ${PORT}`);
});
