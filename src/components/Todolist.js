import React, { useEffect, useState } from "react";
import CreateTask from "../modals/CreateTask";
import Card from "./Card";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
const Todolist = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    // const storedTaskList = JSON.parse(localStorage.getItem("taskList")) || [];
    // setTaskList(storedTaskList);
    if(!localStorage.getItem('authorizationToken')) return navigate("/") 
    axios.get('/').then(data => setTaskList(data.data.data))
  
  }, []);

  const toggle = () => {
    setModal(!modal);
  };

  const saveTask = (taskObj) => {
    axios.post('/',taskObj ).then(data=>{
      axios.get('/').then(data => setTaskList(data.data.data))
    })
    toggle(); // Closes the modal when a new task is saved
  };

  const deleteTask = (index) => {
    console.log(index)
    axios.delete(`/${index}` ).then(data=>{
      axios.get('/').then(data => setTaskList(data.data.data))
    })
  };

  const updateListArray = (obj,id) => {
    axios.put(`/${id}`,obj ).then(data=>{
      axios.get('/').then(data => setTaskList(data.data.data))
    })
  };

  const logoutHandler = () =>{
    localStorage.removeItem('authorizationToken');
    navigate('/')
  }
  return (
    <div className="container mt-5">
      <div className="header text-center">
        <h3>Todo-List</h3>
        <button className="btn btn-primary mt-2" onClick={toggle}>
          Create Todo
        </button>
        <button className="btn btn-primary mt-2" onClick={logoutHandler}>
          Logout
        </button>
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
