import { useState } from "react";
import "./app.css";
import io from "socket.io-client";
import Chat from "./Chat";

const socket = io.connect("http://localhost:8000");
function App() {
  const [usernames, setUsernames] = useState([]);
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };
  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join Chat App</h3>
          <input
            placeholder="Melos..."
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            placeholder="Room ID..."
            onChange={(event) => setRoom(event.target.value)}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} room={room} username={username} />
      )}
    </div>
  );
}

export default App;
