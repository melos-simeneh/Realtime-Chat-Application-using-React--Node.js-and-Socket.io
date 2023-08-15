import React, { useMemo, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

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

  useMemo(() => {
    socket.on("receive_message", (data) => {
      setMessageList((pre) => [...pre, data]);
      console.log(data);
    });
  }, [socket]);

  return (
    <div style={{ display: "flex", gap: 40 }}>
      <div className="chat-window" style={{ width: "200px" }}>
        <div className="chat-header" style={{ backgroundColor: "skyblue" }}>
          <p style={{ color: "black" }}>Active Users</p>
        </div>
        <div style={{ paddingInline: 20, border: "1px solid black" }}>
          <p>{messageList[0]?.activeUsers?.length}</p>
        </div>
      </div>
      <div className="chat-window">
        <div className="chat-header">
          <p>Live Chat</p>
        </div>
        <div className="chat-body">
          <ScrollToBottom className="message-container">
            {messageList.map((msg) => {
              return (
                <div
                  className="message"
                  id={username !== msg.username ? "you" : "other"}
                >
                  <div>
                    <div className="message-content">
                      <p>{msg.message}</p>
                    </div>
                    <div className="message-meta">
                      <p id="time">{msg.time}</p>
                      <p id="author">{msg.username}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </ScrollToBottom>
        </div>
        <div className="chat-footer">
          <input
            placeholder="message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={(event) => {
              event.key === "Enter" && sendMessage();
            }}
          />
          <button onClick={sendMessage}>&#9658;</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
