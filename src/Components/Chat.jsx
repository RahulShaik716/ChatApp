import { useEffect } from "react";
import { useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../Context/AuthContext";
import Users from "./Users";
const backend_url = import.meta.env.VITE_backend_url;
const socket = io(backend_url);
export const Chat = () => {
  const { token } = useAuth();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [currentChat, setCurrentChat] = useState("");
  useEffect(() => {
    if (token && token.username)
      socket.emit("join", { username: token.username });

    socket.on("online_users", (users) => {
      console.log(users);
      setOnlineUsers(users.filter((user) => user != token.username));
    });
    socket.on("receive_message", ({ sender, message }) => {
      console.log(sender, message);
      setMessages((oldMessages) => {
        const newMessages = { ...oldMessages };
        if (!newMessages[sender]) newMessages[sender] = [];
        newMessages[sender].push({ sender, message });
        return newMessages;
      });
    });
  }, [token]);

  useEffect(() => {
    const savedMessages = localStorage.getItem("messageHistory");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("messageHistory", JSON.stringify(messages));
  }, [messages]);

  function sendMessage() {
    if (message && selectedUser) {
      setMessages((oldMessages) => {
        const newMessages = { ...oldMessages };
        if (!newMessages[selectedUser]) newMessages[selectedUser] = [];
        newMessages[selectedUser].push({ sender: token.username, message });
        return newMessages;
      });

      socket.emit("send_message", {
        sender: token.username,
        receiver: selectedUser,
        message,
      });

      setMessage("");
    }
  }
  return (
    <div style={{ display: "flex" }}>
      <Users
        onlineUsers={onlineUsers}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
      <div style={{ marginLeft: "20px", flexGrow: 1 }}>
        {selectedUser ? (
          <>
            <h2> chat with {selectedUser}</h2>
            <div className="chat-window">
              {messages[selectedUser] &&
                messages[selectedUser].map((msg, id) => (
                  <p key={id}>
                    <strong> {msg.sender}:</strong> {msg.message}
                  </p>
                ))}
            </div>
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message"
            />
            <button onClick={sendMessage}>Send</button>
          </>
        ) : (
          <p> Select a user to chat with :</p>
        )}
      </div>
    </div>
  );
};
