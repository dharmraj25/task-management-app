import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "./Button";
import { getDueDates } from "./getRemainingDays";

export default function UpdateTask({onUpdate, taskslist}) {
    const [isCompleted, setIsCompleted] = useState(false);
    const [dueDate, setDueDate] = useState('');
    const {id} = useParams();
    const navigate = useNavigate();
    const task = taskslist.find(task => task.id === Number(id));

    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (task){
            setTaskName(task.title);
            setDescription(task.description)
            setIsCompleted(task.status)
            setDueDate(task.dueDate || '')
        }
    }, [task])

   

    return (
        <>
        <div className="crttask">
        <div className="crttaskinput">
        <label>Task Name : </label>
        <div className="input-wrapper">
        <input type="text" placeholder="Enter Name"  value={taskName}
        onChange={((event) => setTaskName(event.target.value))}/>            
        </div>
        </div>
        <div className="crttaskinput">
        <label className="txtarea">Description : </label>
        <div className="input-wrapper">
        <textarea placeholder="Enter Description" value={description}
        onChange={(event) => setDescription(event.target.value)}></textarea>            
        </div>
        </div>
        <div className="crttaskinput duedate-wrapper">
            <label>Due Date : </label>
            <input type="date" value={dueDate} className={`due-Date ${getDueDates(task.dueDate)}`}
            onChange={(event) => {setDueDate(event.target.value)}} />
            </div>
        <div className="update-text">
        <p>Mark Task as Completed : </p>
        <input type="checkbox" className="update-checkbox" checked={isCompleted}
        onChange={(event) => setIsCompleted(event.target.checked)} /></div>
        <div className="crttaskbtn-container">
        <Button className='crttaskbtn' onClick={() => navigate('/')}>Back</Button> 
        <Button className='crttaskbtn' onClick={() => {onUpdate(Number(id), taskName, description, dueDate, isCompleted)
        navigate('/')
        }}>Update</Button>
        </div>
        </div>
        </>
    );
}