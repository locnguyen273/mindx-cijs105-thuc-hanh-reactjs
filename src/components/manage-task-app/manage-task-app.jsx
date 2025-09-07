import React, { useState } from "react";
import IconPlus from "../../assets/images/icon-plus.svg";
import IconThreeDots from "../../assets/images/icon-three-dots.svg";
import "./style.css";
import TaskItem from "./task-item/task-item";
import { Button, Input } from "antd";
import CreateTask from "./modal/create-task";
import { tasks } from "./data";
import { StatusEnum, FlagEnum } from './enum';

const ManageTaskApp = () => {
  const { Search } = Input;
  const [modalCreateTask, setModalCreateTask] = useState(false);
  const [tasksWithText, setTasksWithText] = useState({});

  const onSearch = (value, _e, info) => console.log(info?.source, value);

  React.useEffect(() => {
    const tasksMapper = tasks.map(task => ({
      ...task,
      status: StatusEnum[task.statusId],
      flag: FlagEnum[task.flagId]
    }));

    const grouped = tasksMapper.reduce((acc, task) => {
      acc[task.status] = acc[task.status] || [];
      acc[task.status].push(task);
      return acc;
    }, {});
    setTasksWithText(grouped);
  }, [])

  return (
    <>
      <div className="container">
        <div className="header-section">
          <div className="header-left">
            <Search
              placeholder="Search items"
              allowClear
              onSearch={onSearch}
              style={{ width: 304 }}
            />
          </div>
          <div className="header-right">
            <Button className="btn-new-item" type="primary" onClick={() => setModalCreateTask(true)}>
              New Item
            </Button>
          </div>
        </div>

        <div className="manage-task-app">
          {/* every column */}
          {Object.keys(StatusEnum).map(key => {
            const statusName = StatusEnum[key];
            return (
              <div key={key} className="todo-column">
                <div className="todo-column-header">
                  <div className="todo-column-header-left">
                    <p className="label">{statusName}</p>
                    <span className="count">{tasksWithText[statusName]?.length}</span>
                  </div>
                  <div className="todo-column-header-right">
                    <button className="btn-plus">
                      <img src={IconPlus} alt="" />
                    </button>
                    <button className="btn-ellipsis">
                      <img src={IconThreeDots} alt="" />
                    </button>
                  </div>
                </div>

                <div className="todo-column-body">
                  {(tasksWithText[statusName] || []).map(task => (
                    <div key={task.taskId}>
                      <TaskItem task={task} />
                    </div>
                  ))}
                </div>
              </div>
            )
          })}


          {/* <div className="todo-column">
            <div className="todo-column-header">
              <div className="todo-column-header-left">
                <p className="label">Todo</p>
                <span className="count">3</span>
              </div>
              <div className="todo-column-header-right">
                <button className="btn-plus">
                  <img src={IconPlus} alt="" />
                </button>
                <button className="btn-ellipsis">
                  <img src={IconThreeDots} alt="" />
                </button>
              </div>
            </div>

            <div className="todo-column-body">
              <TaskItem />
              <TaskItem />
              <TaskItem />
            </div>
          </div>

          <div className="todo-column">
            <div className="todo-column-header">
              <div className="todo-column-header-left">
                <p className="label">Todo</p>
                <span className="count">3</span>
              </div>
              <div className="todo-column-header-right">
                <button className="btn-plus">
                  <img src={IconPlus} alt="" />
                </button>
                <button className="btn-ellipsis">
                  <img src={IconThreeDots} alt="" />
                </button>
              </div>
            </div>

            <div className="todo-column-body">
              <TaskItem />
              <TaskItem />
              <TaskItem />
            </div>
          </div>

          <div className="todo-column">
            <div className="todo-column-header">
              <div className="todo-column-header-left">
                <p className="label">Todo</p>
                <span className="count">3</span>
              </div>
              <div className="todo-column-header-right">
                <button className="btn-plus">
                  <img src={IconPlus} alt="" />
                </button>
                <button className="btn-ellipsis">
                  <img src={IconThreeDots} alt="" />
                </button>
              </div>
            </div>

            <div className="todo-column-body">
              <TaskItem />
              <TaskItem />
              <TaskItem />
            </div>
          </div> */}
        </div>
      </div>
      {modalCreateTask && <CreateTask modalCreateTask={modalCreateTask} setModalCreateTask={setModalCreateTask} />}
    </>
  );
};

export default ManageTaskApp;
