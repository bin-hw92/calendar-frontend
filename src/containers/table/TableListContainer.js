import { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import TableList from "../../components/table/TableList";
import { checkTable, listTable } from "../../modules/tables";


const TableListContainer = () => {
    const dispatch = useDispatch();
    const [tableId, setTableId] = useState('');
    const [error, setError] = useState(['','']);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const { tableList, tableError, tableCalendar, checkError, loading } = useSelector(({tables, user, loading}) => ({
        tableList: tables.tableList,
        tableError: tables.tableError,
        loading: loading['table/LIST_TABLE'],
        user: user.user,
        tableCalendar: tables.tableCalendar,
        checkError: tables.checkError,
    }));

    useEffect(() => {
        // page가 없으면 1을 기본값으로 사용
        const page = parseInt(searchParams.get('page'), 10) || 1;
        dispatch(listTable({page}));
    },[dispatch, searchParams]);

    const onClick = useCallback(id => {
        const eValue = document.querySelector(`#password_${id}`).value;
        setTableId(id);
        if(eValue.trim() === '') return setError([id, '비밀번호를 입력하세요.']);;
        
        dispatch(checkTable({id, password: eValue}));
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
            loading={loading}
            tableError={tableError}
            error={error}
            onClick={onClick}
        />
    )
}

export default TableListContainer;