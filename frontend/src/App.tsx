import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [updatedMessage, setUpdatedMessage] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000");
    socket.onopen = () => {
      console.log("Connected");
      setSocket(socket);
    };

    socket.onmessage = (message) => {
      console.log("Recived %s", message.data);
      setUpdatedMessage(message.data);
    };

    //closing the server if user hit random route
    /*return () => {
      socket.close();
    };*/
  }, []);

  if (!socket) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      <input
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      ></input>
      <button
        onClick={() => {
          socket.send(message);
        }}
      >
        Send
      </button>
      <div>{updatedMessage}</div>
    </>
  );
}

export default App;
