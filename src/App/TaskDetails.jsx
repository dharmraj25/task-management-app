import { useParams } from "react-router-dom";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function TaskDetails({taskslist, onToggle}) {
    const navigate = useNavigate();
    const {id} = useParams();
    const task = taskslist.find(task => task.id === Number(id));

    if(!task){
        return <p>Task Not Found</p>
    }

    return (
        <>
        <p className="detailpara">Mark Task As Completed : <input type="checkbox" className="checkbox" 
        checked={task.status}  onChange={() => onToggle(task.id)} /></p>
        <div className="taskdetails">
        <div>
        <label>Task Name : </label>
        <span>{task.title}</span>
        </div>
        <div>
        <label>Task Details : </label>
        <span>{task.description}</span>
        </div>
        <div>
        <label>Created On : </label>
        <span>{task.createdOn}</span>
        </div>
        <div>
        <Button onClick={() => navigate('/')}>Back</Button>
        </div>
        </div>
        </>
    );
}