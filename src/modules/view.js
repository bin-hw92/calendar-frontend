import { createAction, handleActions } from "redux-actions";
import createRequestSaga, { createRequestActionTypes } from "../lib/createRequestSaga";
import * as calendarApi from "../lib/api/calendar";
import { takeLatest } from "redux-saga/effects";

const [READ_CALDENDAR, READ_CALDENDAR_SUCCESS, READ_CALDENDAR_FAILURE] = createRequestActionTypes('calendar/READ_CALDENDAR'); 
const UNLOAD_CALDENDAR = 'calendar/UNLOAD_CALDENDAR'; // 게시판 페이지에서 벗어날 때 데이터 비우기


export const readCalendar = createAction(READ_CALDENDAR, checkDate => checkDate);
export const unloadCalendar = createAction(UNLOAD_CALDENDAR);

const readCalendarSaga = createRequestSaga(READ_CALDENDAR, calendarApi.readCalendar);

export function* calendarReadSaga() {
    yield takeLatest(READ_CALDENDAR, readCalendarSaga);
}

const initialState = {
    calendar: [], //해당 일 할 일 목록
    error: null,
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
    },
    initialState,
 );
 
 export default calendar;


 