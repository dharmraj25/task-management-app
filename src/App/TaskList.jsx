import Notes from "../App/Notes.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function TaskList({ taskslist, onSelectAll, onSelectOne }) {

    const navigate = useNavigate();

    return (
        <>
        <div className="table-container">
        <table className="table">
        <thead>
        <tr>
        <th><input type="checkbox" className="checkbox"
        checked={taskslist.length > 0 && taskslist.every(task => task.selected)}
        onChange={(e) => onSelectAll(e.target.checked)}/></th>
        <th>Id</th>
        <th>Status</th>
        <th>Task Title</th>
        <th>Created On</th>
        </tr>
        </thead>
        
        <tbody>
        {taskslist.length === 0 && <>
        <tr>
        <td colSpan={5}>
            <div className="no-records">
                <img src={Notes} alt="Notes" className="notesimage" />
            </div>
            <div className="no-records-text">
                No Records Found!
            </div>
        </td>
        </tr>
        </>}
        {taskslist.map((task) => (
        <tr key={task.id}>
        <td><input type="checkbox" className="checkbox" checked={!!task.selected}
         onChange={(e) => onSelectOne(task.id)} /></td>
        <td>{task.id}</td>
        <td>{task.status ? 'Completed' : 'Pending'}</td>
        <td className="task-title">
        <Link to={`/task/${task.id}`}>{task.title}</Link></td>
        <td>{task.createdOn}</td>
        </tr>
        ))}
        </tbody>
        </table>
        </div>
        </>
    );
}