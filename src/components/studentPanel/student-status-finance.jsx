import React, { Component } from 'react';
import axios from 'axios';
import UserContext from '../../utils/user-context';
class StudentStatusFinance extends Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);
        this.state = {
            apiEndPoint: process.env.REACT_APP_APIEndPoint,
            dataList: {
                Sessions: "",
                RemainSessions: "",
                NextPayment: "",
                NextPaymentDate: "",
                TotalPayment: "",
            },
            hasRecord: false
        }
    }
    getTermStatus = async (id) => {
        const url = this.context.status
            ? this.state.apiEndPoint + `TermStatus/DisplayAllPublic?studentId=${id}`
            : this.state.apiEndPoint + `TermStatus/DisplayAllPrivate?studentId=${id}`;
        await axios.get(url).then(response => {
            console.log(Object.keys(response.data).length)
            if (Object.keys(response.data).length > 0) {
                const maxId = Math.max(...response.data.map(item => this.context.status ? item.PublicTermStatusId : item.PrivateTermStatusId));
                const lastRecord = response.data.filter(item => this.context.status ? item.PublicTermStatusId === maxId : item.PrivateTermStatusId === maxId);
                this.setState({ dataList: lastRecord[0] });
                this.setState({ hasRecord: true });
            }
            else {
                this.setState({ hasRecord: false });
            }
        });
    }
    componentDidMount() {
        this.getTermStatus(this.context.user.UserId);
    }
    componentDidUpdate(prevProps, prevState) {

        if (prevState.dataList !== this.state.dataList) {
        }
    }
    render() {
        const { dataList, hasRecord } = this.state;
        return (<div className="text-left">
            {hasRecord && <div>
                <h6 className="text-muted">Session Passed : <strong className="text-warning">{dataList.Sessions}</strong></h6>
                <h6 className="text-muted">Remain Sessions: <strong className="text-warning">{dataList.RemainSessions}</strong></h6>
                <h6 className="text-muted">Next Payment Amount: <strong className="text-warning">{dataList.NextPayment}</strong></h6>
                <h6 className="text-muted">Next Payment Date : <strong className="text-warning">{dataList.NextPaymentDate}</strong></h6>
                <h6 className="text-muted">Total Payment : <strong className="text-warning">{dataList.TotalPayment}</strong></h6>
            </div>
            }
        </div>);
    }
}
export default StudentStatusFinance;
