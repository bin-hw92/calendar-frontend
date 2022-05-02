import client from "./client";

//글쓰기
export const writeCalendar = ({title, body, startDay, startDate, endDay, endDate, label }) => {
    return client.post('/api/calendar', {title, body, startDay, startDate, endDay, endDate, label});
}
//수정
export const updatePost = ({ id, title, body, tags }) => {
    return client.patch(`/api/posts/${id}`, {
        title,
        body,
        tags
    });
}

//월별 할 일 목록
export const listCalendar = ({viewYear, viewMonth}) => {
    return client.get(`/api/calendar/?year=${viewYear}&month=${viewMonth}`);
}

//해당 일 목록
export const readCalendar = checkDate => client.get(`/api/calendar/${checkDate}`);