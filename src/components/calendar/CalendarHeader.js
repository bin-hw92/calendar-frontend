import Button from "../common/Button";
import '../../css/Calendar.css';
import React from "react";
import { useMemo } from "react";

const getCalendarName = (viewYear, viewMonth) => {
    const name = `${viewYear}년 ${viewMonth}월`;
    return name;
}

const CalendarHeader = ({user, viewYear, viewMonth, tableCalendar, onClick, onModalClick, onBackClick}) => {

    const name = useMemo(() => getCalendarName(viewYear, viewMonth),[viewMonth, viewYear]);

  return (
    <>
    <div className="calendar-top-header">
      <div className="calendar-top-title">{tableCalendar && tableCalendar.title}</div>
      <div className="calendar-top-close">
        <button className="back-button" onClick={onBackClick}/>
      </div>
    </div>
    <div className="calendar-header">
      <button className="left-arrow" onClick={() => onClick(-1)} />
        <div>{name}</div>
      <button className="right-arrow" onClick={() => onClick(1)} />
      <button className="today-button" onClick={() => onClick(0)}>오늘</button>
      {user &&(
      <div className="todo-add-wrap">
        <Button onClick={onModalClick}>일정 추가</Button>
      </div>)}
    </div>
    </>
  );
};

export default CalendarHeader;
