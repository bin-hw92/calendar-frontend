import Responsive from "../components/common/Responsive";
import HeaderContainer from "../containers/common/HeaderContainer";
import PaginationContainer from "../containers/table/PaginationContainer";
import TableListContainer from "../containers/table/TableListContainer";

const TableListPage = () => {
    return (
        <>
            <HeaderContainer />
            <Responsive>
                <TableListContainer />
                <PaginationContainer />
            </Responsive>
        </>
    )
};

export default TableListPage;