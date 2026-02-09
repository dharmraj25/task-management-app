import { useNavigate } from "react-router-dom";
import Trash from "../App/Trash.png";

export default function TaskInput({ taskslist, onDeleteTasks, setFilter, showOnlyButtons, showOnlyCards }) {
    const selectedTask = taskslist.filter(task => task.selected)
    const canEdit = selectedTask.length === 1;

    const navigate = useNavigate();


    return (
        <>
        {showOnlyButtons &&
        <div className="inputbtn-container top-buttons">
        <button onClick={() => navigate('/task/new')} className='inputbtn' title="Add Task" >+</button>
        <button className='inputbtn' title={canEdit ? 'Edit Task' : 'Select One Task To Edit'} 
        disabled={!canEdit} onClick={() => navigate(`/task/${selectedTask[0].id}/Edit`)}
         >✏️</button>
        <button onClick={onDeleteTasks} title="Delete Task"
        disabled={!taskslist.some(task => task.selected)} className='inputbtn'>
        <img src={Trash} alt="Delete Button" className="trash" /></button>
        </div>
        }
        {showOnlyCards &&
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
}
        </>

    );
}
// <select className="select" value={filter}
//         onChange={(event) => setFilter(event.target.value)}>
//             <option value='All'>All</option>
//             <option value='Completed'>Completed {taskslist.filter(task => task.status).length}</option>
//             <option value='Pending'>Pending {taskslist.filter(task => !task.status).length}</option>
//         </select>