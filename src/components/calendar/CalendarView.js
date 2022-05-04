import "../../css/Todo.css";

const CalendarView = ({calendars, onClick, User}) => {
    return (
        <div className="todo-list">
            {calendars.map(({_id, title, body, startDate, endDate, user}) => (
            <ul className="todo-list-item" key={_id} onClick={(e) => onClick(e, _id)}>
                <li className="time">{startDate.hour}:{startDate.min}</li>
                <li className="title">{title}</li>
                <li className="body">{body}</li>
                {User?
                    User.username === user.username? (
                    <li className="delete"></li>
                ): (
                    <li className="delete-none"></li>
                ) : 
                (<li className="delete-none"></li>)
                }
            </ul>
            ))}
        </div>
    );
};

export default CalendarView;