export default function Header({on, setOn}) {
    return (
        <>
        <header className="header">
        <h1>MyStudy Planner</h1>
        <label className='switch' title="Theme"><input type="checkbox"
        checked={on} onChange={() => setOn(!on)} /><span className="slider"></span></label>
        </header>
   </>);
}