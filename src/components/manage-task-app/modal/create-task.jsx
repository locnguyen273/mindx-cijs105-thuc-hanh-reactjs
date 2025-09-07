import React, { useState } from "react";
import { Modal, Button, DatePicker, Input  } from "antd";
// import dayjs from "dayjs";
import "./style.css";

const CreateTask = (props) => {
  const { modalCreateTask, setModalCreateTask } = props;
  const [date, setDate] = useState(null);

  const handleCancel = () => {
    setModalCreateTask(false);
  };
  const handleOk = () => {
    setModalCreateTask(false);
  };
  return (
    <div>
      <Modal
        title="Create New Task"
        centered
        open={modalCreateTask}
        footer={
          <div className="row">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" onClick={handleOk}>
              Save
            </Button>
          </div>
        }
      >
        <div>
          <div className="row">
            <div className="">
              <p className="label">Title</p>
              <Input placeholder="Type title of task" />
            </div>
            <div className="">
              <p className="label">End Date</p>
              <DatePicker
                value={date}
                onChange={(date) => setDate(date)}
                placeholder="Select date"
                format="DD-MM-YYYY"
                style={{ width: "100%" }} // full width like an input
              />
            </div>
          </div>
          <div className="row">
            <div className="">
              <p className="label">Assign</p>
            </div>
            <div className="">
              <p className="label">Status</p>
            </div>
          </div>
          <div className="row">
            <div className="">
              <p className="label">Description</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CreateTask;
