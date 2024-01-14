import React, { useEffect, useState } from "react";
import CreateTask from "../modals/CreateTask";
import Card from "./Card";
import axios from 'axios'

const Todolist = () => {
  const [modal, setModal] = useState(false);
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    const storedTaskList = JSON.parse(localStorage.getItem("taskList")) || [];
    setTaskList(storedTaskList);
    axios.get('https://node-js-crud-three.vercel.app/api/crud/v1').then(data => setTaskList(data.data.data))
  
  }, []);

  const toggle = () => {
    setModal(!modal);
  };

  const saveTask = (taskObj) => {
    console.log({taskObj})
    axios.post('https://node-js-crud-three.vercel.app/api/crud/v1',taskObj ).then(data=>{
      axios.get('https://node-js-crud-three.vercel.app/api/crud/v1').then(data => setTaskList(data.data.data))
    })
    toggle(); // Closes the modal when a new task is saved
  };

  const deleteTask = (index) => {
    console.log(index)
    axios.delete(`https://node-js-crud-three.vercel.app/api/crud/v1/${index}` ).then(data=>{
      axios.get('https://node-js-crud-three.vercel.app/api/crud/v1').then(data => setTaskList(data.data.data))
    })
  };

  const updateListArray = (obj,id) => {
    axios.put(`https://node-js-crud-three.vercel.app/api/crud/v1/${id}`,obj ).then(data=>{
      axios.get('https://node-js-crud-three.vercel.app/api/crud/v1').then(data => setTaskList(data.data.data))
    })
  };

  return (
    <div className="container mt-5">
      <div className="header text-center">
        <h3>Todo-List</h3>
        <button className="btn btn-primary mt-2" onClick={toggle}>
          Create Todo
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
