import React, { useState, Suspense } from 'react';
import { Spinner } from 'reactstrap';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
const CourseListPrivate = React.lazy(() => import('./course-list-private'));
const CourseListPublic = React.lazy(() => import('./course-list-public'));
const Courses = (props) => {
    const lang = localStorage.getItem('lang')
    const [key, setKey] = useState('home');
    const getHeading = (lang) => {
        let heading = []
        if (lang === 'en') {
            heading.push("Private Courses")
            heading.push("Public Courses")
        }

        if (lang === 'fr') {
            heading.push("Cours privés")
            heading.push("Cours publics")
        }

        if (lang === 'fa') {
            heading.push("کلاس های خصوصی")
            heading.push("کلاسهای عمومی")
        }

        if (lang === 'ar') {
            heading.push("الدورات الخاصة")
            heading.push("الدورات العامة")
        }
        return heading
    }
    return (
        <div className="m-0">
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
            >
                <Tab eventKey="home" tabClassName="font-weight-bold" className="tab-border" title={getHeading(lang)[0]}>
                    <Suspense fallback={<Spinner color="success" />}>
                        <CourseListPrivate />
                    </Suspense>
                </Tab>
                <Tab eventKey="profile" tabClassName="font-weight-bold" className="tab-border" title={getHeading(lang)[1]}>
                    <Suspense fallback={<Spinner color="success" />}>
                        <CourseListPublic />
                    </Suspense>
                </Tab>
            </Tabs>
        </div>
    );
}

export default Courses;