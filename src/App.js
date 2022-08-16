import './App.css';
import React, { useEffect, Suspense } from 'react';
import { Spinner } from 'reactstrap';
import { Redirect, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const Website = React.lazy(() => import('./components/website/website'));
const Dashboard = React.lazy(() => import('./components/dashboard/dashboard'));
const Dean = React.lazy(() => import('./components/deanPanel/dean'));
const Teacher = React.lazy(() => import('./components/teacherPanel/teacher'));
const StudentPanel = React.lazy(() => import('./components/studentPanel/student'));
function App(props) {

  const redirectAdmin = (token) => {
    if (token === null || token === '') {
      return <Redirect to="/" replace />
    }
    else {
      const user = jwt_decode(token)
      if (user.IsAuthorized === true && user.RoleName === 'Admin') {
        return <Dashboard />
      }
      else {
        return <Redirect to="/" replace />
      }
    }
  }
  const redirectDean = (token) => {
    if (token === null || token === '') {
      return <Redirect to="/" />
    }
    else {
      const user = jwt_decode(token)
      if (user.IsAuthorized === true && user.RoleName === 'Dean') {
        return <Dean />
      }
      else {
        return <Redirect to="/" />
      }
    }
  }
  const redirectTeacher = (token) => {
    if (token === null || token === '') {
      return <Redirect to="/" />
    }
    else {
      const user = jwt_decode(token)
      if (user.IsAuthorized === true && user.RoleName === 'Teacher') {
        return <Teacher />
      }
      else {
        return <Redirect to="/" />
      }
    }
  }
  const redirectStudent = (token) => {
    if (token === null || token === '') {
      return <Redirect to="/" />
    }
    else {
      const user = jwt_decode(token)
      if (user.IsAuthorized === true && user.RoleName === 'Student') {
        return <StudentPanel />
      }
      else {
        return <Redirect to="/" />
      }
    }
  }
  useEffect(() => {
    const lang = localStorage.getItem('lang')
    if (lang === null || lang === undefined || lang === '') {
      localStorage.setItem('lang', 'en')
    }
  });
  return (
    <div className="p-0 m-0">
      <Suspense fallback={<Spinner color="success" />}>
        <Switch>
          <Route path="/student" render={() => redirectStudent(localStorage.getItem('token'))} />
          <Route path="/teacher" render={() => redirectTeacher(localStorage.getItem('token'))} />
          <Route path="/dean" render={() => redirectDean(localStorage.getItem('token'))} />
          <Route path="/dashboard" render={() => redirectAdmin(localStorage.getItem('token'))} />
          <Route path="/" component={Website} />
        </Switch>
      </Suspense>

    </div>
  );
}

export default App;

