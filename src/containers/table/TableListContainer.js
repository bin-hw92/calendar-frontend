import { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import TableList from "../../components/table/TableList";
import { checkTable, deleteTable, listTable } from "../../modules/tables";


const TableListContainer = () => {
    const dispatch = useDispatch();
    const [tableId, setTableId] = useState('');
    const [error, setError] = useState(['','']);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const { tableList, tableError, tableCalendar, checkError, loading, user, tableFlag } = useSelector(({tables, user, loading}) => ({
        tableList: tables.tableList,
        tableError: tables.tableError,
        loading: loading['table/LIST_TABLE'],
        tableCalendar: tables.tableCalendar,
        checkError: tables.checkError,
        user: user.user,
        tableFlag: tables.tableFlag,
    }));

    useEffect(() => {
        // page가 없으면 1을 기본값으로 사용
        const page = parseInt(searchParams.get('page'), 10) || 1;
        dispatch(listTable({page}));
    },[dispatch, searchParams]);
    
    useEffect(() => {
        // 게시판 삭제 시 새로운 목록을 불러오기 위한 용
       if(tableFlag){ 
           const page = parseInt(searchParams.get('page'), 10) || 1;
            dispatch(listTable({page}));
        }
    },[tableFlag]);

    //비밀번호 입력 입장
    const onClick = useCallback(id => {
        const eValue = document.querySelector(`#password_${id}`).value;
        setTableId(id);
        if(eValue.trim() === '') return setError([id, '비밀번호를 입력하세요.']);
        
        dispatch(checkTable({id, password: eValue}));
    },[dispatch]);

    //비밀번호 입력
    const onKeyUp = useCallback(e => {
        const id = e.target.id.split('_')[1];
        if(e.key === 'Enter'){
            setTableId(id);
            if(e.target.value.trim() === '') return setError([id, '비밀번호를 입력하세요.']);
            dispatch(checkTable({id, password: e.target.value.trim()}));
        }
    },[dispatch]);

    //게시판 삭제
    const onDelClick = useCallback(id => {
        if (window.confirm("정말 삭제합니까?")) {
            dispatch(deleteTable({id}));
          }
    },[dispatch]);

    useEffect(() => {
        if(checkError){
            setError([tableId, checkError.response.status === 401? '비밀번호가 틀렸습니다.' : '시스템 에러 발생']);
        }
    },[checkError]);

    useEffect(() => {
        if(tableCalendar){
            navigate('/calendar'); //홈 화면으로 이동
            //로그인 유지
            try{
                localStorage.setItem('tableCalendar', JSON.stringify(tableCalendar));
            }catch(e){
                console.log('localStorage is not working');
            }
        }
    },[navigate, tableCalendar]);

    return (
        <TableList 
            tableList={tableList}
            user={user}
            loading={loading}
            tableError={tableError}
            error={error}
            onClick={onClick}
            onKeyUp={onKeyUp}
            onDelClick={onDelClick}
        />
    )
}

export default TableListContainer;