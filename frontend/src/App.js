import logo from "./logo.svg";
import "./App.css";
import { MyContext } from "./MyContext";
import { useState } from "react";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Room from "./components/Room";
import Hero from "./components/Hero";
import RegisterPage from "./components/Register";
import LoginPage from "./components/Login";

function App() {
  const [roomid, setroomid] = useState();
  const [RoomWebsocketAddr, setRoomWebsocketAddr] = useState();
  const [ChatWebsocketAddr, setChatWebsocketAddr] = useState();
  const [ViewerWebsocketAddr, setViewerWebsocketAddr] = useState();
  const [user, setuser] = useState(null);

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
            user,
            setuser,
          }}
        >
          <Routes>
            <Route exact path="/" element={<Hero />}></Route>
            <Route
              exact
              path="/register"
              element={<RegisterPage></RegisterPage>}
            ></Route>
            <Route exact path="/login" element={<LoginPage />}></Route>
            <Route exact path="/dashboard" element={<Home />}></Route>
            <Route exact path="/room/:id" element={<Room />}></Route>
            {/* <Route exact path="/contact" element={<Contact />}></Route> */}
          </Routes>
        </MyContext.Provider>
      </Router>
    </div>
  );
}

export default App;
