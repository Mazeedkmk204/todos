import React from "react";
import "./App.css";
import Todolist from "./components/Todolist";
import Login from "./components/login";
// import ProtectedRoute from "./utils/ProtectedRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
       <Route element={<Login/>} path="/" exact/>
      <Route element={<Todolist/>} path="/todo" exact/> 
    </Routes>
  );
};

export default App;
