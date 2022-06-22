import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from "./Pages/Home";
import LoginPage from "./Pages/Auth/Login";
import SignUpPage from "./Pages/Auth/SignUp";
//import PrivateRoute from './components/PrivateRoute';
//import PrivateRouteQueryString from './components/PrivateRouteQueryString';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import EmployeeForm from './Pages/HRM/Employee/form';

import { useDispatch, useSelector } from 'react-redux';
import { hrModuleActions } from './redux/actions/hr';
import EmployeeList from './Pages/HRM/Employee/list';
import EmployeeEdit from './Pages/HRM/Employee/edit';
import ClockIn from './Pages/Attendance/Clock/ClockIn';
import AttendanceList from './Pages/Attendance/Clock/AttendanceList';
import ShiftForm from './Pages/Attendance/Shift/ShiftForm';
import CreateShift from './Pages/Attendance/Shift/CreateShift';
import ShiftDetails from './Pages/Attendance/Shift/ShiftDetails';
//import { history } from './helpers/history'
//import { store } from './redux/store';
//import { alertActions } from './redux/actions';

function App() {
  //var [permissionDetails, setPermissionDetails] = useState([]);

  //const permissions = useSelector(state => state.users.permissions);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hrModuleActions.getHrLookupsAction())
  }, []);

  // const getPermissions = () => {
  //  // dispatch(userActions.getPermissionsAction())
  //   dispatch(userActions.getUserProfileIdAction())
  // }

  // useEffect(() => {
  //   setPermissionDetails(permissions)
  // }, [permissions]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/HRM/'>
            <Route path='/HRM/Employees' element={<EmployeeList />} />
            <Route path='/HRM/Create/Employee' element={<EmployeeForm />} />
            <Route path='/HRM/Edit/Employee/:id' element={<EmployeeEdit />} />
          </Route>
          <Route path='/Attendance/'>
            <Route path='/Attendance/clockIn' element={<ClockIn />} />
            <Route path='/Attendance/AttendanceList' element={<AttendanceList />} />
            <Route path='/Attendance/ShiftForm' element={<ShiftForm />} />
            <Route path='/Attendance/CreateShift' element={<CreateShift />} />
            <Route path='/Attendance/ShiftDetails' element={<ShiftDetails />} />

          </Route>
          <Route path='/Home' element={<HomePage />} />
          <Route path='/' element={<LoginPage />} />
          <Route path='/SignUp' element={<SignUpPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
