import Button from "../common/Button";
import '../../css/Calendar.css';
import React from "react";
import { useMemo } from "react";

const getCalendarName = (viewYear, viewMonth) => {
    const name = `${viewYear}년 ${viewMonth}월`;
    return name;
}

const CalendarHeader = ({user, viewYear, viewMonth, onClick, onModalClick}) => {

    const name = useMemo(() => getCalendarName(viewYear, viewMonth),[viewMonth, viewYear]);

  return (
    <div className="calendar-header">
      <button className="left-arrow" onClick={() => onClick(-1)}></button>
        <div>{name}</div>
      <button className="right-arrow" onClick={() => onClick(1)}></button>
      {user &&(
      <div className="todo-add-wrap">
        <Button onClick={onModalClick}>일정 추가</Button>
      </div>)}
    </div>
  );
};

export default CalendarHeader;
