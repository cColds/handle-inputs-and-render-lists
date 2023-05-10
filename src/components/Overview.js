// Overview.js

import React from "react";

const Overview = ({
  tasks,
  handleDeleteTask,
  handleEditTask,
  handleEditTaskChange,
}) => {
  return (
    <ul>
      {tasks.map((task) => {
        return (
          <li key={task.id}>
            {task.text}
            <button onClick={() => handleDeleteTask(task.id)}>
              Delete Task
            </button>
            <button
              onClick={() => {
                handleEditTask(task.id);
              }}
            >
              Edit Task
            </button>
            <input
              className={task.edit ? "" : "hide"}
              onChange={(e) => handleEditTaskChange(e, task.id)}
              defaultValue={task.text}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default Overview;
