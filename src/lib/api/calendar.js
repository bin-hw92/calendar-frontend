import client from "./client";

//글쓰기
export const writeCalendar = ({title, body, startDay, startDate, endDay, endDate, label }) => {
    return client.post('/api/calendar', {title, body, startDay, startDate, endDay, endDate, label});
}
//수정
export const updateCalendar = ({ id, title, body, startDay, startDate, endDay, endDate, label  }) => {
    return client.patch(`/api/calendar/${id}`, {title, body, startDay, startDate, endDay, endDate, label});
}

//월별 할 일 목록
export const listCalendar = ({viewYear, viewMonth}) => {
    return client.get(`/api/calendar/?year=${viewYear}&month=${viewMonth}`);
}

//해당 날짜 목록
export const readCalendar = checkDate => client.get(`/api/calendar/view/${checkDate}`);

//해당 할 일 삭제
export const deleteCalendar = ({id}) => {
    client.delete(`/api/calendar/${id}`);
}

//수정화면
export const editCalendar = ({ id }) => {
    console.log(id);
    return client.get(`/api/calendar/${id}`);
}