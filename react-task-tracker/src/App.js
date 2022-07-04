import { useState } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Eat healthy food",
      day: "July 3rd at 1.30pm",
      reminder: true,
    },
    {
      id: 2,
      text: "Learn React",
      day: "July 3rd at 2.30pm",
      reminder: true,
    },
    {
      id: 3,
      text: "Daily Reflection",
      day: "July 3rd at 6.30pm",
      reminder: true,
    },
  ]);

  //setTasks will be used to add or change values of tasks. we cannot use task.push();

  //Delete a task
  const deleteTask = (id) =>{
    setTasks(tasks.filter((task) => task.id !== id));
  }

  //toggle reminder

  const ToggleReminder = (id) =>{
    setTasks(tasks.map((task) => task.id === id? {...task, reminder: ! task.reminder}: task))
  }

  //add task
  const addTask = (task) =>{
    const id = Math.floor(Math.random()* 10000) + 1 
    const newTask = {id, ...task}
    setTasks([...tasks, newTask])
  }


  return (
    <div className="container">
      <Header onAdd= {() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
      {showAddTask && <AddTask onAdd = {addTask}/>} 
      {tasks.length > 0? (<Tasks tasks = {tasks} onDelete={deleteTask} onToggle = {ToggleReminder}/>) : ('No Tasks to show') }
    </div>
  );
}

//showAddTask && <AddTask onAdd = {addTask} --- && is a ternatry condition without an else. its used here because we need to show the <AddTask> only if showAddTask is true

export default App;
