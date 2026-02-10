import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useState } from "react";

export default function CreateTask({onAddTasks}) {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [errName, setErrName] = useState('')
    const [errDescription, setErrDescription] = useState('')
    const [dueDate, setDueDate] = useState('');
    const navigate = useNavigate();
        

    function handleAddTask(){
        if(taskName.trim() === ''){
            setErrName('Please Enter Task Name');
            return;
        }

        if(description.trim() === ''){
            setErrDescription('PLease Enter Details');
            return;
        }
        onAddTasks(taskName, description, dueDate);
        setTaskName('');
        navigate('/')
    }

    return (
        <>
            <div className="crttask">
            <div className="crttaskinput">
            <label>Task Name : </label>
            <div className="input-wrapper">
            <input type="text" placeholder="Enter Name"  value={taskName}
            onChange={(event) => {setTaskName(event.target.value);
                if(event.target.value.trim() !== ''){
            setErrName('');}
            }}/>
            {errName && <p className="error">{errName}</p>}
            </div>
            </div>
            <div className="crttaskinput">
            <label className="txtarea">Description : </label>
            <div className="input-wrapper">
            <textarea placeholder="Enter Description" value={description}
            onChange={(event) => {setDescription(event.target.value);
            if(event.target.value.trim() !== ''){
            setErrDescription('');} 
            }}></textarea>
            {errDescription && <span className="error">{errDescription}</span>}
            </div>
            <div className="crttaskinput duedate-wrapper">
            <label>Due Date : </label>
            <input type="date" value={dueDate} onChange={(event) => {setDueDate(event.target.value)}} />
            </div>
            </div>
            <div className="crttaskbtn-container">
             
            <Button className='crttaskbtn' onClick={() => navigate('/')}>Back</Button> 
            <Button className='crttaskbtn' onClick={handleAddTask}>Add Task</Button>
            </div>
            </div>
        </>
    );
}