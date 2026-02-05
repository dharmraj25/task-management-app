import Button from "./Button";
import { useNavigate } from "react-router-dom";
import Trash from "../App/Trash.png";

export default function TaskInput({ taskslist, onDeleteTasks, filter, setFilter }) {

    const navigate = useNavigate();


    return (
        <>
            <div className="button-container">
                {taskslist.length > 0 &&
                    <select className="select" value={filter}
                        onChange={(event) => setFilter(event.target.value)}>
                        <option value='All'>All</option>
                        <option value='Completed'>Completed {taskslist.filter(task => task.status).length}</option>
                        <option value='Pending'>Pending {taskslist.filter(task => !task.status).length}</option>
                    </select>}
                <span className="inputbtn-container">
                    {taskslist.length > 0 && <>
                    <button onClick={() => navigate('/task/new')} className='inputbtn' title="Add Task" >+</button>
                        <button className='inputbtn' title="Edit Task">✏️</button>
                        <button onClick={onDeleteTasks} title="Delete Task"
                            disabled={!taskslist.some(task => task.selected)} className='inputbtn'>
                            <img src={Trash} alt="Delete Button" className="trash" /></button>
                    </>
                    }
                </span>
            </div>
        </>

    );
}