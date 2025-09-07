import React from 'react'
import IconEdit from "../../../assets/images/icon-edit-pencil.svg"
import IconAttach from "../../../assets/images/icon-paperclip.svg"
import IconFlagRed from "../../../assets/images/icon-flag-red.svg"
import IconFlagYellow from "../../../assets/images/icon-flag-yellow.svg"
import IconFlagGreen from "../../../assets/images/icon-flag-green.svg"
import IconClock from "../../../assets/images/icon-clock.svg"
import "./style.css"
import { users } from '../data'

const TaskItem = (props) => {
  const { task } = props;

  const handleReturnUserName = (assignedTo) => {
    const user = users.find(user => user.userId === assignedTo);
    return user.name ?? '';
  }

  const handleReturnIconFlag = (flagId) => {
    switch (flagId) {
      case 1:
        return <img src={IconFlagRed} alt="" />
      case 2:
        return <img src={IconFlagYellow} alt="" />
      case 3:
        return <img src={IconFlagGreen} alt="" />
    }
  }

  return (
    <div className='task-item'>
      <div className="task-item-header">
        <p className="left">{task.title}</p>
        <button className='btn-edit-task'> <img src={IconEdit} alt="icon pencil" /></button>
      </div>
      <div className="task-item-body">
        <p className='description'>{task.description}</p>
        <button className='btn-mindx-school'>{handleReturnUserName(task.assignedTo)}</button>
      </div>
      <div className="task-item-footer">
        <div className='list-file-attach'>
          <div>
            <img src={IconAttach} alt="" />
            <span>3</span>
          </div>
          <div>
            {handleReturnIconFlag(task.flagId)}
          </div>
          <div>
            <img src={IconClock} alt="" />
            <span>3</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskItem