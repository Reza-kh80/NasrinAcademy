import React, { Suspense } from 'react';
import { Spinner } from 'reactstrap';
import { Route, Switch } from 'react-router-dom';
const DashboardHome = React.lazy(() => import('./dashboard-home'));
const DashboardAbout = React.lazy(() => import('./dashboard-about'));
const DashboardContact = React.lazy(() => import('./dashboard-contact'));
const DashboardRegister = React.lazy(() => import('./dashboard-register'));
const DashboardAdvertise = React.lazy(() => import('./dashboard-advertise'));
const DashboardAgreement = React.lazy(() => import('./dashboard-agreement'));
const DashboardMainAdvertise = React.lazy(() => import('./dashboard-main-advertise'));
const DashboardVideo = React.lazy(() => import('./dashboard-videos'));
const DashboardSiteMenu = React.lazy(() => import('./dashboard-sitemenu'));
const DashboardCourseOutlook = React.lazy(() => import('./dashboard-course-outlook'));
const DashboardTeacherOutlook = React.lazy(() => import('./dashboard-teacher-outlook'));
const DashboardFlashCardOutlook = React.lazy(() => import('./dashboard-flashcard-outlook'));
const DashboardVideoOutlook = React.lazy(() => import('./dashboard-video-outlook'));
const DashboardTeacherRecritment = React.lazy(() => import('./dashboard-teacher-recruitment'));
const DashboardUser = React.lazy(() => import('./dashboard-user'));
function DashboardContent() {
    return (
        <div className="p-0 m-0">
            <Suspense fallback={<div className="text-center p-4"><Spinner color="success" /></div>}>
                <Switch>
                    <Route path="/dashboard/user" component={DashboardUser} />
                    <Route path="/dashboard/teacherrecruitment" component={DashboardTeacherRecritment} />
                    <Route path="/dashboard/videooutlook" component={DashboardVideoOutlook} />
                    <Route path="/dashboard/flashcardoutlook" component={DashboardFlashCardOutlook} />
                    <Route path="/dashboard/teacheroutlook" component={DashboardTeacherOutlook} />
                    <Route path="/dashboard/courseoutlook" component={DashboardCourseOutlook} />
                    <Route path="/dashboard/menu" component={DashboardSiteMenu} />
                    <Route path="/dashboard/video" component={DashboardVideo} />
                    <Route path="/dashboard/main-advertise" component={DashboardMainAdvertise} />
                    <Route path="/dashboard/agreement" component={DashboardAgreement} />
                    <Route path="/dashboard/advertise" component={DashboardAdvertise} />
                    <Route path="/dashboard/register" component={DashboardRegister} />
                    <Route path="/dashboard/contact" component={DashboardContact} />
                    <Route path="/dashboard/about" component={DashboardAbout} />
                    <Route path="/dashboard" component={DashboardHome} />
                </Switch>
            </Suspense>
        </div>
    );
}

export default DashboardContent;
