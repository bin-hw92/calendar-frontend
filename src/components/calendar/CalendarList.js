import styled from 'styled-components';
import '../../css/Calendar.css';
import Loading from '../common/Loading';
import Responsive from '../common/Responsive';

//현재 날짜 넣기
const nowYear = new Date().getFullYear();
const nowMonth = new Date().getMonth()+1;
const nowDay = new Date().getDate();

const CalendarListBlock = styled(Responsive)`
    margin-top: 4rem;
`;


const CalendarItem = ({ item, idx, viewDate, onClick }) => {
    const {date, fullDate, isMonth, todoList, holiday} = item;
    const thisDate = fullDate.split('.');

    //클래스명 정하기
    const classWeek = idx % 7 === 0? 'Sun calendar-num' : (idx+1) % 7 === 0? 'Sat calendar-num' : holiday? 'Holiday calendar-num' : 'calendar-num';
    const classMonth = !isMonth? 'non-month' : parseInt(date) === parseInt(viewDate)? 'on-calendar' : '' //선택된 날자 찾기
    const classNow =  nowYear === parseInt(thisDate[0]) && nowMonth === parseInt(thisDate[1]) && parseInt(date) === nowDay? 'now-date' : '';

    return (
        <li className={classMonth} date-full={fullDate} onClick={() => onClick(fullDate)}>
            <div className={`${classNow} ${classWeek}`}>{date}</div>
            <div className='calendar-todo-absolute'>
                {todoList.map(({_id, title, label, startflag, endflag, daysize}, idx) => {
                    const labelStyle = {background : `${label.style}`};
                    const itemStyle =  daysize === 0 ? {overflow: 'hidden'} : {};
                    const labelClass = 'calendar-todo-item-background'.concat(startflag?' start-border-item':'').concat(endflag?' end-border-item':'');
                    return (idx < 5 && <div className='calendar-todo-item' key={_id} style={itemStyle}>
                        <div className={labelClass} style={labelStyle}></div>
                            {startflag && title}
                            </div>)
                })}
            </div>
        </li>
    );
};

const CalendarList = ({loading, dates, viewDate, error, onClick}) => {
    if(error){
        if(error.response && error.response.status === 404){
            return <CalendarListBlock>파일이 존재하지 않습니다.</CalendarListBlock>
        }
    }
    
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
                    <CalendarItem key={date.fullDate} item={date} idx={idx} viewDate={viewDate} onClick={onClick} />
                ))}
            </ul>
            {loading && <Loading />}
        </div>
    )
}

export default CalendarList;