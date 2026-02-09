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
        <div className="taskdetails">
        <div>
        <label>Task Name : </label>
        <span>{task.title}</span>
        </div>
        <div>
        <label>Task Details : </label>
        <p>{task.description}</p>
        </div>
        <div>
        <label>Created On : </label>
        <span>{task.createdOn}</span>
        </div>
        <p className="detailpara">Task Status : {task.status ? 'Completed' : 'Pending'}</p>
        <div className="detailbtn-container">
        <Button onClick={() => navigate('/')}>Back</Button>
        <Button onClick={() => navigate(`/task/Update/${task.id}`)}>Edit</Button>
        </div>
        </div>
        </>
    );
}