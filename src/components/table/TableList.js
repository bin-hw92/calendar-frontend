import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loading from "../common/Loading";

const TableList = ({tableList, user, loading, tableError, error, onClick, onKeyUp, onDelClick}) => {
    if(tableError || user === null){
      return;
    }
    
    return (
      <>
        <div className="table-header">
            <Link to="write">
              <Button variant="primary">추가</Button>
            </Link>
        </div>
        {!loading && tableList && (
          <div className="table-list">
          <ul>
            {tableList.map(table => {
              const passwordError = error[0] === table._id ?  {'border': '1px solid red'} : {};
              return(
                <li key={table._id} className="table-list-item">
                    <div className="item-top">
                      <div className="item-top-title">
                          <div>{table.title}</div>
                          {table.user.username === user.username && <div className="item-delete-button" onClick={() => onDelClick(table._id)}></div>}
                      </div>
                      <div className="item-top-password">
                        <Form.Control type="password" id={'password_'+table._id} data-id={table._id} name="password" placeholder="비밀번호" style={passwordError} onKeyUp={onKeyUp}/>
                        <Button variant="outline-primary" onClick={() => onClick(table._id)}>입장</Button>
                      </div>
                    </div>
                    {error[0] === table._id && <div className="item-top-error">{error[1]}</div>}
                    <div className="item-body">
                      {table.body}
                    </div>
                </li>
            )})}
          </ul>
        </div>
        )}
        {loading && <Loading />}
      </>
    )
}

export default TableList;