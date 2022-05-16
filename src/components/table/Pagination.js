import styled from "styled-components";
import qs from 'qs';
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const PaginationBlock = styled.div`
    width: 320px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3rem;
`;

const PageNumber = styled.div``;

const buildLink = ({ username, page }) => {
    const query = qs.stringify({ page });
    return username ? `/${username}?${query}` : `/?${query}`;
};
const Pagination = ({ page, lastPage }) => {
    return (
        <PaginationBlock>
            {page === 1 ? (
                <Button disabled={page === 1}>이전</Button>
            ):(
                <Link disabled={page === 1} to={buildLink({ username: 'table', page: page-1 })} className="btn btn-primary">이전</Link>
            )}
            <PageNumber>{page}</PageNumber>
            {page === lastPage ? (
                <Button disabled={page === lastPage}>다음</Button>
            ):(
                <Link disabled={page === lastPage} to={buildLink({ username: 'table', page: page+1 })} className="btn btn-primary">다음</Link>
            )}
            
        </PaginationBlock>
    );
};

export default Pagination;