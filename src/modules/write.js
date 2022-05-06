import { createAction, handleActions } from "redux-actions";
import createRequestSaga, { createRequestActionTypes } from "../lib/createRequestSaga";
import * as calendarAPI from "../lib/api/calendar";
import { takeLatest } from "redux-saga/effects";
import produce from "immer";

const INITIALIZE = 'write/INITIALIZE'; // 모든 내용 초기화
const CHANGE_FIELD = 'write/CHANGE_FIELD'; // 특정 key 값 바꾸기
const CHANGE_SUBFIELD = 'write/CHANGE_SUBFIELD'; // 특정 key 값 바꾸기
//글 등록 상태
const [WRITE_CALENDAR, WRITE_CALENDAR_SUCCESS, WRITE_CALENDAR_FAILURE] = createRequestActionTypes('write/WRITE_CALENDAR'); //글 작성
//수정
const [UPDATE_CALENDAR, UPDATE_CALENDAR_SUCCESS, UPDATE_CALENDAR_FAILURE] = createRequestActionTypes('write/UPDATE_CALENDAR');
//수정 화면용
const [EDIT_CALENDAR, EDIT_CALENDAR_SUCCESS, EDIT_CALENDAR_FAILURE] = createRequestActionTypes('write/EDIT_CALDENDAR');

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value}) => ({
    key,
    value
}));
export const changeSubField = createAction(
    CHANGE_SUBFIELD,
    ({ form, key, value }) => ({
        form, // startDate, endDate
        key, // year, month, min, hour, min
        value, // 실제 바꾸려는 값
}));

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

const nowDate = new Date();

const initialState = {
    id: '',
    title: '',
    body: '',
    startDay: `${nowDate.getFullYear()}.${("0" + (1 + nowDate.getMonth())).slice(-2)}.${("0" + nowDate.getDate()).slice(-2)}`,
    startDate: {
        year:  ''+nowDate.getFullYear(),
        month: ("0" + (1 + nowDate.getMonth())).slice(-2),
        date: ("0" + nowDate.getDate()).slice(-2),
        hour: ''+new Date().getHours(),
        min: ''+new Date().getMinutes(),
    },
    endDay: `${nowDate.getFullYear()}.${("0" + (1 + nowDate.getMonth())).slice(-2)}.${("0" + nowDate.getDate()).slice(-2)}`,
    endDate: {
        year: ''+nowDate.getFullYear(),
        month: ("0" + (1 + nowDate.getMonth())).slice(-2),
        date: ("0" + nowDate.getDate()).slice(-2),
        hour: ''+(new Date().getHours()+1),
        min: ''+new Date().getMinutes(),
    },
    label: {
        style: '',
        text: '',
    },
    calendar: null,
    calendarError: null,
    calendarId: null,
};

const write = handleActions(
    {
        [INITIALIZE] : state => initialState, // initialState를 넣으면 초기 상태로 바뀜
        [CHANGE_FIELD] : (state, { payload: {key, value } }) => ({
            ...state,
            [key] : value, //특정 key 값을 업데이트
        }),
        [CHANGE_SUBFIELD] : (state, { payload: {form, key, value} }) => 
        produce(state, draft => {
             draft[form][key] = value; // 예: state.startDate.year를 바꾼다.
        }),
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
            title: calendar.title,
            body: calendar.body,
            startDay: calendar.startDay,
            startDate: calendar.startDate,
            endDay: calendar.endDay,
            endDate: calendar.endDate,
            label: calendar.label,
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