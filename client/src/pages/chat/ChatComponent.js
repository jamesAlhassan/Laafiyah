import React, { useEffect, useState } from 'react';
import io from "socket.io-client";

const socket = io.connect("http://localhost:8800");

const ChatComponent = ({ userType, userId }) => {

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    socket.emit("send_message", { message: newMessage })
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data.message);
      setNewMessage(data.message);
    })

  }, [socket]);

  return (
    <div>
      <div>
        {messages.map((msg) => (
          // Use a unique identifier as the key, assuming msg has an ID
          <div key={msg.id}>{`${msg.userType}: ${msg.message}`}</div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatComponent;
