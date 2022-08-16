import React, { Suspense, useState, useEffect, useContext } from 'react';
import { Spinner } from 'reactstrap';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';
import UserContext from '../../utils/user-context';
const StudentStatus = React.lazy(() => import('./student-status'));
const StudentLesson = React.lazy(() => import('./student-lesson'));
const StudentFlashCard = React.lazy(() => import('./student-flashcard'));
const StudentMaterial = React.lazy(() => import('./student-material'));
const StudentAssignment = React.lazy(() => import('./student-assignmnet'));
const StudentCertificate = React.lazy(() => import('./student-certificate'));
const StudentPayment = React.lazy(() => import('./student-payment'));
const StudentPaymentSuccessful = React.lazy(() => import('./student-payment-successful'));
function DashboardContent() {
    const myContext = useContext(UserContext);
    const apiEndPoint = process.env.REACT_APP_APIEndPoint;
    const [teacherId, setTeacherId] = useState(0);
    const [hasArticle, setHasArticle] = useState(false);
    const [hasFlashCard, setHasFlashCard] = useState(false);
    useEffect(() => {
        const url = myContext.status
            ? apiEndPoint + `Student/GetPublicTeacherId?studentId=${myContext.user.UserId}`
            : apiEndPoint + `Student/GetPrivateTeacherId?studentId=${myContext.user.UserId}`;
        let mount = true;
        const fetch = async () => {
            const result = await axios.get(url);
            if (mount) {
                setTeacherId(result.data)
            }
        }
        fetch();
        return () => {
            mount = false;
        }
    }, [apiEndPoint, myContext.user.UserId, myContext.status])
    useEffect(() => {
        let mount = true;
        if (teacherId !== 0) {
            const fetch = async () => {
                const result = await axios.get(apiEndPoint + `Teacher/HasArticle?teacherId=${teacherId}`);
                if (mount) {
                    setHasArticle(result.data)
                }
            }
            fetch();
            return () => {
                mount = false;
            }
        }
    }, [apiEndPoint, teacherId])
    useEffect(() => {
        let mount = true;
        if (teacherId !== 0) {
            const fetch = async () => {
                const result = await axios.get(apiEndPoint + `Teacher/HasFlashCard?teacherId=${teacherId}`);
                if (mount) {
                    setHasFlashCard(result.data)
                }
            }
            fetch();
            return () => {
                mount = false;
            }
        }
    }, [apiEndPoint, teacherId])
    return (
        <div className="p-0 m-0">
            <Suspense fallback={<div className="text-center p-4"><Spinner color="success" /></div>}>
                <Switch>
                    <Route path="/student/successful" component={StudentPaymentSuccessful} />
                    <Route path="/student/payment" component={StudentPayment} />
                    <Route path="/student/certificate" component={StudentCertificate} />
                    <Route path="/student/assignment" component={StudentAssignment} />
                    <Route path="/student/material" component={StudentMaterial} />
                    {hasFlashCard &&
                        <Route path="/student/flashcard" component={StudentFlashCard} />
                    }
                    {hasArticle &&
                        <Route path="/student/lesson" component={StudentLesson} />
                    }
                    <Route path="/student" component={StudentStatus} />
                </Switch>
            </Suspense>
        </div>
    );
}

export default DashboardContent;
