import React, { Component, Suspense } from 'react';
import { Spinner } from 'reactstrap';
import axios from 'axios';
import UserContext from '../../utils/user-context';
const ProgressChart = React.lazy(() => import('./progress-chart'));
class StudentStatusProgress extends Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);
        this.state = {
            apiEndPoint: process.env.REACT_APP_APIEndPoint,
            planList: [],
            actualList: [],
            labelList: [],
            termId: "",
        }
    }
    getTermProgress = async () => {
        const url = this.context.status
            ? this.state.apiEndPoint + `TermProgress/DisplayAllPublic?studentId=${this.context.user.UserId}`
            : this.state.apiEndPoint + `TermProgress/DisplayAllPrivate?studentId=${this.context.user.UserId}`;
        const labelList = [];
        const planList = [];
        const actualList = [];
        await axios.get(url).then(response => {
            let list = response.data
            list.map(function (m) {
                return ([
                    labelList.push(m.Label),
                    planList.push(m.Plan),
                    actualList.push(m.Actual)
                ]);
            })
            this.setState({ labelList });
            this.setState({ planList });
            this.setState({ actualList });
        });
    }
    componentDidMount() {
        this.getTermProgress();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.labelList !== this.state.labelList) {
        }
    }
    render() {
        const { labelList, planList, actualList, } = this.state;
        return (<div className="p-2 img img-thumbnail">
            <Suspense fallback={<Spinner color="success" />}>
                <ProgressChart label={labelList} plan={planList} actual={actualList} />
            </Suspense>
        </div>);
    }
}
export default StudentStatusProgress;
