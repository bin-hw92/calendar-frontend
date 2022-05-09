import { useEffect } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import WriteView from "../../components/write/WriteView";
import { changeModal, listCalendar,changeField, changeSubField } from "../../modules/calendar";
import { changeInput, initialize, updateCalendar, writeCalendar } from "../../modules/write";


const dateChangeFormat = ({date}) => {
    const nDate = new Date(date);
    const nYear = nDate.getFullYear();
    const nMonth = ("0" + (1 + nDate.getMonth())).slice(-2);
    const nDay = ("0" + nDate.getDate()).slice(-2);

    return `${nYear}.${nMonth}.${nDay}`;
}

const checkDate = ({startDate, endDate}) => {
    if(parseInt(startDate.year)  > parseInt(endDate.year)) return false;
    if(parseInt(startDate.month) > parseInt(endDate.month)) return false;
    if(parseInt(startDate.date) > parseInt(endDate.date)) return false;
    if(parseInt(startDate.hour) > parseInt(endDate.hour)) return false;
    if(parseInt(startDate.min) > parseInt(endDate.min)) return false;

    return true;
}

const WriteViewContainer = () => {
    const dispatch = useDispatch();
    const { form, title, body, startDay, startDate, endDay, endDate, calendar, calendarError, calendarId} = useSelector(({ calendar, write }) => ({
        form: calendar.form,
        title: write.title,
        body: write.body,
        startDay: calendar.write.startDay,
        startDate: calendar.write.startDate,
        endDay: calendar.write.endDay,
        endDate: calendar.write.endDate,
        calendar: write.calendar,
        calendarError: write.calendarError,
        calendarId: write.calendarId,
    }));
    const hoursArray = [];
    const minArray = [];
    for(let i=0; i < 61; i++){
        minArray.push(i);
        if(i < 24){
            hoursArray.push(i);
        }
    }

    //시,분 selected BOx 핸들러
    const onChange = useCallback((e) => {
        const { value, name, id } = e.target;
        if(id === 'start-hours'){
            dispatch(changeSubField({
                    form: 'startDate',
                    key: name,
                    value
            }));
        }
        if(id === 'start-min'){
            dispatch(changeSubField({
                    form: 'startDate',
                    key: name,
                    value
            }));
        }
        if(id === 'end-hours'){
            dispatch(changeSubField({
                    form: 'endDate',
                    key: name,
                    value
            }));
        }
        if(id === 'end-min'){
            dispatch(changeSubField({
                    form: 'endDate',
                    key: name,
                    value
            }));
        }
    },[dispatch]);

    //DatePicker 변경용 핸들러
    const onDateChange = useCallback((date, type) => {
        const nextDate = dateChangeFormat({date});
        if(type === "START"){
            dispatch(changeField({key: 'startDay', value: nextDate,}));
            dispatch(changeSubField({form: 'startDate', key: 'year', value: nextDate.split('.')[0],}));
            dispatch(changeSubField({form: 'startDate', key: 'month', value: nextDate.split('.')[1],}));
            dispatch(changeSubField({form: 'startDate', key: 'date', value: nextDate.split('.')[2],}));
        }
        if(type === "END"){
            dispatch(changeField({key: 'endDay',value: nextDate,}));
            dispatch(changeSubField({ form: 'endDate', key: 'year',value: nextDate.split('.')[0],}));
            dispatch(changeSubField({form: 'endDate', key: 'month', value: nextDate.split('.')[1],}));
            dispatch(changeSubField({form: 'endDate', key: 'date', value: nextDate.split('.')[2],}));
        }
    },[dispatch]);

    //INPUT과 TEXTAREA 핸들러
    const onInputChange = e => {
        const { value, name } = e.target;
        dispatch(
            changeInput({
                key: name,
                value
            })
        );
    };

    //등록 핸들러
    const onSubmit = useCallback(e => {
        e.preventDefault();
        const label = {
            style: "#f2f2f2",
            text: "중요한 일",
        }
        if(!checkDate({startDate, endDate})){
            alert('시작일이 종료일보다 큽니다...');
            return;
        }
        if(!calendarId){ //수정
            dispatch(writeCalendar({title, body, startDay, startDate, endDay, endDate, label}));
        }else{//등록
            dispatch(updateCalendar({calendarId, title, body, startDay, startDate, endDay, endDate, label}));
        }
    },[body, calendarId, dispatch, endDate, endDay, startDate, startDay, title]);

    const write = {
        title,
        body,
        startDay,
        startDate,
        endDay,
        endDate,
        hoursArray: hoursArray,
        minArray: minArray,
    }

    useEffect(() => {
        return () => {
            dispatch(initialize());
        };
    },[dispatch]);
    
    // 성공 혹은 실패 시 할 작업
    useEffect(() => {
        if(!calendarId){
            //추가
            if(calendar){
                const {viewYear, viewMonth} = form;
                dispatch(listCalendar({viewYear, viewMonth}));
                dispatch(changeModal(false));
            }
            if(calendarError){
                console.log(calendarError);
            } 
        }else{
            //수정
            if(calendar){
                const {viewYear, viewMonth} = form;
                dispatch(listCalendar({viewYear, viewMonth}));
                dispatch(changeModal({modalFlag:true, type:'view'}));//이전 팝업으로 백
            }
            if(calendarError){
                console.log(calendarError);
            }
        }
    },[calendar, calendarError, calendarId, dispatch, form]);

    return (
       <WriteView onChange={onChange} write={write} onDateChange={onDateChange} onSubmit={onSubmit} onInputChange={onInputChange} calendarId={calendarId}/>
    )
};

export default WriteViewContainer;