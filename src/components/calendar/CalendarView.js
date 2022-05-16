import "../../css/Todo.css";
import Loading from "../common/Loading";

const TimeItem = ({startDate, endDate}) => {
    return (
        <>
        {startDate.year === endDate.year && startDate.month === endDate.month && startDate.date === endDate.date?
            (<div className="time">{startDate.hour}:{startDate.min} ~ {endDate.hour}:{endDate.min}</div>):
            (
            <div className="time">
                {startDate.yeear}년{startDate.month}월{startDate.date}일 {startDate.hour}:{startDate.min} ~ 
                {endDate.yeear}년{endDate.month}월{endDate.date}일 {endDate.hour}:{endDate.min}
            </div>
            )}
        </>
        
    )
}

const CalendarView = ({ calendars, onClick, User, viewYear, viewMonth, viewDate, loading }) => {

    return (
        <div className="todo-list">
            <div className="todo-top-title">{viewYear}년{viewMonth}월{viewDate}일</div>
            {loading && calendars === null? (<Loading />) :  
                (<>
                    {calendars !== null && calendars.map(({_id, title, body, startDate, endDate, label, user}) => {
                        const labelStyle = {'background': label.style};
                        return <ul className="todo-list-item" key={_id} onClick={(e) => onClick(e, _id)}>
                                <li className="label">
                                    <span>{label.text}</span>
                                    <div style={labelStyle}></div>
                                </li>
                                {User?
                                    User.username === user.username? (
                                    <>
                                        <li className="title">
                                            <div className="title-font">{title}</div>
                                            <TimeItem startDate={startDate} endDate={endDate} key={_id} />
                                        </li>
                                        <li className="body">{body}</li>
                                        <li className="delete"></li>
                                    </>
                                ): (
                                    <>
                                        <li className="title-none">
                                            <div className="title-none-font">{title}</div>
                                            <TimeItem startDate={startDate} endDate={endDate} key={_id} />
                                        </li>
                                        <li className="body">{body}</li>
                                        <li className="delete-none"></li>
                                    </>
                                ) : 
                                (<li className="delete-none"></li>)
                                }
                            </ul>  
                        })}
                    </>
                )
            }
            
        </div>
    );
};

export default CalendarView;