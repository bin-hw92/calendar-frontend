import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CalendarView from "../../components/calendar/CalendarView";
import { readCalendar } from "../../modules/view";


const CalendarViewContainer = () => {
    const dispatch = useDispatch();
    const { form, calendars } = useSelector(({ calendar, view }) => ({
        form: calendar.form,
        calendars: view.calendar,
    }));

    const {viewYear, viewMonth, viewDate} = form;

    useEffect(() => {
        dispatch(readCalendar(`${viewYear}.${viewMonth}.${viewDate}`));
    },[dispatch, viewDate, viewMonth, viewYear]);

    return (
        <CalendarView calendars={calendars} />
    )
}

export default CalendarViewContainer;