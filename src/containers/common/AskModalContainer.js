import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import AskModal from "../../components/common/AskModal";
import { changeModal } from "../../modules/calendar";


const AskModalContainer = ({children}) => {
    const [childrenForm, setChildrenForm] = useState([]);
    const dispatch = useDispatch();
    const {modalFlag, type, calendarId} = useSelector(({ calendar, write }) => ({
        modalFlag: calendar.modalFlag,
        type: calendar.type,
        calendarId: write.calendarId,
    }));

    const onClick = useCallback((e) => {
        const eTarget = e.target;
        if(eTarget.tagName === 'DIV' && eTarget.className === 'todo-wrap'){
            dispatch(changeModal({modalFlag:false, type:null}));
        }
        if(eTarget.tagName === 'BUTTON'){
            const btnValue = eTarget.dataset.btn;
            if(btnValue === 'N') dispatch(changeModal({modalFlag:false, type:null}));
            if(btnValue === 'Y') return
            if(btnValue === 'B') dispatch(changeModal({modalFlag:true, type:'view'}));//이전 팝업으로 백
        }
    },[dispatch]);
    
    //상황에 따라 children 보여주는 걸 다르게 하기

    useEffect(() => {
        children.reduce((result, child) => {
            if(type === 'wrtie' && child.type.name === 'WriteViewContainer') setChildrenForm(child);
            if(type === 'view' && child.type.name === 'CalendarViewContainer') setChildrenForm(child);
            return result;
        },[]);
    },[children, type]);
    
    return (
        (modalFlag && <AskModal onClick={onClick} children={childrenForm}/>)
    )
};

export default AskModalContainer;