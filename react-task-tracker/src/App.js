import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () =>{
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer)
    }
    getTasks();
  }, [])

  //setTasks will be used to add or change values of tasks. we cannot use task.push();

  //fetching tasks from backend
  const fetchTasks = async() => {
    const rs = await fetch('http://localhost:5000/tasks')
    const data = await rs.json();
    return data;
  }
  //fetching a task from BE
  const fetchTask = async(id) => {
    const rs = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await rs.json();
    return data;
  } 


  //Delete a task -- from BE as well
  const deleteTask = async(id) =>{
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })
    setTasks(tasks.filter((task) => task.id !== id));
  }

  //toggle reminder

  const ToggleReminder = async (id) =>{
    const taskToToggle = await fetchTask(id)
    const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder}

    const rs = await fetch(`http://localhost:5000/tasks/${id}`, {method: 'PUT', headers: {'Content-type': 'application/json'}, body: JSON.stringify(updatedTask)})

    const data = await rs.json();

    setTasks(tasks.map((task) => task.id === id? {...task, reminder: ! data.reminder}: task))
  }

  //add tasks
  const addTask = async(task) =>{
    const rs = await fetch('http://localhost:5000/tasks', { method: 'POST', headers: {'Content-type': 'application/json'}, body: JSON.stringify(task)})
    const data = await rs.json();
    setTasks([...tasks, data])
  }


  return (
    <Router>
      <div className="container">
        <Header onAdd= {() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
        
        <Routes>
          <Route path="/" element={<>  
          {showAddTask && <AddTask onAdd = {addTask}/>} 
          {tasks.length > 0? (<Tasks tasks = {tasks} onDelete={deleteTask} onToggle = {ToggleReminder}/>) : ('No Tasks to show') }
          </>}
          />
        <Route path="/about" element={<About />}/>
        </Routes>
        
        <Footer />

      </div>
    </Router>
  );
}

//showAddTask && <AddTask onAdd = {addTask} --- && is a ternatry condition without an else. its used here because we need to show the <AddTask> only if showAddTask is true

export default App;
