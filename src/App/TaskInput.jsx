import { useNavigate } from "react-router-dom";
import Trash from "../App/Trash.png";

export default function TaskInput({ taskslist, onDeleteTasks, setFilter, showOnlyButtons, showOnlyCards, search, setSearch, prior, setPrior, on }) {
    const selectedTask = taskslist.filter(task => task.selected)
    const canEdit = selectedTask.length === 1;

    const navigate = useNavigate();

    return (
        <>
        {showOnlyButtons && <>
        <div className="inputbtn-container top-buttons">
        <div className="search-container">
        <input type="text" placeholder="🔍 Search Subject..." className="search"
        value={search} onChange={(event) => setSearch(event.target.value)}
        /></div>
        <button onClick={() => navigate('/task/new')} className='inputbtn' title="Add Task" >+</button>
        <button className='inputbtn' title={canEdit ? 'Edit Task' : 'Select One Task To Edit'} 
        disabled={!canEdit} onClick={() => navigate(`/task/${selectedTask[0].id}/Edit`)}>✏️</button>
        <button onClick={onDeleteTasks} title="Delete Task"
        disabled={!taskslist.some(task => task.selected)} className='inputbtn'>
        <img src={Trash} alt="Delete Button" className="trash" /></button>
        </div>
        </>}
        {showOnlyCards && <>
        <div className="card-container">
        <div className="all-card">
        <h2 onClick={() => setFilter('All')}>All : {taskslist.length}</h2>
        </div>
        <div className="complete-card">
        <h2 onClick={() => setFilter('Completed')}>Completed : {taskslist.filter(task => task.status).length}</h2>
        </div>
        <div className="pending-card">
        <h2 onClick={() => setFilter('Pending')}>Pending : {taskslist.filter(task => !task.status).length}</h2>
        </div>
        </div>
        </>}
        </>)}