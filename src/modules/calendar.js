import { createAction, handleActions } from "redux-actions";
import createRequestSaga, { createRequestActionTypes } from "../lib/createRequestSaga";
import * as calendarApi from "../lib/api/calendar";
import { takeLatest } from "redux-saga/effects";
import produce from "immer";

const CHANGE_CALENDAR = 'calendar/CHANGE_CALENDAR';
const CHANGE_MODAL = 'calendar/CHANGE_MODAL'; //할 일 추가 팝업
const INITIALIZE = 'calendar/INITIALIZE';
const CHANGE_FIELD = 'write/CHANGE_FIELD'; // 특정 key 값 바꾸기
const CHANGE_SUBFIELD = 'write/CHANGE_SUBFIELD'; // 특정 key 값 바꾸기

const [LIST_CALDENDAR, LIST_CALDENDAR_SUCCESS, LIST_CALDENDAR_FAILURE ] = createRequestActionTypes('calendar/LIST_CALDENDAR');

export const initialize = createAction(INITIALIZE);
export const changeCalendar = createAction(
    CHANGE_CALENDAR,
    ({ viewYear, viewMonth, viewDate }) => ({
        viewYear,
        viewMonth,
        viewDate
    }),
);
export const changeModal = createAction(CHANGE_MODAL, 
    ({modalFlag, type}) => ({
        modalFlag,
        type,
    }),
);
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

//이거 액션 실행되고, 사가를 통해서 api 호출 진행
export const listCalendar = createAction(LIST_CALDENDAR, ({ viewYear, viewMonth }) => ({
    viewYear,
    viewMonth,
}));

const listCalendarSage = createRequestSaga(LIST_CALDENDAR, calendarApi.listCalendar);

export function* calendarListSaga() {
    yield takeLatest(LIST_CALDENDAR, listCalendarSage);
}

const nowDate = new Date();
const initialState = {
    form: {
        viewYear: nowDate.getFullYear(),
        viewMonth: ("0" + (1 + nowDate.getMonth())).slice(-2),
        viewDate: ("0" + nowDate.getDate()).slice(-2),
    },
    write: {
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
    },
    calendarList: [],
    error: null,
    modalFlag: false,
    type: null,
};

const calendar = handleActions(
    {
        [INITIALIZE] : state => initialState, // initialState를 넣으면 초기 상태로 바뀜
        [CHANGE_CALENDAR] : (state, { payload: calendar }) => ({
            ...state,
            form: calendar
       }),
       [CHANGE_MODAL] : (state, { payload: {modalFlag, type} }) => ({
            ...state,
            modalFlag,
            type
        }),
        [CHANGE_FIELD] : (state, { payload: {form, key, value} }) => 
        produce(state, draft => {
                draft['write'][key] = value; // 예: state.startDate.year를 바꾼다.
        }),
        [CHANGE_SUBFIELD] : (state, { payload: {form, key, value} }) => 
        produce(state, draft => {
             draft['write'][form][key] = value; // 예: state.startDate.year를 바꾼다.
        }),
        [LIST_CALDENDAR_SUCCESS] : (state, { payload: calendarList }) => ({
            ...state,
            calendarList,
        }),
        [LIST_CALDENDAR_FAILURE] : (state, { payload: error }) => ({
            ...state,
            error
        }),
    },
    initialState,
 );
 
 export default calendar;


 