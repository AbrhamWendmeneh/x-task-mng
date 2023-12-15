import React, { useState } from 'react';
import './App.css';

const initialList = [
  {
    taskname: "task1",
    taskdescription: "Do some school project",
    duedate: new Date("2023-10-31")
  },
  {
    taskname: "task2",
    taskdescription: "Prepare for the upcoming exam",
    duedate: new Date("2023-11-15")
  },
  {
    taskname: "task3",
    taskdescription: "Complete the programming assignment",
    duedate: new Date("2023-11-05")
  }
];

function App() {
  const [tasks, setTasks] = useState(initialList);
  const [task, setTask] = useState({
    taskname: '',
    taskdescription: '',
    duedate: ''
  });
  const [open, setOpen] = useState(true);

  function handleClose() {
    setOpen(!open);
  }

  function handleAddTask() {
    if (task.taskname && task.taskdescription && task.duedate) {
      const newTask = {
        id: Date.now(),
        taskname: task.taskname,
        taskdescription: task.taskdescription,
        duedate: new Date(task.duedate) // Convert duedate to a Date object
      };
      setTasks([...tasks, newTask]);
      setTask({
        taskname: '',
        taskdescription: '',
        duedate: ''
      });
    }

    
  }

  function handleDeleteItem(id) {
    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
      const updatedTasks = [...tasks];
      updatedTasks.splice(taskIndex, 1); // Remove the task at the found index
      setTasks(updatedTasks);
    }
  }
  

  return (
    <div>
      {open && (
        <Taskform
          task={task}
          setTask={setTask}
          addTask={handleAddTask}
        />
      )}
      <div className={`button-container ${open ? 'open' : ''}`}>
        <button
          onClick={handleClose}
          style={{
            backgroundColor: open ? '#0056b3' : '#007bff',
            transition: 'background-color 0.3s ease-in-out',
          }}
        >
          {open ? 'Close' : 'Add Task'}
        </button>
    </div>
  <TaskList
    tasks={tasks}
    onDeleteItem={handleDeleteItem}
  />
</div>

  );
}

function Taskform({ task, setTask, addTask }) {
  function handleSubmit(e) {
    e.preventDefault();
    if (task.taskname && task.taskdescription && task.duedate) {
      addTask();
    }
  }

  return (
    <form className='task-form' onSubmit={handleSubmit}>
      <h3>Enter your task you want to do</h3>
      <div className='form-elem'>
        <section className='form-section'>
          <label>Task Name</label>
          <input
            type='text'
            className='input-field'
            value={task.taskname}
            onChange={(e) => setTask({ ...task, taskname: e.target.value })}
          />
        </section>
        <section className='form-section'>
          <label>Task Description</label>
          <input
            type='text'
            className='input-field'
            value={task.taskdescription}
            onChange={(e) => setTask({ ...task, taskdescription: e.target.value })}
          />
        </section>
        <section className='form-section'>
          <label>Due Date</label>
          <input
            type='date'
            className='input-field'
            value={task.duedate}
            onChange={(e) => setTask({ ...task, duedate: e.target.value })}
          />
        </section>
      </div>
      <div className='button-container'>
        <button type='submit' className='add-button'>Add</button>
        <button
          type='button'
          className='close-button'
          onClick={() => setTask({ taskname: '', taskdescription: '', duedate: '' })}
        >
          Clear
        </button>
      </div>
    </form>
  );
}

function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>
}

function TaskList({ tasks ,onDeleteItem}) {
  return (
    <div className="task-list">
      {tasks.map((task, index) => (
        <TaskCard
          key={index}
          task={task}
          onDeleteItem={onDeleteItem}
        />
      ))}
    </div>
  );
}

function TaskCard({ task,onDeleteItem }) {
  const [clicked, setClicked] = useState(false);

  const toggleStar = () => {
    setClicked(!clicked);
  }

  return (
    <div className="task-card" style={{ background: clicked ? '#EEBBBB' : '', cursor: 'pointer' }}>
      <div className="card-header">
        <button onClick={()=>onDeleteItem(task.id)} className="close-icon">
          &#x2715;
        </button>
      </div>
      <h3>{task.taskname}</h3>
      <p>{task.taskdescription}</p>
      <p>Due Date: {task.duedate.toLocaleDateString()}</p>
      <div className="start-icon" style={{ color: clicked ? 'red' : 'black', cursor: 'pointer' }} onClick={toggleStar}>
      {clicked ? '★' : '☆'}
      </div>
    </div>
  );
}

export default App;
