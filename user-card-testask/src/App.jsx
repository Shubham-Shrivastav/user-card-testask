import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserProfile from "./components/UserProfile/UserProfile";
import Home from "./components/UserDir/Home";
import UserData from "./Data/users";
import "./App.css";

function App() {
  return (
    <Router className="App-header">
      <Routes>
        <Route path="/" element={<Home users={UserData} />} />
        <Route path="/user/:id" element={<UserProfile users={UserData} />} />
      </Routes>
    </Router>
  );
}

export default App;