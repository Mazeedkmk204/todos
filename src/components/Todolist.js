

import React, { useEffect, useState } from "react";
import CreateTask from "../modals/CreateTask";
import Card from "./Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Todolist = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  function parseJwt(token) {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }

  useEffect(() => {
    const authToken = localStorage.getItem("authorizationToken");

    if (!authToken) return navigate("/");

    
    const decodedToken = parseJwt(authToken);
    if (decodedToken && decodedToken.email) {
      setUserEmail(decodedToken.email);
    }

    axios.get("/").then((data) => setTaskList(data.data.data));
  }, [navigate]);

  const toggle = () => {
    setModal(!modal);
  };

  const saveTask = (taskObj) => {
    axios.post("/", taskObj).then((data) => {
      axios.get("/").then((data) => setTaskList(data.data.data));
    });
    toggle(); 
  };

  const deleteTask = (index) => {
    console.log(index);
    axios.delete(`/${index}`).then((data) => {
      axios.get("/").then((data) => setTaskList(data.data.data));
    });
  };

  const updateListArray = (obj, id) => {
    axios.put(`/${id}`, obj).then((data) => {
      axios.get("/").then((data) => setTaskList(data.data.data));
    });
  };

  const logoutHandler = () => {
    localStorage.removeItem("authorizationToken");
    navigate("/");
  };

  return (
    <div className="container-fluid mt-1">
      <div className="header text-center">
        <h3>Todo-List</h3>
        <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-md-center mx-3 px-3 mt-2">
          <div className="mx-3 mt-2">
            <button className="btn btn-primary mt-1 mx-3 " onClick={toggle}>
              Create Todo
            </button>
            <button className="btn btn-primary mt-1 mx-3 " onClick={logoutHandler}>
              Logout
            </button>
          </div>
          <span className="mx-3 ">User: {userEmail}</span>
        </div>
      </div>

      <div className="row mt-4">
        {taskList.map((obj, index) => (
          <div key={index} className="col-lg-4 col-md-6 mb-4 m-0.3">
            <Card
              taskObj={obj}
              index={index}
              deleteTask={deleteTask}
              updateListArray={updateListArray}
            />
          </div>
        ))}
      </div>

      <CreateTask toggle={toggle} modal={modal} save={saveTask} />
    </div>
  );
};

export default Todolist;

