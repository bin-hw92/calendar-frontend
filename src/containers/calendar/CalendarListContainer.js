import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CalendarList from "../../components/calendar/CalendarList";
import { changeCalendar, changeModal, initialize, listCalendar } from "../../modules/calendar";
import { changeField, changeSubField } from "../../modules/write";
 
const DayCalc = ({viewYear, viewMonth}) => {
    // 지난 달 마지막 Date, 이번 달 마지막 Date
    const prevLast = new Date(viewYear, viewMonth - 1, 0);
    const thisLast = new Date(viewYear, viewMonth, 0);

    const PLYear = prevLast.getFullYear();
    const PLMonth =  ("0" + (1 + prevLast.getMonth())).slice(-2);
    const PLDate = prevLast.getDate();
    const PLDay = prevLast.getDay();

    const TLDate = thisLast.getDate();
    const TLDay = thisLast.getDay();

    const NLYear = 2 + thisLast.getMonth() === 13 ? thisLast.getFullYear() + 1 : thisLast.getFullYear();
    const NLMonth = ("0" + (2 + thisLast.getMonth() === 13 ? '01' : 2 + thisLast.getMonth())).slice(-2);

    // Dates 기본 배열들
    const thisDates = [];
  
    // prevDates 계산
    if (PLDay !== 6) {
      for (let i = 0; i < PLDay + 1; i++) {
        thisDates.unshift({
            date: PLDate - i,
            fullDate: `${PLYear}.${PLMonth}.${PLDate - i}`,
            isMonth: false,
        });
      }
    }
    //현재 달 게산
    for(let i=1; i < TLDate+1; i++){
        const day = i < 10? `0${i}` : i;
        thisDates.push({
            date: day, 
            fullDate: `${viewYear}.${viewMonth}.${day}`,
            isMonth: true,
        });
    }
    // nextDates 계산
    for (let i = 1; i < 7 - TLDay; i++) {
        const day = `0${i}`;
        thisDates.push({
            date: day, 
            fullDate: `${NLYear}.${NLMonth}.${day}`,
            isMonth: false,
        });
    }

    return thisDates;
}

const CalendarListContainer = () => {
    const [dates, setDates] = useState([]);
    const dispatch = useDispatch();
    const {form, calendarList, error, loading, user } = useSelector(({ calendar, loading, user }) => ({
        form: calendar.form,
        calendarList: calendar.calendarList,
        error: calendar.error,
        loading: loading['calendar/LIST_CALENDAR'],
        user: user.user
    }));
    const {viewYear, viewMonth, viewDate} = form;

    useEffect(() => {
        return () => { // 언마운트될 때 초기화
            dispatch(initialize());
        };
    },[dispatch]);

    useEffect(() => {
        dispatch(listCalendar({viewYear, viewMonth}));
        const tisDates = DayCalc({viewYear, viewMonth});
        setDates(tisDates);
    },[viewYear, viewMonth, viewDate, dispatch]);

    const onClick = useCallback((fullDate) => {
        const DateArray = fullDate.split('.');
        dispatch(changeCalendar({
            viewYear: DateArray[0],
            viewMonth: DateArray[1],
            viewDate: DateArray[2],
        }));
        //팝업 띄우기 전에 write에 달력 값 넣기
        dispatch(changeField({key: 'startDay', value: fullDate}));
        dispatch(changeField({key: 'endDay', value: fullDate}));
        dispatch(changeSubField({form: 'startDate', key: 'year', value: DateArray[0]}));
        dispatch(changeSubField({form: 'startDate', key: 'month', value: DateArray[1]}));
        dispatch(changeSubField({form: 'startDate', key: 'date', value: DateArray[2]}));
        dispatch(changeSubField({form: 'endDate', key: 'year', value: DateArray[0]}));
        dispatch(changeSubField({form: 'endDate', key: 'month', value: DateArray[1]}));
        dispatch(changeSubField({form: 'endDate', key: 'date', value: DateArray[2]}));
        
        //값이 있을 경우 해당 날짜 상세 보여주기!!
        const TodoLen = calendarList.filter(({startDay}) => startDay === fullDate).length;
        if(TodoLen > 0) dispatch(changeModal({modalFlag:true, type:'view'}));
    },[calendarList, dispatch]);

    return (
        <CalendarList 
            dates={dates} 
            viewDate={viewDate} 
            loading={loading}
            error={error}
            calendarList={calendarList}
            onClick={onClick}
        />
    )
};

export default CalendarListContainer;