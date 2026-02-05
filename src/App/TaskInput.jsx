import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function TaskInput({taskslist, onDeleteTasks, filter, setFilter }) {

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
                    <Button onClick={() => navigate('/task/new')} className='crttaskbtn'>Add Task</Button>
                    {taskslist.length > 0 && <>
                        <Button className='crttaskbtn'>Update Task</Button>
                        <Button onClick={onDeleteTasks} 
                        disabled={!taskslist.some(task => task.status)} className='crttaskbtn deletebtn'>Delete Task</Button>
                    </>
                    }
                </div>
        </>
        
    );
}