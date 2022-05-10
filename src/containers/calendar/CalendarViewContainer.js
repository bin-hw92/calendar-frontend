import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CalendarView from "../../components/calendar/CalendarView";
import { changeModal, listCalendar } from "../../modules/calendar";
import { deleteCalendar, readCalendar } from "../../modules/view";
import { editCalendar } from "../../modules/write";

function timeout(delay) { 
    return new Promise( res => setTimeout(res, delay) ); 
}

const CalendarViewContainer = () => {
    const dispatch = useDispatch();
    const { form, calendars, deleteFlag, user } = useSelector(({ calendar, view, user }) => ({
        form: calendar.form,
        calendars: view.calendar,
        deleteFlag: view.deleteFlag,
        error: view.error,
        user: user.user,
    }));
    console.log(deleteFlag);
    const {viewYear, viewMonth, viewDate} = form;

    useEffect(() => {
        console.log(deleteFlag);
        dispatch(readCalendar(`${viewYear}.${viewMonth}.${viewDate}`));
    },[deleteFlag, dispatch, viewDate, viewMonth, viewYear]);

    const onClick = useCallback(async (e, id) => {
        const eClassName = e.target.className;
        if(eClassName === 'title'){
            const flag = await dispatch(editCalendar({id}));
            if(flag) await dispatch(changeModal({modalFlag:true, type:'wrtie'}));
        }
        if(eClassName === 'delete') {
            if (window.confirm("정말 삭제합니까?")) {
                const checkDate = `${viewYear}.${viewMonth}.${viewDate}`;
                await dispatch(deleteCalendar({id}));
                await timeout(300); //0.3초 딜레이
                await dispatch(readCalendar(checkDate));
                await dispatch(listCalendar({viewYear, viewMonth}));
              }
        }
    },[dispatch, viewDate, viewMonth, viewYear]);

    return (
        <CalendarView calendars={calendars} onClick={onClick} User={user}/>
    )
}

export default CalendarViewContainer;