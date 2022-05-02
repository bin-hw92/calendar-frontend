
import { combineReducers } from "redux";
import loading from "./loading";
import { all } from "redux-saga/effects";
import auth, { authSaga } from "./auth";
import user, { userSaga} from "./user";
import calendar, { calendarListSaga } from "./calendar";
import write, { writeSaga } from "./write";
import view, { calendarReadSaga } from "./view";

const rootReducer = combineReducers({
    auth,
    loading,
    user,
    calendar,
    write,
    view,
});

export function* rootSaga() {
    yield all([authSaga(), userSaga(), writeSaga(), calendarListSaga(), calendarReadSaga()]);
}

export default rootReducer;