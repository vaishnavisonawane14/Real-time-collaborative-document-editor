import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // backend port

function App() {
  const [text, setText] = useState("");

  useEffect(() => {
    socket.on("message", (data) => {
      setText(data);
    });

    return () => socket.off("message");
  }, []);

  const handleChange = (e) => {
    setText(e.target.value);
    socket.emit("message", e.target.value);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Collaborative Code Editor</h1>
      <textarea
        rows="10"
        cols="80"
        value={text}
        onChange={handleChange}
      />
    </div>
  );
}

export default App;