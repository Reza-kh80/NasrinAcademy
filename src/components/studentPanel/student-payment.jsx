import React, { Component, Suspense } from 'react';
import { Container, Row, Col, Spinner } from 'reactstrap';
import axios from 'axios';
import UserContext from '../../utils/user-context';
const TableContent = React.lazy(() => import('../general/table-paid'));
class StudentStatusPayment extends Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);
        this.state = {
            apiEndPoint: process.env.REACT_APP_APIEndPoint,
            pageSize: 20,
            dataList: [],
            dataTitles: ["ID", 'Teacher', 'Course', 'Amount', 'Issued Date', 'Due date', 'Paid ?', 'Paid Date', 'Reference ID', 'Pay Now'],
            columnList: ["id", 'TeacherName', 'CourseName', 'Amount', 'IssueDate', 'DueDate', 'IsPaid', 'PaidDate', 'ReferenceId'],
            filteredItem: "Amount",
            termId: "",
            showPaymentDetail: false,
            termPaymentId: "",
        }
    }
    getTermPayment = async () => {
        const url = this.context.status
            ? this.state.apiEndPoint + `TermPayment/DisplayAllPublic?studentId=${this.context.user.UserId}`
            : this.state.apiEndPoint + `TermPayment/DisplayAllPrivate?studentId=${this.context.user.UserId}`;
        const dataList = [];
        await axios.get(url).then(response => {
            let md = response.data
            md.map((m, i) =>
                dataList.push({
                    id: i + 1,
                    TermPaymentId: this.context.status ? m.PublicTermPaymentId : m.PrivateTermPaymentId,
                    TeacherName: m.TeacherName,
                    StudentName: m.StudentName,
                    CourseName: m.CourseName,
                    Amount: m.Amount,
                    IssueDate: m.IssueDate,
                    DueDate: m.DueDate,
                    IsPaid: m.IsPaid,
                    PaidDate: m.PaidDate,
                    ReferenceId: m.ReferenceId.toString(),
                    Modifier: m.Modifier,
                    IsDeleted: m.IsDeleted,
                    TermId: m.TermId,
                }),
            );
            this.setState({ dataList });
        });
    }
    componentDidMount() {
        this.getTermPayment();
    }
    componentDidUpdate(prevProps, prevState) {
    }
    onVisit = async (list) => {
        localStorage.setItem('termPaymentId', list.TermPaymentId.toString())
        localStorage.setItem('amount', list.Amount.toString())
        await axios.post(this.state.apiEndPoint + `Payment/Pay?amount=${list.Amount}`, {})
            .then(response => {
                if (response.data !== "No Response" || response.data !== "An error has occurred") {
                    window.open(`https://www.zarinpal.com/pg/StartPay/${response.data}`);
                }
                else {
                    alert("An error has occurred");
                }
            }).catch(function (error) {
                alert(error);
            })
    }
    render() {
        const { dataList, dataTitles, columnList, pageSize, filteredItem } = this.state;
        return (<div>

            <Container fluid className="table">
                <Row className="mb-2">
                    <Col xs="12" className="text-left text-dark p-0" >
                        <h3 className="text-primary text-center font-weight-bold">Payments</h3>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" className="text-left m-0 p-1">
                        <h6 className="text-primary font-weight-bold">List of all payment for this course</h6>
                        <div>
                            <Suspense fallback={<Spinner color="success" />}>
                                <TableContent filter={filteredItem} dataList={dataList} dataTitles={dataTitles} columnList={columnList} onEdithandler={this.onVisit} pageSize={pageSize} />
                            </Suspense>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>);
    }
}
export default StudentStatusPayment;

