import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import CalendarHeader from "../../components/calendar/CalendarHeader";
import { changeCalendar, changeModal } from "../../modules/calendar";


const CalendarHeaderContainer = () => {    
    const dispatch = useDispatch();
    const {viewYear, viewMonth, user} = useSelector(({ calendar, user }) => ({
        viewYear: calendar.form.viewYear,
        viewMonth: calendar.form.viewMonth,
        user: user.user,
    }));

    const onClick = useCallback(idx => {
        const thisDate = new Date(viewYear, viewMonth, 0);
        if(idx === -1){ //이전
            if(viewMonth === '01'){
                dispatch(changeCalendar({
                    viewYear: viewYear - 1,
                    viewMonth: '12',
                    viewDate: '01',
                }));
            }else{
                dispatch(changeCalendar({
                    viewYear,
                    viewMonth: ("0" + (thisDate.getMonth() !== 0? thisDate.getMonth() : 12)).slice(-2),
                    viewDate: '01',
                }));
            }
        }
        if(idx === 1){ //다음
            if(viewMonth === '12'){
                dispatch(changeCalendar({
                    viewYear: viewYear + 1,
                    viewMonth: '01',
                    viewDate: '01',
                }));
            }else{
                dispatch(changeCalendar({
                    viewYear,
                    viewMonth: ("0" + (2 + thisDate.getMonth() !== 0? thisDate.getMonth()+2 : 12)).slice(-2),
                    viewDate: '01',
                }));
            }
        }
        
    },[dispatch, viewMonth, viewYear]);


    const onModalClick = () => {
        dispatch(changeModal({modalFlag:true, type:'wrtie'}));
    };

    return (
        <CalendarHeader user={user} viewYear={viewYear} viewMonth={viewMonth} onClick={onClick} onModalClick={onModalClick}/>
    )
};

export default CalendarHeaderContainer;