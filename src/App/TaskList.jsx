import Notes from "../App/Notes.png";
import { Link } from "react-router-dom";

export default function TaskList({ taskslist, onToggle }) {

    function handleClick() {
        console.log("Task Title Clicked");
    }


    return (
        <>
        {taskslist.length === 0 && <div className="else-container">
        <img className="notesimage" src={Notes} alt="Notes Image" />
        <p>Please Add A Task....</p></div>}
        {taskslist.length > 0 &&
        <div className="table-container">
        <table className="table">
        <thead>
        <tr>
        <th>Id</th>
        <th>Status</th>
        <th>Task Title</th>
        <th>Created On</th>
        </tr>
        </thead>
        
        <tbody>
        {taskslist.map((task) => (
        <tr key={task.id}>
        <td>{task.id}</td>
        <td><input className="checkbox" type="checkbox" checked={task.status}
        onChange={() => onToggle(task.id)} /></td>
        <td onClick={handleClick} className="task-title">
        <Link to={`/task/${task.id}`}>{task.title}</Link></td>
        <td>{task.createdOn}</td>
        </tr>
        ))}
        </tbody>
        </table>
        </div>}
        </>
    );
}