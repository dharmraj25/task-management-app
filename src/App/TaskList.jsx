import Notes from "../App/Notes.png";
import { Link } from "react-router-dom";
import { getDueDates } from "./getRemainingDays";
import { useState } from "react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

export default function TaskList({ taskslist, onSelectAll, onSelectOne, on }) {
    const [sortColumn, setSortColumn] = useState({
        key: null,
        direction: null
    });

    const [prior, setPrior] = useState('Priority')

    const filteredPriority = prior === 'Priority' ? taskslist : taskslist.filter(
        task => task.priority === prior
    );

function handleSortedData(key) {
        setSortColumn(prev => {
        if (prev.key !== key) return { key, direction: 'asc' };
        if (prev.direction === 'asc') return { key, direction: 'desc'};
        return { key: null, direction : null };
         });
        }
        
const sortedSubName = [...filteredPriority].sort((a, b) => {
    if (!sortColumn.key || !sortColumn.direction) return 0;

    const aValue = a[sortColumn.key];
    const bValue = b[sortColumn.key];

    if(aValue == null) return 1;
    if(bValue == null) return -1;

    if(aValue < bValue) return sortColumn.direction === 'asc' ? -1 : 1;
    if(aValue > bValue) return sortColumn.direction === 'asc' ? 1 : -1;
    return 0;
})

function handleSubNameIcons(colkey) {
    if(sortColumn.key !== colkey) return <FaSort />;
    if(sortColumn.direction === 'asc') return <FaSortDown />
    if(sortColumn.direction === 'desc') return <FaSortUp />
}

    return (
        <>
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th><input type="checkbox" className="checkbox"
                                checked={taskslist.length > 0 && taskslist.every(task => task.selected)}
                                onChange={(e) => onSelectAll(e.target.checked)} /></th>
                            <th>Id</th>
                            <th>Status</th>
                            <th className='tableheaders' onClick={() => handleSortedData('title')}>
                                <div className="th-content">subject name{handleSubNameIcons('title')}</div></th>
                            <th>Created On</th>
                            <th className="tableheaders" onClick={() => handleSortedData('dueDate')}>
                                <div className="th-content">Due Date {handleSubNameIcons('dueDate')}</div></th>
                            <th className={`th-dropdown ${on ? 'dark' : 'light'}`}><select className={`header-select ${on ? 'dark' : 'light'}`}
                            value={prior} onChange={(e) => setPrior(e.target.value)}>
                                <option value="Priority" className={`values ${on ? 'dark' : 'light'}`}>Priority</option>
                                <option value="High" className={`values ${on ? 'dark' : 'light'}`}>High</option>
                                <option value="Medium" className={`values ${on ? 'dark' : 'light'}`}>Medium</option>
                                <option value="Low" className={`values ${on ? 'dark' : 'light'}`}>Low</option>
                            </select></th>
                        </tr>
                    </thead>

                    <tbody>
                        {sortedSubName.length === 0 && <>
                            <tr>
                                <td colSpan={7}>
                                    <div className="no-records">
                                        <img src={Notes} alt="Notes" className="notesimage" />
                                    </div>
                                    <div className={`no-records-text ${on ? 'dark' : 'light'}`}>
                                        No Records Found!
                                    </div>
                                </td>
                            </tr>
                        </>}
                        {sortedSubName.map((task) => (
                            <tr key={task.id}>
                                <td><input type="checkbox" className="checkbox" checked={!!task.selected}
                                    onChange={(e) => onSelectOne(task.id)} /></td>
                                <td>{task.id}</td>
                                <td>{task.status ? 'Completed' : 'Pending'}</td>
                                <td className="task-title">
                                    <Link to={`/task/${task.id}`}>{task.title}</Link></td>
                                <td>{task.createdOn}</td>
                                <td className={`due-Date ${task.dueDate ? getDueDates(task.dueDate) : ''}`}
                                >{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Not Set'}</td>
                                <td>{task.priority}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}