import { createAction, handleActions } from "redux-actions";
import createRequestSaga, { createRequestActionTypes } from "../lib/createRequestSaga";
import * as calendarAPI from "../lib/api/calendar";
import { takeLatest } from "redux-saga/effects";

const [READ_CALENDAR, READ_CALENDAR_SUCCESS, READ_CALENDAR_FAILURE] = createRequestActionTypes('view/READ_CALENDAR'); 
const UNLOAD_CALENDAR = 'view/UNLOAD_CALENDAR'; // 게시판 페이지에서 벗어날 때 데이터 비우기
const [DELETE_CALENDAR, DELETE_CALENDAR_SUCCESS, DELETE_CALENDAR_FAILURE] = createRequestActionTypes('view/DELETE_CALENDAR'); 

export const readCalendar = createAction(READ_CALENDAR, checkDate => checkDate);
export const unloadCalendar = createAction(UNLOAD_CALENDAR);

export const deleteCalendar = createAction(DELETE_CALENDAR, ({id, checkDate}) => ({id, checkDate}));

const readCalendarSaga = createRequestSaga(READ_CALENDAR, calendarAPI.readCalendar);
const deleteCalendarSaga = createRequestSaga(READ_CALENDAR, calendarAPI.deleteCalendar);

export function* calendarReadSaga() {
    yield takeLatest(READ_CALENDAR, readCalendarSaga);
    yield takeLatest(DELETE_CALENDAR, deleteCalendarSaga);
}

const initialState = {
    calendar: null, //해당 일 할 일 목록
    error: null,
    deleteFlag: false,
};

const calendar = handleActions(
    {
        [READ_CALENDAR_SUCCESS] : (state, { payload: calendar }) => ({
            ...state,
            calendar
        }),
        [READ_CALENDAR_FAILURE] : (state, { payload: error }) => ({
            ...state,
            error
        }),
        [UNLOAD_CALENDAR] : () => initialState,
        [DELETE_CALENDAR_SUCCESS] : (state) => ({
            ...state,
            deleteFlag: true,
        }),
        [DELETE_CALENDAR_FAILURE] : (state, { payload: error }) => ({
            ...state,
            error
        }),
    },
    initialState,
 );
 
 export default calendar;


 