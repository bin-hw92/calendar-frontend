
import { Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "../../css/Todo.css";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";

const WriteView = ({ write , onChange, onDateChange, onSubmit, onInputChange }) => {

    const { startDay, startDate, endDay, endDate, hoursArray, minArray} = write;
    const sDate = new Date(startDay);
    const eDate = new Date(endDay);
    
    return (
        <>
        <form onSubmit={onSubmit}>
            <ul>
                <li className="todo-title">
                    <Form.Control type="text" id="todo-title" name="title" placeholder="제목을 입력하세요" onChange={onInputChange}/>
                </li>
                <li className="todo-date">
                    <div>
                        <DatePicker 
                            locale={ko} 
                            onChange={date => onDateChange(date, "START")} 
                            value={sDate}
                            selected={sDate}
                            dateFormat="yyyy.MM.dd"
                        />
                        <Form.Select id="start-hours" value={startDate.hour} onChange={onChange} name="hour">
                            {hoursArray.map(hour => <option value={hour} key={hour}>{hour}시</option>)}
                        </Form.Select>
                        <Form.Select id="start-min" value={startDate.min} onChange={onChange} name="min">
                            {minArray.map(min => <option value={min} key={min}>{min}분</option>)}
                        </Form.Select>
                    </div>
                    <div>
                        <DatePicker 
                            locale={ko} 
                            onChange={date => onDateChange(date, "END")} 
                            value={eDate}
                            selected={eDate}
                            dateFormat="yyyy.MM.dd"
                        />
                        <Form.Select id="end-hours" value={endDate.hour} onChange={onChange} name="hour">
                            {hoursArray.map(hour => <option value={hour} key={hour}>{hour}시</option>)}
                        </Form.Select>
                        <Form.Select id="end-min" value={endDate.min} onChange={onChange} name="min">
                            {minArray.map(min => <option value={min} key={min}>{min}분</option>)}
                        </Form.Select>
                    </div>
                </li>
                <li className="todo-text">
                    <Form.Control as="textarea" name="body" rows={5} onChange={onInputChange}/>
                </li>
            </ul>
            <div className="todo-bottom">
                <Button variant="secondary" data-btn="N">취소</Button>
                <Button variant="primary" data-btn="Y" onClick={onSubmit}>저장</Button>
            </div>
        </form>
        </>
    )
};

export default WriteView;