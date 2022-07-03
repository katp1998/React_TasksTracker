import { useState } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";

function App() {
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
    console.log('delete', id);
  }

  return (
    <div className="container">
      <Header  />
      <Tasks tasks = {tasks} onDelete={deleteTask} />
    </div>
  );
}

export default App;
