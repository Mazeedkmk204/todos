import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const EditTaskPopup = ({ modal, toggle, updateTask, taskObj }) => {
  const [updateTaskName, setUpdateTaskName] = useState(taskObj.taskName);
  const [updateDescription, setUpdateDescription] = useState(taskObj.description);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "taskName") {
      setUpdateTaskName(value);
    } else {
      setUpdateDescription(value);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedTask = {
      taskName: updateTaskName,
      description: updateDescription,
    };
    updateTask(updatedTask);
    toggle(); // Closes the modal after updating the task
  };

  return (
    <Modal isOpen={modal} toggle={toggle} className="modal-dialog-centered">
      <ModalHeader toggle={toggle}>Update Task</ModalHeader>
      <ModalBody>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Task Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={updateTaskName}
                  onChange={handleChange}
                  name="taskName"
                />
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label>Description</label>
                <textarea
                  rows="5"
                  className="form-control"
                  value={updateDescription}
                  onChange={handleChange}
                  name="description"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleUpdate}>
          Update
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditTaskPopup;
