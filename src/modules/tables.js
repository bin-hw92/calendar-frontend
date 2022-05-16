import { createAction, handleActions } from "redux-actions";
import createRequestSaga, { createRequestActionTypes } from "../lib/createRequestSaga";
import * as tableAPI from "../lib/api/tables";
import { call, takeLatest } from "redux-saga/effects";
import produce from "immer";

const CHANGE_FINELD = 'table/CHANGE_FIELD';
const INITIALIZE = 'table/INITIALIZE'; // 모든 내용 초기화
const TEMP_SET_TABLE = 'table/TEMP_SET_TABLE'; // 새로고침 이후 임시 캘린더 입장처리
const TABLE_OUT = 'table/TABLE_OUT'; //캘린더 나가기

//글 등록 상태
const [WRITE_TABLE, WRITE_TABLE_SUCCESS, WRITE_TABLE_FAILURE] = createRequestActionTypes('table/WRITE_TABLE'); //글 작성
const [LIST_TABLE, LIST_TABLE_SUCCESS, LIST_TABLE_FAILURE] = createRequestActionTypes('table/LIST_TABLE'); //글 목록
//비밀번호 확인
const [CHECK_TABLE, CHECK_TABLE_SUCCESS, CHECK_TABLE_FAILURE] = createRequestActionTypes('table/CHECK_TABLE');

export const tempSetTable = createAction(TEMP_SET_TABLE, tableCalendar => tableCalendar);
export const initialize = createAction(INITIALIZE);

export const tableout = createAction(TABLE_OUT);

export const checkTable = createAction(CHECK_TABLE, 
    ({id, password}) => ({
        id,
        password, 
    }),
); 

export const changeField = createAction(
    CHANGE_FINELD,
    ({ form, key, value }) => ({
        form, // register, login
        key, // username, password, passwordConfirm
        value, // 실제 바꾸려는 값
    }),
);
export const writeTable = createAction(WRITE_TABLE, ({ title, password, body, users}) => ({
    title,
    password,
    body,
    users,
}));
export const listTable = createAction(LIST_TABLE, ({ page }) => ({
    page
}));

//사가 생성
const writeTableSaga = createRequestSaga(WRITE_TABLE, tableAPI.writeTable);
const listTableSage = createRequestSaga(LIST_TABLE, tableAPI.listTable);
const checkSaga = createRequestSaga(CHECK_TABLE, tableAPI.check);

//캘린더 나가기 할 경우
function* tableoutSaga() {
    try {
        yield call(tableAPI.tableout); // logout API 호출
        localStorage.removeItem('tableCalendar'); // localStorage에서 user를 제거
    } catch (e) {
        console.log(e);
    }
}
//비밀번호 실패시
function checkFailureSaga() {
    try{
        localStorage.removeItem('tableCalendar'); // localStorage에서 user를 제거
    }catch(e){
        console.log('localStorage is not working');
    }
}

export function* tablesSaga() {
    yield takeLatest(WRITE_TABLE, writeTableSaga);
    yield takeLatest(LIST_TABLE, listTableSage);
    yield takeLatest(CHECK_TABLE, checkSaga);
    yield takeLatest(CHECK_TABLE_FAILURE, checkFailureSaga);
    yield takeLatest(TABLE_OUT, tableoutSaga);
}

const initialState = {
    table: {
        title: '',
        body: '',
        password: '',
        users: [],
    }, //수정 화면 시
    tableList: null,
    lastPage: 1,
    tableFlag: false,
    tableError: null,
    tableCalendar: null, //비밀번호 체크
    checkError: null,
};

const tables = handleActions(
    {
        [TEMP_SET_TABLE] : (state, { payload: tableCalendar }) => ({
            ...state,
            tableCalendar,
        }),
        [INITIALIZE] : state => initialState, // initialState를 넣으면 초기 상태로 바뀜
        [CHANGE_FINELD] : (state, { payload: {form, key, value} }) => 
        produce(state, draft => {
             draft[form][key] = value; // 예: state.table.title를 바꾼다.
        }),
        //글쓰기 작성 성공
        [WRITE_TABLE_SUCCESS] : (state) => ({
            ...state,
            tableFlag: true,
        }),
        [WRITE_TABLE_FAILURE] : (state, { payload: tableError }) => ({
            ...state,
            tableError
        }),
        //목록 성공
        [LIST_TABLE_SUCCESS] : (state, { payload: tableList, meta: response }) => ({
            ...state,
            tableList,
            lastPage: parseInt(response.headers['last-page'], 10), //문자열을 숫자열로 변환
        }),
        [LIST_TABLE_FAILURE] : (state, { payload: tableError }) => ({
            ...state,
            tableError
        }),
        [CHECK_TABLE_SUCCESS] : (state, { payload: tableCalendar }) => ({
            ...state,
            tableCalendar,
            checkError: null
        }),
        [CHECK_TABLE_FAILURE] : (state, { payload: error }) => ({
            ...state,
            tableEheck: null,
            checkError: error,
        }),
        [TABLE_OUT] : state => ({
            ...state,
            tableCalendar: null
        }),
    },
    initialState,
);

export default tables;