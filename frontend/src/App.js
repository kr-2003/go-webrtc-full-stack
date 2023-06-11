import logo from "./logo.svg";
import "./App.css";
import { MyContext } from "./MyContext";
import { useState } from "react";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Room from "./components/Room";

function App() {
  const [roomid, setroomid] = useState();
  const [RoomWebsocketAddr, setRoomWebsocketAddr] = useState();
  const [ChatWebsocketAddr, setChatWebsocketAddr] = useState();
  const [ViewerWebsocketAddr, setViewerWebsocketAddr] = useState();

  return (
    <div>
      <Router>
        <MyContext.Provider
          value={{
            roomid,
            setroomid,
            RoomWebsocketAddr,
            setRoomWebsocketAddr,
            ChatWebsocketAddr,
            setChatWebsocketAddr,
            ViewerWebsocketAddr,
            setViewerWebsocketAddr,
          }}
        >
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/room/:id" element={<Room />}></Route>
            {/* <Route exact path="/contact" element={<Contact />}></Route> */}
          </Routes>
        </MyContext.Provider>
      </Router>
    </div>
  );
}

export default App;
