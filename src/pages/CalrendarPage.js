
import Responsive from "../components/common/Responsive";
import CalendarListContainer from "../containers/calendar/CalendarListContainer";
import CalendarHeaderContainer from "../containers/calendar/CalendarHeaderContainer";
import HeaderContainer from "../containers/common/HeaderContainer";
import WriteViewContainer from "../containers/write/WriteViewContainer";
import AskModalContainer from "../containers/common/AskModalContainer";
import CalendarViewContainer from "../containers/calendar/CalendarViewContainer";


const CalrendarPage = () => {
    return (
        <>
            <HeaderContainer />
            <Responsive>
                <CalendarHeaderContainer />
                <CalendarListContainer />
            </Responsive>
            <AskModalContainer>
                <WriteViewContainer />
                <CalendarViewContainer />
            </AskModalContainer>
        </>
    );
};

export default CalrendarPage;