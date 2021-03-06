import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from './modules';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import createSagaMiddleware from "redux-saga";
import { rootSaga } from './modules/index';
import { tempSetUser, check } from './modules/user';
import { HelmetProvider } from 'react-helmet-async';
import 'bootstrap/dist/css/bootstrap.min.css';
import { tempSetTable } from './modules/tables';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer, 
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

function loadUser() {
  try{
    const user = localStorage.getItem('user'); //로컬 스토리지에서 user 조회
    if(!user) return; // 로그인 상태가 아니라면 아무것도 안 함

    store.dispatch(tempSetUser(JSON.parse(user)));
    store.dispatch(check());
  }catch(e){
    console.log('index localStorage is not working');
  }
}

function loadTable() {
  try{
    const table = localStorage.getItem('tableCalendar'); //로컬 스토리지에서 user 조회
    if(!table) return; // 캘린더 게시판 비밀번호 성공 상태가 아니면 안 함.

    store.dispatch(tempSetTable(JSON.parse(table)));
  }catch(e){
    console.log('index localStorage is not working');
  }
}

sagaMiddleware.run(rootSaga);
loadUser();
loadTable();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </BrowserRouter>
  </Provider>
);