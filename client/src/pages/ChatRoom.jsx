import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const ChatRoom = () => {
  const [username, setUsername] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [status, setStatus] = useState("idle");
  const [userId, setUserId] = useState(null);

  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(SERVER_URL);

    return () => socketRef.current.disconnect();
  }, []);

  useEffect(() => {
    const saved = JSON.parse(sessionStorage.getItem("chatSession"));
    if (saved) {
      setUsername(saved.username);
      setRoomCode(saved.roomCode);
      setUserId(saved.userId);
      setStatus(saved.status);
    }
  }, []);

  // 🔥 APPROVAL LISTENER (SINGLE SOCKET)
  useEffect(() => {
    if (!socketRef.current || !userId) return;

    socketRef.current.on("user_approved", (approvedUserId) => {
      if (String(approvedUserId) === String(userId)) {
        setStatus("approved");

        const saved = JSON.parse(sessionStorage.getItem("chatSession"));
        if (saved) {
          saved.status = "approved";
          sessionStorage.setItem("chatSession", JSON.stringify(saved));
        }
      }
    });

    return () => {
      socketRef.current.off("user_approved");
    };
  }, [userId]);

  const joinRoom = async () => {
    if (!username.trim() || !roomCode.trim()) return;

    try {
      const res = await axios.post(
        `${SERVER_URL}/api/rooms/join`,
        { username, roomCode }
      );

      const newUserId = res.data.user._id;

      setUserId(newUserId);
      setStatus("pending");

      sessionStorage.setItem(
        "chatSession",
        JSON.stringify({
          username,
          roomCode,
          userId: newUserId,
          status: "pending",
        })
      );

      socketRef.current.emit("join_room", {
        roomCode,
        role: "user",
        userId: newUserId,
      });

    } catch (err) {
      console.error("Join failed");
    }
  };

  return (
    <div style={pageStyle}>
      {status !== "approved" && (
        <div style={joinCardStyle}>
          <h2>Join Chat Room</h2>

          {status === "idle" && (
            <>
              <input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={inputStyle}
              />
              <input
                placeholder="Room Code"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                style={inputStyle}
              />
              <button onClick={joinRoom} style={buttonStyle}>
                Join Room
              </button>
            </>
          )}

          {status === "pending" && (
            <div>Waiting for Super Admin approval...</div>
          )}
        </div>
      )}

      {status === "approved" && (
        <ChatInterface
          roomCode={roomCode}
          userId={userId}
          socket={socketRef.current}
        />
      )}
    </div>
  );
};

const ChatInterface = ({ roomCode, userId, socket }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!socket) return;

    socket.emit("join_room", { roomCode, role: "user", userId });

    socket.on("load_messages", (msgs) => {
      setMessages(msgs);
    });

    socket.on("receive_message", (msg) => {
      setMessages((prev) => {
        if (prev.find((m) => m._id === msg._id)) return prev;
        return [...prev, msg];
      });
    });

    socket.on("kicked_from_room", (data) => {
      alert(data.message);
      sessionStorage.removeItem("chatSession");
      window.location.reload();
    });

    return () => {
      socket.off("load_messages");
      socket.off("receive_message");
      socket.off("kicked_from_room");
    };
  }, [socket, roomCode, userId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;

    socket.emit("send_message", {
      userId,
      roomCode,
      content: message,
    });

    setMessage("");
  };

  return (
    <div style={chatLayoutStyle}>
      <div style={messagesPanelStyle}>
        {messages.map((msg) => (
          <div key={msg._id}>
            <strong>{msg.sender?.username}</strong>: {msg.content}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div style={inputDockStyle}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message..."
          style={chatInputStyle}
        />
        <button onClick={sendMessage} style={buttonStyle}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;