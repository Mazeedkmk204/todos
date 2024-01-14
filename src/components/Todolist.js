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

    // fetch('https://node-js-crud-three.vercel.app/api/crud/v1')
    //   .then(response => response.json())
    //   .then(json => console.log(json))
  }, []);

  const toggle = () => {
    setModal(!modal);
  };

  const saveTask = (taskObj) => {
    const updatedTaskList = [...taskList, taskObj];
    // localStorage.setItem("taskList", JSON.stringify(updatedTaskList));
    console.log({updatedTaskList})
    setTaskList(updatedTaskList);
    toggle(); // Closes the modal when a new task is saved
  };

  const deleteTask = (index) => {
    const updatedTaskList = [...taskList];
    updatedTaskList.splice(index, 1);

    localStorage.setItem("taskList", JSON.stringify(updatedTaskList));
    setTaskList(updatedTaskList);
  };

  const updateListArray = (obj, index) => {
    const updatedTaskList = [...taskList];
    updatedTaskList[index] = obj;

    localStorage.setItem("taskList", JSON.stringify(updatedTaskList));
    setTaskList(updatedTaskList);
    
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
