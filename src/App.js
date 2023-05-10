// App.js

import React, { Component } from "react";
import Overview from "./components/Overview";
import uniqid from "uniqid";

class App extends Component {
  constructor() {
    super();

    this.state = {
      task: {
        text: "",
        id: uniqid(),
        edit: false,
      },
      tasks: [],
    };
  }

  handleChange = (e) => {
    this.setState({
      task: {
        text: e.target.value,
        id: this.state.task.id,
        edit: false,
      },
    });
  };

  handleEditTaskChange(e, taskId) {
    // Do stuff
    // Map a new array with the task edited
    const { tasks } = this.state;
    const editTask = tasks.map((task) => {
      if (task.id === taskId) {
        return { text: e.target.value, id: task.id, edit: task.edit };
      }
      return task;
    });

    this.setState({ tasks: editTask });
  }

  handleEditTask = (taskId) => {
    const { tasks } = this.state;
    // Only allow one task edit at a time
    const currTask = tasks.find((task) => task.id === taskId);
    const isDifferentTaskInEditMode = tasks.find(
      (task) => task.edit && task.id !== taskId
    );

    if (!currTask.edit && isDifferentTaskInEditMode) {
      alert("Can only edit one task at a time!");
      return;
    }

    // Set edit to false and save changes when done editing

    const setEditTaskState = tasks.map((task) => {
      if (task.id === taskId) {
        return { text: task.text, id: task.id, edit: !task.edit };
      }

      return task;
    });

    this.setState({
      tasks: setEditTaskState,
    });
  };

  onSubmitTask = (e) => {
    e.preventDefault();
    this.setState({
      tasks: this.state.tasks.concat({
        ...this.state.task,
        text: `${this.state.tasks.length}. ` + this.state.task.text,
      }),
      task: {
        text: "",
        id: uniqid(),
        edit: false,
      },
    });
  };

  handleDeleteTask(taskId) {
    const filteredTasks = this.state.tasks.filter((task) => task.id !== taskId);
    this.setState({ tasks: filteredTasks });
  }

  render() {
    const { task, tasks } = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmitTask}>
          <label htmlFor="taskInput">Enter task</label>
          <input
            onChange={this.handleChange}
            value={task.text}
            type="text"
            id="taskInput"
          />
          <button type="submit">Add Task</button>
        </form>
        <Overview
          tasks={tasks}
          handleDeleteTask={this.handleDeleteTask.bind(this)}
          handleEditTask={this.handleEditTask.bind(this)}
          handleEditTaskChange={this.handleEditTaskChange.bind(this)}
        />
      </div>
    );
  }
}

export default App;
