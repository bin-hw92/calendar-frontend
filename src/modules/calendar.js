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
const CHANGE_MONTHCALENDAR = 'calendar/CHANGE_MONTHCALENDAR'; // 달력 시작과 끝

const [LIST_CALENDAR, LIST_CALENDAR_SUCCESS, LIST_CALENDAR_FAILURE ] = createRequestActionTypes('calendar/LIST_CALENDAR');
const [LIST_HOLIDAY, LIST_HOLIDAY_SUCCESS, LIST_HOLIDAY_FAILURE ] = createRequestActionTypes('calendar/LIST_HOLIDAY');

export const initialize = createAction(INITIALIZE);
export const changeCalendar = createAction(
    CHANGE_CALENDAR,
    ({ viewYear, viewMonth, viewDate }) => ({
        viewYear,
        viewMonth,
        viewDate
    }),
);
export const changeCalendarMonth = createAction(
    CHANGE_MONTHCALENDAR,
    ({ startMonth, endMonth }) => ({
        startMonth,
        endMonth
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
export const listCalendar = createAction(LIST_CALENDAR, ({ startMonth, endMonth }) => ({
    startMonth,
    endMonth,
}));

//이거 액션 실행되고, 사가를 통해서 api 호출 진행
export const listHoliday = createAction(LIST_HOLIDAY, ({ viewYear }) => ({
    viewYear
}));

const listCalendarSage = createRequestSaga(LIST_CALENDAR, calendarApi.listCalendar);
const listHolidaySage = createRequestSaga(LIST_HOLIDAY, calendarApi.listHoliday);

export function* calendarListSaga() {
    yield takeLatest(LIST_CALENDAR, listCalendarSage);
    yield takeLatest(LIST_HOLIDAY, listHolidaySage);
}

const nowDate = new Date();
const initialState = {
    startMonth: '',
    endMonth: '',
    form: {
        viewYear: ''+nowDate.getFullYear(),
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
    calendarList: null,
    holidayList: null,
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
       [CHANGE_MONTHCALENDAR] : (state, { payload: {startMonth, endMonth} }) => ({
            ...state,
            startMonth,
            endMonth
        }),
       [CHANGE_MODAL] : (state, { payload: {modalFlag, type} }) => ({
            ...state,
            modalFlag,
            type
        }),
        [CHANGE_FIELD] : (state, { payload: {key, value} }) => 
        produce(state, draft => {
                draft['write'][key] = value;
        }),
        [CHANGE_SUBFIELD] : (state, { payload: {form, key, value} }) => 
        produce(state, draft => {
             draft['write'][form][key] = value;
        }),
        [LIST_CALENDAR_SUCCESS] : (state, { payload: calendarList }) => ({
            ...state,
            calendarList,
        }),
        [LIST_CALENDAR_FAILURE] : (state, { payload: error }) => ({
            ...state,
            error
        }),
        [LIST_HOLIDAY_SUCCESS] : (state, { payload: holidayList }) => ({
            ...state,
            holidayList,
        }),
        [LIST_HOLIDAY_FAILURE] : (state, { payload: error }) => ({
            ...state,
            error
        }),
    },
    initialState,
 );
 
 export default calendar;


 