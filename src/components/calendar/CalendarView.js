

const CalendarView = ({calendars}) => {
    return (
        <div>{calendars.map(({_id, title}) => (
            <div key={_id}>{title}</div>
        ))}</div>
    );
};

export default CalendarView;