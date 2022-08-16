import React from 'react';
import _ from 'lodash';
import { Button, ButtonGroup } from 'reactstrap';
const Pagination = (props) => {
    const { itemCount, pageSize, currentPage, onPageChange } = props;
    const pagesCount = Math.ceil(itemCount / pageSize);
    const pages = _.range(1, pagesCount + 1)
    return (<div>
        <ButtonGroup dir="ltr">
            <Button className="bg-white text-primary border-primary" onClick={() => onPageChange(currentPage > 1 ? currentPage - 1 : currentPage)}>{'<'}</Button>
            {pages.map((page, index) =>
                <Button key={index} className={page === currentPage ? "bg-primary text-white border-primary" : "bg-white text-primary border-primary"} onClick={() => onPageChange(page)}>{page}</Button>
            )
            }
            <Button className="bg-white text-primary border-primary" onClick={() => onPageChange(currentPage < pagesCount ? currentPage + 1 : currentPage)}>{'>'}</Button>
        </ButtonGroup>
    </div >);
}
export default Pagination;