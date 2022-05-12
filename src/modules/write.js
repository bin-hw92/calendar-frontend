import { createAction, handleActions } from "redux-actions";
import createRequestSaga, { createRequestActionTypes } from "../lib/createRequestSaga";
import * as calendarAPI from "../lib/api/calendar";
import { takeLatest } from "redux-saga/effects";

const INITIALIZE = 'write/INITIALIZE'; // 모든 내용 초기화

//글 등록 상태
const [WRITE_CALENDAR, WRITE_CALENDAR_SUCCESS, WRITE_CALENDAR_FAILURE] = createRequestActionTypes('write/WRITE_CALENDAR'); //글 작성
//수정
const [UPDATE_CALENDAR, UPDATE_CALENDAR_SUCCESS, UPDATE_CALENDAR_FAILURE] = createRequestActionTypes('write/UPDATE_CALENDAR');
//수정 화면용
const [EDIT_CALENDAR, EDIT_CALENDAR_SUCCESS, EDIT_CALENDAR_FAILURE] = createRequestActionTypes('write/EDIT_CALENDAR');

export const initialize = createAction(INITIALIZE);

export const writeCalendar = createAction(WRITE_CALENDAR, ({ title, body, startDay, startDate, endDay, endDate, label}) => ({
    title,
    body,
    startDay,
    startDate,
    endDay,
    endDate,
    label,
}));

export const updateCalendar = createAction(UPDATE_CALENDAR, ({ calendarId, title, body, startDay, startDate, endDay, endDate, label}) => ({
    id:calendarId,
    title,
    body,
    startDay,
    startDate,
    endDay,
    endDate,
    label,
}));

export const editCalendar = createAction(EDIT_CALENDAR, id => id);

//사가 생성
const writeCalendarSaga = createRequestSaga(WRITE_CALENDAR, calendarAPI.writeCalendar);
const updateCalendarSaga = createRequestSaga(UPDATE_CALENDAR, calendarAPI.updateCalendar);
const editCalendarSaga = createRequestSaga(EDIT_CALENDAR, calendarAPI.editCalendar);

export function* writeSaga() {
    yield takeLatest(WRITE_CALENDAR, writeCalendarSaga);
    yield takeLatest(UPDATE_CALENDAR, updateCalendarSaga);
    yield takeLatest(EDIT_CALENDAR, editCalendarSaga);
}

const initialState = {
    setcalendar: null, //수정 화면 시
    calendar: null, //업데이트 완료 시
    calendarError: null,
    calendarId: null,
};

const write = handleActions(
    {
        [INITIALIZE] : state => initialState, // initialState를 넣으면 초기 상태로 바뀜
        //글쓰기 상태
        [WRITE_CALENDAR] : state => ({
            ...state,
            //post와 postError를 초기화
            calendar: null,
            calendarError: null
        }),
        //글쓰기 작성 성공
        [WRITE_CALENDAR_SUCCESS] : (state, { payload: calendar }) => ({
            ...state,
            calendar
        }),
        [WRITE_CALENDAR_FAILURE] : (state, { payload: calendarError }) => ({
            ...state,
            calendarError
        }),
        //수정 화면 성공
        [EDIT_CALENDAR_SUCCESS] : (state, { payload: calendar }) => ({
            ...state,
            setcalendar: calendar,
            calendarId: calendar._id,
        }),
        [EDIT_CALENDAR_FAILURE] : (state, { payload: calendarError }) => ({
            ...state,
            calendarError
        }),
        [UPDATE_CALENDAR_SUCCESS] : (state, { payload: calendar }) => ({
            ...state,
            calendar,
        }),
        [UPDATE_CALENDAR_FAILURE] : (state, { payload: calendarError}) => ({
            ...state,
            calendarError
        }),
    },
    initialState,
);

export default write;