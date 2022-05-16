import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CalendarHeader from "../../components/calendar/CalendarHeader";
import { changeCalendar, changeField, changeModal, changeSubField } from "../../modules/calendar";
import { tableout } from "../../modules/tables";


const CalendarHeaderContainer = () => {    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {viewYear, viewMonth, user, tableCalendar} = useSelector(({ calendar, user, tables }) => ({
        viewYear: calendar.form.viewYear,
        viewMonth: calendar.form.viewMonth,
        user: user.user,
        tableCalendar: tables.tableCalendar,
    }));

    const onClick = useCallback(idx => {
        const thisDate = new Date(viewYear, viewMonth, 0);
        let changeYear = viewYear;
        let changeMonth = viewMonth;
        let changeDate = '01';
        if(idx === -1){ //이전
            if(viewMonth === '01'){
                changeYear = ''+(parseInt(viewYear) - 1);
                changeMonth = '12';
            }else{
                changeMonth = ("0" + (thisDate.getMonth() !== 0? thisDate.getMonth() : 12)).slice(-2);
            }
        }
        if(idx === 1){ //다음
            if(viewMonth === '12'){
                changeYear = ''+(parseInt(viewYear) + 1);
                changeMonth = '01';
            }else{
                changeMonth = ("0" + (2 + thisDate.getMonth() !== 0? thisDate.getMonth()+2 : 12)).slice(-2);
            }
        }
        if(idx === 0){
            const nowDate = new Date();
            changeYear = ''+nowDate.getFullYear();
            changeMonth = ('0' + (1 + nowDate.getMonth())).slice(-2);
            changeDate = ('0' + nowDate.getDate()).slice(-2);
        }
        dispatch(changeCalendar({
            viewYear: changeYear,
            viewMonth: changeMonth,
            viewDate: changeDate,
        }));
        dispatch(changeField({key: 'startDay', value: `${changeYear}.${changeMonth}.${changeDate}`}));
        dispatch(changeField({key: 'endDay', value: `${changeYear}.${changeMonth}.${changeDate}`}));
        dispatch(changeSubField({form: 'startDate', key: 'year', value: changeYear}));
        dispatch(changeSubField({form: 'startDate', key: 'month', value: changeMonth}));
        dispatch(changeSubField({form: 'startDate', key: 'date', value: changeDate}));
        dispatch(changeSubField({form: 'endDate', key: 'year', value: changeYear}));
        dispatch(changeSubField({form: 'endDate', key: 'month', value: changeMonth}));
        dispatch(changeSubField({form: 'endDate', key: 'date', value: changeDate}));
        
    },[dispatch, viewMonth, viewYear]);


    const onModalClick = () => {
        dispatch(changeModal({modalFlag:true, type:'wrtie'}));
    };

    const onBackClick = () => {
        dispatch(tableout());
    };

    useEffect(() => {
        if(!user){
            navigate('/');
            return;
        }
        if(!tableCalendar){
            navigate('/table');
            return;
        }
    },[navigate, tableCalendar, user]);

    return (
        <CalendarHeader 
            user={user} 
            viewYear={viewYear} 
            viewMonth={viewMonth} 
            tableCalendar={tableCalendar} 
            onClick={onClick} 
            onModalClick={onModalClick} 
            onBackClick={onBackClick}
        />
    )
};

export default CalendarHeaderContainer;