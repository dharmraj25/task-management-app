import Header from './App/Header';
import './App.css';
import TaskInput from './App/TaskInput';
import TaskList from './App/TaskList';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateTask from './App/CreateTask';
import TaskDetails from './App/TaskDetails';
import UpdateTask from './App/UpdateTask';

function App() {
  const [taskslist, setTaskslist] = useState(() => {
    const saved = localStorage.getItem('taskslist');
    return saved? JSON.parse(saved) : [];
  });
  const [counter, setCounter] = useState(() => {
    return JSON.parse(localStorage.getItem('counter')) || 1;
  });
  const [filter, setFilter] = useState('All');
  

  function addTasks(taskName, description, dueDate) {
    setTaskslist(prevTasks => 
      [...prevTasks, {
        selected: false, id: counter, status: false, title: taskName,
        description: description,dueDate , createdOn: new Date().toLocaleDateString()
      }])
      setCounter(prevCounter => prevCounter + 1);
  }

  function handleDeleteTasks() {
    setTaskslist((prevTasks) => {
      return prevTasks.filter(task => !task.selected)
    })
  }

  function handleToggle(idTOTOggle) {
    setTaskslist((prevTasks) => {
      return prevTasks.map(task => (
        task.id === idTOTOggle ? { ...task, status: !task.status } : task
      ))
    })
  }

  function handleSelectOne(id) {
    setTaskslist((prevTasks) => {
      return prevTasks.map(task => (
        task.id === id ? { ...task, selected: !task.selected } : task
      ))
    })
  }

  function handleSelectAll(isChecked) {
    setTaskslist((prevTasks) => {
      return prevTasks.map(task => (
        {...task, selected: isChecked}
      ))
    })
  }

  const filteredTask = taskslist.filter(task => {
    if (filter === 'Completed') return task.status;
    if (filter === 'Pending') return !task.status;
    return true;
  })

  useEffect(() => {
    localStorage.setItem('taskslist', JSON.stringify(taskslist));
  }, [taskslist]);

  useEffect(() => {
    localStorage.setItem('counter', JSON.stringify(counter));
  }, [counter]);

  function handleUpdateTask(id, updatedTitle, updatedDesc, updatedDueDate, isCompleted){
    setTaskslist(prev => 
      prev.map(task => 
        task.id === id ? {...task, title : updatedTitle, description : updatedDesc,
         dueDate: updatedDueDate, status : isCompleted} : task
      )
    )
    
  }

  return (
    <>
      <Header />
      <Routes>
        <Route
        path='/'
        element={
      <>
      <div className="page-layout">
        <div className="left-section">
        <TaskInput  taskslist={taskslist}
        onDeleteTasks={handleDeleteTasks}
        filter={filter}
        setFilter={setFilter}
        showOnlyButtons
        />
      <TaskList taskslist={filteredTask} onSelectOne={handleSelectOne}
       onSelectAll={handleSelectAll} />
       </div>
      <div className="right-section">
      <TaskInput  taskslist={taskslist}
        onDeleteTasks={handleDeleteTasks}
        filter={filter}
        setFilter={setFilter}
        showOnlyCards
        />
      </div>
       </div>
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
      element={
      <TaskDetails taskslist={taskslist} onToggle={handleToggle} /> }
      />
      <Route 
      path='/task/:id/Edit'
      element={
        <UpdateTask onUpdate={handleUpdateTask} taskslist={taskslist}
        onToggle={handleToggle} />
      }
      />
      </Routes>
    </>
  );
}

export default App;
