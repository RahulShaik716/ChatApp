import { useEffect } from "react";
import { useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../Context/AuthContext";
import { v4 as uuidv4 } from "uuid";
import MainLayout from "./MainLayout";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
const backend_url = import.meta.env.VITE_backend_url;
const socket = io(backend_url);
export const Chat = () => {
  const { token } = useAuth();
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [windowMessages, setWindowMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedUser) {
      let results = messages.filter((x) => {
        return (
          (x.sender == selectedUser.name && x.receiver == token.username) ||
          (x.receiver == selectedUser.name && x.sender == token.username)
        );
      });
      setWindowMessages(results);
    }
  }, [selectedUser, messages, token.username]);

  useEffect(() => {
    if (!token.username) {
      navigate("/login");
    }
    if (token && token.username) {
      socket.emit("join", { username: token.username });
    }

    const handleOnlineUsers = (users) => {
      setOnlineUsers(users.filter((user) => user.name !== token.username));
    };

    const handleMessageHistory = (messages) => {
      const newMessages = [];
      for (let i of messages) {
        newMessages.push({
          _id: i._id,
          sender: i.sender,
          receiver: i.receiver,
          message: i.message,
          timestamp: i.timestamp,
        });
      }
      setMessages(newMessages);
    };

    const handleReceiveMessage = ({ sender, message, timestamp }) => {
      console.log("received message");
      setMessages((oldMessages) => {
        const newMessages = [...oldMessages];
        newMessages.push({
          _id: uuidv4(),
          sender,
          receiver: token.username,
          message,
          timestamp,
        });
        return newMessages;
      });
    };

    socket.on("online_users", handleOnlineUsers);
    socket.on("message_history", handleMessageHistory);
    socket.on("receive_message", handleReceiveMessage);

    // Cleanup function to remove the event listeners when the component unmounts or token changes
    return () => {
      socket.off("online_users", handleOnlineUsers);
      socket.off("message_history", handleMessageHistory);
      socket.off("receive_message", handleReceiveMessage);
    };
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

  function sendMessage(message) {
    console.log("send message");
    if (message && selectedUser) {
      setMessages((oldMessages) => {
        const newMessages = [...oldMessages];
        newMessages.push({
          _id: uuidv4(),
          sender: token.username,
          receiver: selectedUser.name,
          message,
          timestamp: Date.now(),
        });
        return newMessages;
      });
      console.log("send Message Called");

      socket.emit("send_message", {
        sender: token.username,
        receiver: selectedUser.name,
        message,
        timestamp: Date.now(),
      });
    }
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        height: "100vh",
      }}
    >
      <Header user={{ name: token.username, photo: token.photo }} />
      <MainLayout
        users={onlineUsers}
        messages={windowMessages}
        currentUser={token.username}
        onSendMessage={sendMessage}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
    </div>
  );
};
