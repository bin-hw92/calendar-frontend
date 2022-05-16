import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../components/table/Pagination"



const PaginationContainer = () => {
    const [searchParams] = useSearchParams();

    const page = parseInt(searchParams.get('page'), 10) || 1;

    const { lastPage, tableList, loading } = useSelector(({ tables, loading}) => 
        ({
            lastPage: tables.lastPage,
            tableList: tables.tableList,
            loading: loading['table/LIST_TABLE'],
        }));

        if(!tableList || loading) return;
    return (
        <Pagination page={parseInt(page, 10)} lastPage={lastPage}/>
    )
}

export default PaginationContainer;