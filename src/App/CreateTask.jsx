import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useState } from "react";

export default function CreateTask({onAddTasks}) {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [errName, setErrName] = useState('')
    const [errDescription, setErrDescription] = useState('')
    const navigate = useNavigate();
        

    function handleAddTask(){
        if(taskName.trim() === ''){
            setErrName('PLease Enter Task Name');
            return;
        }

        if(description.trim() === ''){
            setErrDescription('PLease Enter Details');
            return;
        }
        onAddTasks(taskName, description);
        setTaskName('');
        setErrName('');
        setDescription('');
        navigate('/')
    }

    return (
        <>
            <div className="crttask">
            <div className="crttaskinput">
            <label>Task Name : </label>
            <input type="text" placeholder="Enter Name"  value={taskName}
            onChange={((event) => setTaskName(event.target.value))}/>
            {errName && <p className="error">{errName}</p>}
            </div>
            <div className="crttaskinput">
            <label className="txtarea">Description : </label>
            <textarea placeholder="Enter Description" value={description}
            onChange={(event) => setDescription(event.target.value)}></textarea>
            {errDescription && <p className="error">{errDescription}</p>}
            </div>
            </div>
            
            <div className="crttaskbtn-container">
             
            <Button className='crttaskbtn' onClick={() => navigate('/')}>Back</Button> 
            <Button className='crttaskbtn' onClick={handleAddTask}>Add Task</Button>
            </div>
        </>
    );
}