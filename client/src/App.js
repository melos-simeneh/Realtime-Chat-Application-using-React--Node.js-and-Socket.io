import { useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:8000");
function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if (username !== "" && room !== "") {
    }
  };
  return (
    <div className="App">
      <h3>Join Chat App</h3>
      <input placeholder="Melos..." />
      <input placeholder="Room ID..." />
      <button></button>
    </div>
  );
}

export default App;
