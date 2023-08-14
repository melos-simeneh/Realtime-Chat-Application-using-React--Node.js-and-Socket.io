import React, { useEffect, useState } from "react";

const Chat = ({ socket, username, room }) => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const sendMessage = () => {
    const messageData = {
      room,
      username,
      message,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };
    socket.emit("send_message", messageData);
    setMessageList((pre) => [...pre, messageData]);
    setMessage("");
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((pre) => [...pre, data]);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        {messageList.map((msg) => {
          return (
            <div
              className="message"
              id={username === msg.username ? "you" : "other"}
            >
              <div>
                <div className="message-content">
                  <p>{msg.message}</p>
                </div>
                <div className="message-meta">
                  <p>{msg.time}</p>
                  <p>{msg.username}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="chat-footer">
        <input
          placeholder="message"
          onChange={(event) => setMessage(event.target.value)}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
};

export default Chat;
