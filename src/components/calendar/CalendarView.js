import "../../css/Todo.css";

const CalendarView = ({calendars}) => {
    return (
        <div className="todo-list">
            {calendars.map(({_id, title, startDate, endDate}) => (
            <ul className="todo-list-item" key={_id}>
                <li>{startDate.hour}.{startDate.min}</li>
                <li>{title}</li>
                <li></li>
            </ul>
            ))}
        </div>
    );
};

export default CalendarView;