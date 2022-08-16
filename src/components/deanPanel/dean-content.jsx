import React, { Suspense } from 'react';
import { Spinner } from 'reactstrap';
import { Route, Switch } from 'react-router-dom';
const DeanFlashCard = React.lazy(() => import('./dean-flashcard'));
const DeanArticle = React.lazy(() => import('./dean-article'));
const DeanLanguage = React.lazy(() => import('./dean-language'));
const DeanLevel = React.lazy(() => import('./dean-level'));
const DeanFlashCardCategory = React.lazy(() => import('./dean-flashcard-category'));
const DeanCourse = React.lazy(() => import('./dean-course'));
const DeanCourseOverview = React.lazy(() => import('./dean-course-overview'));
const DeanTeacher = React.lazy(() => import('./dean-teacher'));

const DeanPrivateStudent = React.lazy(() => import('./dean-private-student'));
const DeanPrivateTeacherCourse = React.lazy(() => import('./dean-private-teacher-course'));

const DeanPublicStudent = React.lazy(() => import('./dean-public-student'));
const DeanPublicTeacherCourse = React.lazy(() => import('./dean-public-teacher-course'));
const DeanPublicClass = React.lazy(() => import('./dean-public-class'));
function DashboardContent() {

    return (
        <div className="p-0 m-0">
            <Suspense fallback={<div className="text-center p-4"><Spinner color="success" /></div>}>
                <Switch>
                    <Route path="/dean/flashcard" component={DeanFlashCard} />
                    <Route path="/dean/article" component={DeanArticle} />
                    <Route path="/dean/public-classes" component={DeanPublicClass} />
                    <Route path="/dean/public-courses" component={DeanPublicTeacherCourse} />
                    <Route path="/dean/public-student" component={DeanPublicStudent} />

                    <Route path="/dean/private-courses" component={DeanPrivateTeacherCourse} />
                    <Route path="/dean/private-student" component={DeanPrivateStudent} />
                    <Route path="/dean/teacher" component={DeanTeacher} />
                    <Route path="/dean/courseoverview" component={DeanCourseOverview} />
                    <Route path="/dean/course" component={DeanCourse} />
                    <Route path="/dean/flashcard-category" component={DeanFlashCardCategory} />
                    <Route path="/dean/level" component={DeanLevel} />
                    <Route path="/dean" component={DeanLanguage} />
                </Switch>
            </Suspense>
        </div>
    );
}

export default DashboardContent;
