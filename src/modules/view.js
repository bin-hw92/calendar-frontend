import { createAction, handleActions } from "redux-actions";
import createRequestSaga, { createRequestActionTypes } from "../lib/createRequestSaga";
import * as calendarAPI from "../lib/api/calendar";
import { takeLatest } from "redux-saga/effects";

const [READ_CALDENDAR, READ_CALDENDAR_SUCCESS, READ_CALDENDAR_FAILURE] = createRequestActionTypes('view/READ_CALDENDAR'); 
const UNLOAD_CALDENDAR = 'view/UNLOAD_CALDENDAR'; // 게시판 페이지에서 벗어날 때 데이터 비우기
const [DELETE_CALDENDAR, DELETE_CALDENDAR_SUCCESS, DELETE_CALDENDAR_FAILURE] = createRequestActionTypes('view/DELETE_CALDENDAR'); 

export const readCalendar = createAction(READ_CALDENDAR, checkDate => checkDate);
export const unloadCalendar = createAction(UNLOAD_CALDENDAR);

export const deleteCalendar = createAction(DELETE_CALDENDAR, ({id, checkDate}) => ({id, checkDate}));

const readCalendarSaga = createRequestSaga(READ_CALDENDAR, calendarAPI.readCalendar);
const deleteCalendarSaga = createRequestSaga(READ_CALDENDAR, calendarAPI.deleteCalendar);

export function* calendarReadSaga() {
    yield takeLatest(READ_CALDENDAR, readCalendarSaga);
    yield takeLatest(DELETE_CALDENDAR, deleteCalendarSaga);
}

const initialState = {
    calendar: [], //해당 일 할 일 목록
    error: null,
    deleteFlag: false,
};

const calendar = handleActions(
    {
        [READ_CALDENDAR_SUCCESS] : (state, { payload: calendar }) => ({
            ...state,
            calendar
        }),
        [READ_CALDENDAR_FAILURE] : (state, { payload: error }) => ({
            ...state,
            error
        }),
        [UNLOAD_CALDENDAR] : () => initialState,
        [DELETE_CALDENDAR_SUCCESS] : (state) => ({
            ...state,
            deleteFlag: true,
        }),
        [DELETE_CALDENDAR_FAILURE] : (state, { payload: error }) => ({
            ...state,
            error
        }),
    },
    initialState,
 );
 
 export default calendar;


 