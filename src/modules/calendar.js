import { createAction, handleActions } from "redux-actions";
import createRequestSaga, { createRequestActionTypes } from "../lib/createRequestSaga";
import * as calendarApi from "../lib/api/calendar";
import { takeLatest } from "redux-saga/effects";

const CHANGE_CALENDAR = 'calendar/CHANGE_CALENDAR';
const CHANGE_MODAL = 'calendar/CHANGE_MODAL'; //할 일 추가 팝업
const INITIALIZE = 'calendar/INITIALIZE';

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


 