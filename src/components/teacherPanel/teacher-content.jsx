import React, { Suspense, useState, useEffect, useContext } from 'react';
import { Spinner } from 'reactstrap';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../../utils/user-context';
const TeacherArticle = React.lazy(() => import('./teacher-article'));
const TeacherFlashCard = React.lazy(() => import('./teacher-flashcard'));
const TeacherMaterial = React.lazy(() => import('./teacher-material'));
const TeacherAssignment = React.lazy(() => import('./teacher-assignment'));

const TeacherArticleAssign = React.lazy(() => import('./teacher-article-assign'));
const TeacherFlashCardAssign = React.lazy(() => import('./teacher-flashcard-assign'));
const TeacherMaterialAssign = React.lazy(() => import('./teacher-material-assign'));
const TeacherAssignmentAssign = React.lazy(() => import('./teacher-assignment-assign'));
const TeacherNoticeAssign = React.lazy(() => import('./teacher-notice-assign'));
const TeacherProgressAssign = React.lazy(() => import('./teacher-progress-assign'));
const TeacherResultAssign = React.lazy(() => import('./teacher-result-assign'));
const TeacherStatusAssign = React.lazy(() => import('./teacher-status-assign'));
const TeacherPaymentAssign = React.lazy(() => import('./teacher-payment-assign'));
// publics
const TeacherArticleAssignPublic = React.lazy(() => import('./teacher-article-assign-public'));
const TeacherFlashCardAssignPublic = React.lazy(() => import('./teacher-flashcard-assign-public'));
const TeacherMaterialAssignPublic = React.lazy(() => import('./teacher-material-assign-public'));
const TeacherAssignmentAssignPublic = React.lazy(() => import('./teacher-assignment-assign-public'));
const TeacherNoticeAssignPublic = React.lazy(() => import('./teacher-notice-assign-public'));
const TeacherProgressAssignPublic = React.lazy(() => import('./teacher-progress-assign-public'));
const TeacherResultAssignPublic = React.lazy(() => import('./teacher-result-assign-public'));
const TeacherStatusAssignPublic = React.lazy(() => import('./teacher-status-assign-public'));
const TeacherPaymentAssignPublic = React.lazy(() => import('./teacher-payment-assign-public'));
const TeacherCourseRegistration = React.lazy(() => import('./teacher-course-registration'));
const TeacherPlan = React.lazy(() => import('./teacher-plan'));
const TeacherResume = React.lazy(() => import('./teacher-resume'));

function DashboardContent() {
    const user = useContext(UserContext);
    const apiEndPoint = process.env.REACT_APP_APIEndPoint;
    const [hasArticle, setHasArticle] = useState(false);
    const [hasFlashCard, setHasFlashCard] = useState(false);
    useEffect(() => {
        let mount = true;
        if (user.UserId !== 0) {
            const fetch = async () => {
                const result = await axios.get(apiEndPoint + `Teacher/HasArticle?teacherId=${user.UserId}`);
                if (mount) {
                    setHasArticle(result.data)
                }
            }
            fetch();
            return () => {
                mount = false;
            }
        }
    }, [apiEndPoint, user.UserId])
    useEffect(() => {
        let mount = true;
        if (user.UserId !== 0) {
            const fetch = async () => {
                const result = await axios.get(apiEndPoint + `Teacher/HasFlashCard?teacherId=${user.UserId}`);
                if (mount) {
                    setHasFlashCard(result.data)
                }
            }
            fetch();
            return () => {
                mount = false;
            }
        }
    }, [apiEndPoint, user.UserId])
    return (
        <div className="p-0 m-0">
            <Suspense fallback={<div className="text-center p-4"><Spinner color="success" /></div>}>
                <Switch>
                    <Route path='/teacher/plan' component={TeacherPlan} />
                    <Route path='/teacher/resume' component={TeacherResume} />
                    <Route path="/teacher/course-registration" component={TeacherCourseRegistration} />
                    <Route path="/teacher/assign-payment-public" component={TeacherPaymentAssignPublic} />
                    <Route path="/teacher/assign-status-public" component={TeacherStatusAssignPublic} />
                    <Route path="/teacher/assign-result-public" component={TeacherResultAssignPublic} />
                    <Route path="/teacher/assign-progress-public" component={TeacherProgressAssignPublic} />
                    <Route path="/teacher/assign-notice-public" component={TeacherNoticeAssignPublic} />
                    <Route path="/teacher/assign-assignment-public" component={TeacherAssignmentAssignPublic} />
                    <Route path="/teacher/assign-material-public" component={TeacherMaterialAssignPublic} />
                    {hasArticle &&
                        <Route path="/teacher/assign-articles-public" component={TeacherArticleAssignPublic} />
                    }
                    {hasFlashCard &&
                        <Route path="/teacher/assign-flashcard-public" component={TeacherFlashCardAssignPublic} />
                    }
                    <Route path="/teacher/assign-payment" component={TeacherPaymentAssign} />
                    <Route path="/teacher/assign-status" component={TeacherStatusAssign} />
                    <Route path="/teacher/assign-result" component={TeacherResultAssign} />
                    <Route path="/teacher/assign-progress" component={TeacherProgressAssign} />
                    <Route path="/teacher/assign-notice" component={TeacherNoticeAssign} />
                    <Route path="/teacher/assign-assignment" component={TeacherAssignmentAssign} />
                    <Route path="/teacher/assign-material" component={TeacherMaterialAssign} />
                    {hasFlashCard &&
                        <Route path="/teacher/assign-flashcard" component={TeacherFlashCardAssign} />
                    }
                    {hasArticle &&
                        <Route path="/teacher/assign-articles" component={TeacherArticleAssign} />
                    }
                    {hasFlashCard &&
                        <Route path="/teacher/flashcard" component={TeacherFlashCard} />
                    }
                    {hasArticle &&
                        <Route path="/teacher/article" component={TeacherArticle} />
                    }
                    <Route path="/teacher/assignment" component={TeacherAssignment} />
                    <Route path="/teacher" component={TeacherMaterial} />
                </Switch>
            </Suspense>
        </div>
    );
}

export default DashboardContent;
