import React, { useState } from 'react';
import { Table, Button, Container, Row, Col } from 'reactstrap';
import _ from 'lodash';
import Pagination from './pagination';
import Form from 'react-bootstrap/Form';
import { paginate } from '../../utils/paginate';
import PropTypes from 'prop-types';
function TableContent(props) {
    const { dataList, dataTitles, columnList, pageSize, filter, onEdithandler, placeholder } = props;
    const [currentPage, setCurrentPage] = useState(1);
    const [sortItem, setSortItem] = useState(columnList[0]);
    const [sortOrder, setSortOrder] = useState('desc');
    const [title, setTitle] = useState('');
    const itemList = () => {
        const filterdMediaList = title === "" ? dataList : dataList.filter(item => item[filter].toLowerCase().includes(title))
        const sorted = _.orderBy(filterdMediaList, sortItem, sortOrder);
        const itemList = paginate(sorted, currentPage, pageSize);
        return itemList;
    }
    const getColumn = (i) => {
        let filteredList = itemList().filter((item, index) => index === i)[0];
        let list = [];
        for (const [key, element] of Object.entries(filteredList)) {
            if (columnList.includes(key)) {
                list.push(element)
            }
        }
        return list;
    }
    const getIconStyle = () => {
        let classesList = [];
        columnList.forEach(function (item, index) {
            if (item === sortItem) {
                classesList.push(sortOrder === 'asc' ? "fa fa-chevron-circle-up text-success" : "fa fa-chevron-circle-down text-warning");
            }
            else {
                classesList.push("");
            }
        });
        classesList.push("")
        return classesList
    }
    return (
        <div>
            <Container fluid>
                <Row className="mb-2">
                    <Col xs="12" sm="4" className="p-0">
                        <Form.Control name={filter} type="text" placeholder={placeholder !== "" ? placeholder : "Search Title"} value={title} onChange={(e) => setTitle(e.currentTarget.value.toLowerCase())} />
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col xs="12" className="w-100 p-0">
                        <Table className="table table-hover table-responsive">
                            <thead>
                                <tr className="table-primary">
                                    {dataTitles.map((title, i) =>
                                        <th key={i} onClick={() => { setSortItem(columnList[i]); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc') }} className="text-center" >{title} <span className={getIconStyle()[i]}></span></th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {itemList().map((item, rowIndex) =>
                                    <tr key={rowIndex} className={(rowIndex % 2 === 0) ? "table-info" : "table-secondary"}>
                                        {getColumn(rowIndex).map((val, colIndex) =>
                                            typeof (val) !== "boolean"
                                                ?
                                                <td key={colIndex} className="text-center">{val !== null ? val.toString() : ""} </td>
                                                :
                                                <td key={colIndex} className="text-center"><Form.Check inline checked={val} disabled /></td>
                                        )}
                                        {dataTitles.length > columnList.length &&
                                            <td className="text-center">
                                                <Button onClick={() => onEdithandler(item)} className="btn btn-sm">{dataTitles[dataTitles.length - 1]}</Button>
                                            </td>
                                        }
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" className="p-0 m-0 text-center">
                        <Pagination
                            itemCount={dataList.length}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={(page) => setCurrentPage(page)} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
TableContent.propTypes = {
    itemsList: PropTypes.object,
    itemsTitle: PropTypes.array
};
export default TableContent;
