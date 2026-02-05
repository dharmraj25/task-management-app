import Header from './App/Header';
import './App.css';
import TaskInput from './App/TaskInput';
import TaskList from './App/TaskList';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateTask from './App/CreateTask';
import TaskDetails from './App/TaskDetails';

function App() {
  const [taskslist, setTaskslist] = useState([]);
  const [counter, setCounter] = useState(1);
  const [filter, setFilter] = useState('All');

  function addTasks(taskName, description) {
    setTaskslist(prevTasks => 
      [...prevTasks, {
        id: counter, status: false, title: taskName,
        description: description, createdOn: new Date().toLocaleDateString()
      }])
      setCounter(prevCounter => prevCounter + 1);
  }


  function handleDeleteTasks() {
    setTaskslist((prevTasks) => {
      return prevTasks.filter(task => !task.status)
    })
  }

  function handleToggle(idTOTOggle) {
    setTaskslist((prevTasks) => {
      return prevTasks.map(task => (
        task.id === idTOTOggle ? { ...task, status: !task.status } : task
      ))
    })
  }

  const filteredTask = taskslist.filter(task => {
    if (filter === 'Completed') return task.status;
    if (filter === 'Pending') return !task.status;
    return true;
  })

  return (
    <>
      <Header />
      <Routes>
        <Route
        path='/'
        element={
      <>
      <TaskInput  taskslist={taskslist}
        onDeleteTasks={handleDeleteTasks}
        filter={filter}
        setFilter={setFilter} />
      <TaskList taskslist={filteredTask} onToggle={handleToggle} />
      </>} 
      />
      <Route 
      path='/task/new'
      element={
        <CreateTask onAddTasks={addTasks} />
      }
      />
      <Route 
      path='/task/:id'
      element={<TaskDetails taskslist={taskslist}/>}
      />
      </Routes>
    </>
  );
}

export default App;
