import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const CreateTaskPopup = ({ modal, toggle, save }) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState({ taskName: "", description: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "taskName") {
      setTaskName(value);
      setError((prevState) => ({ ...prevState, taskName: "" }));
    } else {
      setDescription(value);
      setError((prevState) => ({ ...prevState, description: "" }));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (validateInputs()) {
      let taskObj = {
        taskName,
        description,
      };

      save(taskObj);
      resetForm();
    }
  };

  const validateInputs = () => {
    let isValid = true;
    const newError = { taskName: "", description: "" };

    if (!taskName.trim()) {
      newError.taskName = "Task name is required";
      isValid = false;
    }

    if (!description.trim()) {
      newError.description = "Description is required";
      isValid = false;
    }

    setError(newError);
    return isValid;
  };

  const resetForm = () => {
    setTaskName("");
    setDescription("");
    setError({ taskName: "", description: "" });
  };

  const handleClose = () => {
    resetForm();
    toggle();
  };

  return (
    <Modal isOpen={modal} toggle={handleClose}>
      <ModalHeader toggle={handleClose}>Create Task</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Task Name</label>
          <input
            type="text"
            className={`form-control ${error.taskName && "is-invalid"}`}
            value={taskName}
            onChange={handleChange}
            name="taskName"
          />
          {error.taskName && (
            <div className="invalid-feedback">{error.taskName}</div>
          )}
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            rows="5"
            className={`form-control ${error.description && "is-invalid"}`}
            value={description}
            onChange={handleChange}
            name="description"
          ></textarea>
          {error.description && (
            <div className="invalid-feedback">{error.description}</div>
          )}
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSave}>
          Create
        </Button>{" "}
        <Button color="secondary" onClick={handleClose}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CreateTaskPopup;
