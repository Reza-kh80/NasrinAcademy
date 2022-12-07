import React, { useState, useEffect, useContext, Suspense } from 'react';
import axios from 'axios';
import UserContext from '../../utils/user-context';
import { Card, CardHeader, CardFooter, CardBody, Spinner } from 'reactstrap';
const StudentStatusFinance = React.lazy(() => import('./student-status-finance'));
function StudentProperty(props) {
    const apiEndPoint = process.env.REACT_APP_APIEndPoint;
    const mediaEndPoint = process.env.REACT_APP_MediaEndPoint;
    const currentUser = useContext(UserContext);
    const [studentList, setStudentList] = useState([]);
    const [url, setUrl] = useState("");
    useEffect(() => {
        if (studentList.Photo !== undefined && studentList.Photo !== "") {
            setUrl(mediaEndPoint + 'Student/' + studentList.Photo)
        }
        else {
            setUrl("main-images/user.webp")
        }

    }, [studentList, mediaEndPoint]);
    useEffect(() => {
        const url = currentUser.status
            ? apiEndPoint + `Student/GetPublic?studentId=${currentUser.user.UserId}`
            : apiEndPoint + `Student/GetPrivate?studentId=${currentUser.user.UserId}`;
        let mounted = true;
        console.log("url",url);
        if (currentUser.user.UserId !== "") {
            const fetchData = async () => {
                const result = await axios.get(url)
                if (mounted) {
                    setStudentList(result.data);
                }
            };
            fetchData();
            return () => {
                mounted = false;
            };
        }
    }, [apiEndPoint, currentUser.user.UserId, currentUser.status]);
    return (

        <div className="text-left">
            <Card>
                <CardHeader>
                    <h4 className="text-primary text-center font-weight-bold">{studentList.Name}</h4>
                </CardHeader>
                {studentList.Photo !== "" && <img width="100%" height="100%" src={url} alt={studentList.Name + "photo"} />}
                <CardBody>
                    <h6 className="text-muted">Phone: <strong className="text-warning">{studentList.Phone}</strong></h6>
                    <h6 className="text-muted">Enail: <strong className="text-warning">{studentList.Email}</strong></h6>
                    <h6 className="text-muted">Address: <strong className="text-warning">{studentList.Address}</strong></h6>
                    <Suspense fallback={<Spinner color="success" />}>
                        <StudentStatusFinance />
                    </Suspense>
                </CardBody>
                <CardFooter>Footer</CardFooter>
            </Card>
        </div >
    );
}
export default StudentProperty;


