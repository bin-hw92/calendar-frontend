
import { Button, Form } from "react-bootstrap";
import styled from "styled-components";
import "../../css/Table.css";

/* 에러를 보여줍니다. */
const ErrorMessage = styled.div`
    color: red;
    text-align: center;
    font-size: 0.875rem;
    margi-top: 1rem;
`;

const WriteTable = ({ table, error, onSubmit, onCancel, onChange }) => {
    const titleError = error[0] === 1 ?  {'border': '1px solid red'} : {};
    const passwordError = error[0] === 2 ?  {'border': '1px solid red'} : {};
    return (
        <>
        <form className="table-write" onSubmit={onSubmit}>
            <ul>
                <li className="table-title">
                    <Form.Control type="text" id="title" style={titleError} name="title" placeholder="제목을 입력하세요" onChange={onChange} value={table.title} />
                </li>
                <li className="table-title">
                    <Form.Control type="password" id="password" style={passwordError} name="password" placeholder="비밀번호를 입력하세요" onChange={onChange} value={table.password} />
                </li>
                <li className="table-text">
                    <Form.Control as="textarea" name="body" rows={5} onChange={onChange} value={table.body} />
                </li>
            </ul>
            {error[0] > 0 && <ErrorMessage>{error[1]}</ErrorMessage>}
            <div className="table-bottom">
                <Button variant="secondary" data-btn="N" onClick={onCancel}>취소</Button>
                <Button variant="primary" data-btn="Y" onClick={onSubmit}>저장</Button>
            </div>
        </form>
        </>
    )
};


export default WriteTable;