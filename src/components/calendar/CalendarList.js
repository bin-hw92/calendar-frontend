import '../../css/Calendar.css';
import styled from "styled-components";
import palette from '../../lib/styles/palette';

//현재 날짜 넣기
const nowYear = new Date().getFullYear();
const nowMonth = new Date().getMonth()+1;
const nowDay = new Date().getDate();

const TodoBlock = styled.div`
    font-size: 0.75rem;
    margin-top: 3px;
    padding: 2px 5px;
    border-radius: 5px;
    color: ${palette.gray[8]};
`;

const CalendarItem = ({ item, idx, viewDate, onClick, loading, calendarList }) => {
    const {date, fullDate, isMonth} = item;
    const thisDate = fullDate.split('.');
    const classWeek = idx % 7 === 0? 'Sun calendar-num' : (idx+1) % 7 === 0? 'Sat calendar-num' : 'calendar-num';
    const classMonth = !isMonth? 'non-month' : parseInt(date) === parseInt(viewDate)? 'on-calendar' : '' //선택된 날자 찾기
    const classNow =  nowYear === parseInt(thisDate[0]) && nowMonth === parseInt(thisDate[1]) && parseInt(date) === nowDay? 'now-date' : '';

    const todoList = calendarList.filter(({startDate, endDate}) => 
        (parseInt(startDate.year) === parseInt(thisDate[0]) && parseInt(startDate.month) === parseInt(thisDate[1]) && parseInt(startDate.date) === parseInt(date)) 
        || (parseInt(endDate.year) === parseInt(thisDate[0]) && parseInt(endDate.month) === parseInt(thisDate[1]) && parseInt(endDate.date) === parseInt(date)));

    return (
        <li className={classMonth} date-full={fullDate} onClick={() => onClick(fullDate)}>
            <div className={`${classNow} ${classWeek}`}>{date}</div>
            <>
                {!loading && (
                    todoList.map(({_id, title, label}) => {
                        const labelStyle = {
                            background : `${label.style}`,
                        }
                        return <TodoBlock key={_id} style={labelStyle} >{title}</TodoBlock>
                    })
                )}
            </>
        </li>
    );
};

const CalendarList = ({dates, viewDate, loading, error, calendarList, onClick}) => {

    return (
        <div className="calendar-list">
            <ul className="list-title">
                <li className="Sun">일</li>
                <li>월</li>
                <li>화</li>
                <li>수</li>
                <li>목</li>
                <li>금</li>
                <li className="Sat">토</li>
            </ul>
            <ul className="list-item">
                {dates.map((date, idx) => (
                 <CalendarItem key={date.fullDate} item={date} idx={idx} viewDate={viewDate} onClick={onClick} loading={loading} calendarList={calendarList}/>
                ))}
            </ul>            
        </div>
    )
}

export default CalendarList;