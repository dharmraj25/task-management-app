import Header from './App/Header';
import './App.css';
import TaskInput from './App/TaskInput';
import TaskList from './App/TaskList';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateTask from './App/CreateTask';
import TaskDetails from './App/TaskDetails';
import UpdateTask from './App/UpdateTask';
import Calendar from './App/Calendar';

function App() {
  const [on, setOn] = useState(() => {
    return localStorage.getItem('theme') === 'dark' ? true : false});

  const [taskslist, setTaskslist] = useState(() => {
    const saved = localStorage.getItem('taskslist');
    return saved? JSON.parse(saved) : [];
  });
  const [counter, setCounter] = useState(() => {
    return JSON.parse(localStorage.getItem('counter')) || 1;
  });
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [prior, setPrior] = useState('All');

  function addTasks(taskName, description, dueDate, prior) {
    setTaskslist(prevTasks => 
      [...prevTasks, {
        selected: false, id: counter, status: false, title: taskName,
        description: description,dueDate: dueDate || null , createdOn: new Date().toLocaleDateString(),
        priority : prior
      }]
  )
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
  const matchesPriority =
  prior === 'High' ? task.priority === 'High' :
  prior === 'Medium' ?  task.priority === 'Medium' :
  prior === 'Low' ? task.priority === 'Low' : true;

   const matchesStatus = 
   filter === 'Completed' ? task.status === true :
   filter === 'Pending' ? task.status === false : true;

   const matchesSearch = task.title?.toLowerCase().includes(search.toLowerCase());

   const matchesDate = selectedDate ? task.dueDate && task.dueDate === selectedDate : true;

   return matchesStatus && matchesSearch && matchesDate && matchesPriority;
  })

  useEffect(() => {
   return localStorage.setItem('theme', on ? 'dark' : 'light')
  } , [on])

  useEffect(() => {
    localStorage.setItem('taskslist', JSON.stringify(taskslist));
  }, [taskslist]);

  useEffect(() => {
    localStorage.setItem('counter', JSON.stringify(counter));
  }, [counter]);

  function handleUpdateTask(id, updatedTitle, updatedDesc, updatedDueDate, isCompleted, updatedPrior){
    setTaskslist(prev => 
      prev.map(task => 
        task.id === id ? {...task, title : updatedTitle, description : updatedDesc,
         dueDate: updatedDueDate, status : isCompleted, priority : updatedPrior} : task
      )
    )
     setFilter('All');
     setSelectedDate(null);
  }


  return (
    <>
    <div className={`app ${on ? 'dark' : 'light'}`}>
      <Header on={on} setOn={setOn}/>
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
        search={search}
        setSearch={setSearch}
        prior={prior}
        setPrior={setPrior}
        on={on}
        />
      <TaskList taskslist={filteredTask} onSelectOne={handleSelectOne}
       onSelectAll={handleSelectAll} on={on} />
       </div>
      <div className="right-section">
      <Calendar on={on} setSelectedDate={setSelectedDate} taskslist={taskslist} selectedDate={selectedDate} /> 
      <TaskInput  taskslist={taskslist}
        onDeleteTasks={handleDeleteTasks}
        filter={filter}
        setFilter={setFilter}
        showOnlyCards
        search={search}
        setSearch={setSearch}
        prior={prior}
        setPrior={setPrior}
        on={on}
        />
      </div>
       </div>
      </>} 
      />
      <Route 
      path='/task/new'
      element={
        <CreateTask onAddTasks={addTasks} on={on} />
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
        onToggle={handleToggle} on={on} />
      }
      />
      </Routes>
    </div>
    </>
  );
}

export default App;
