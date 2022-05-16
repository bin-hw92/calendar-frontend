import Responsive from "../components/common/Responsive";
import HeaderContainer from "../containers/common/HeaderContainer";
import WriteTableContainer from "../containers/write/WriteTableContainer";

const TableWritePage = () => {
    return (
        <>
            <HeaderContainer />
            <Responsive>
                <WriteTableContainer />
            </Responsive>
        </>
    )
};

export default TableWritePage;