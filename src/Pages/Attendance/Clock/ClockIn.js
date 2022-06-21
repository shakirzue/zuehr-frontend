import React, { useEffect, useState } from "react";
import ManagerAppBar from '../../../components/ManagerAppBar';
import * as geolib from "geolib";
import moment from "moment";
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';
import { useDispatch, useSelector } from "react-redux";
import { attendanceActions } from "../../../redux/actions";
import { ToastContainer, toast } from 'react-toastify';
import { getLocalStorage } from '../../../helpers/utils';

function ClockIn() {
    const [newTask, setNewTask] = useState({});
    const dispatch = useDispatch();
    const { defaultClient, checkAlready } = useSelector(state => state.attendance);

    let todayDate = new Date();
    let todayCurrentDate = moment(todayDate).format("DD/MM/YYYY");


    const dateTimeZone = new Date();
    const dateAsString = dateTimeZone.toString();
    let timezone = dateAsString.match(/\(([^\)]+)\)$/)[1];

    useEffect(() => {
        // Working with W3C Geolocation API
        var latitude;
        var longitude;
        var DistanceInKilometerFromOffice;
        navigator.geolocation.getCurrentPosition(
            (position) => {
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
                DistanceInKilometerFromOffice = geolib.getDistance(
                    { latitude, longitude },
                    {
                        latitude: 24.86933,
                        longitude: 67.082216,
                    }
                );
                DistanceInKilometerFromOffice =
                    Number(DistanceInKilometerFromOffice) / 1000;
                setNewTask({
                    DistanceInKilometerFromOffice: DistanceInKilometerFromOffice,
                    Latitude: latitude,
                    Longitude: longitude,
                });
            },
            () => {
                alert("Position could not be determined.");
            }
        );

        const passData = {
            clockInDate: todayCurrentDate,
            userProfileId: getLocalStorage('userProfileId'),
            personalDetailId: getLocalStorage('personalDetailId'),
        }
        dispatch(attendanceActions.alreadyMarkAttendanceAction(passData));

    }, []);

    const [newTaskData, setNewTaskData] = useState();
    const [clockOutData, setClockOutData] = useState();

    const employeeLoggedIn = useSelector((state) => state.authorised);

    const clockInHandler = () => {
        let date = new Date();
        let timeStampDate = moment(date).format("DD/MM/YYYY");
        let timeStampDateRowKey = moment(date).format("M-D-YYYY");
        let timeStampTime = moment(date).format("HH:mm:ss");

        // let rowKey =
        // employeeLoggedIn.employeeID._ + timeStampDateRowKey + timeStampTime;
        if (
            newTask.Latitude &&
            newTask.Longitude &&
            newTask.DistanceInKilometerFromOffice
        ) {

            const checkInData = {
                //RowKey: rowKey,
                //EmployeeID: employeeLoggedIn.employeeID?._,
                userProfileId: getLocalStorage('userProfileId'),
                personalDetailId: getLocalStorage('personalDetailId'),
                ClockInClockOut: "Clock In",
                clockInDate: timeStampDate,
                clockIn: timeStampTime,
                latitude: newTask.Latitude,
                longitude: newTask.Longitude,
                distanceInKilometerFromOffice: newTask.DistanceInKilometerFromOffice,
                IsMachineRequest: 0,
                timezone: timezone
            }

            setNewTaskData(checkInData)

            dispatch(attendanceActions.createAttendanceAction(checkInData));

        } else {
            alert("Location must be open");
        }
    };

    useEffect(() => {
        if (defaultClient?.status == 1) {           
            toast.success(`Clock In Successfully ! ${new Date("2015-03-25")}`, {
                position: toast.POSITION.TOP_CENTER
            });
            const passData = {
                clockInDate: todayCurrentDate,
                userProfileId: getLocalStorage('userProfileId'),
                personalDetailId: getLocalStorage('personalDetailId'),
            }
            dispatch(attendanceActions.alreadyMarkAttendanceAction(passData));
        }
        if (defaultClient?.status == 0) {
            toast.error(defaultClient.message, {
                position: toast.POSITION.TOP_CENTER
            });
        }

    }, [defaultClient])

    // here is Clock out handler
    const clockOutHandler = () => {
        let date = new Date();
        let timeStampDate = moment(date).format("DD/MM/YYYY");
        let timeStampDateRowKey = moment(date).format("M-D-YYYY");
        let timeStampTime = moment(date).format("HH:mm:ss");
        // let rowKey =
        //   employeeLoggedIn.employeeID._ + timeStampDateRowKey + timeStampTime;
        if (
            newTask.Latitude &&
            newTask.Longitude &&
            newTask.DistanceInKilometerFromOffice
        ) {
            let clockData = {
                // RowKey: rowKey,
                // EmployeeID: employeeLoggedIn.employeeID?._,
                userProfileId: getLocalStorage('userProfileId'),
                personalDetailId: getLocalStorage('personalDetailId'),
                ClockInClockOut: "Clock Out",
                clockOutDate: timeStampDate,
                clockOut: timeStampTime,
                Latitude: newTask.Latitude,
                Longitude: newTask.Longitude,
                DistanceInKilometerFromOffice: newTask.DistanceInKilometerFromOffice,
                timezone: timezone
            };
            setClockOutData(clockData);
        
            dispatch(attendanceActions.checkOutAttendanceAction(clockData));
            toast.success("Clock Out Successfully !", {
                position: toast.POSITION.TOP_CENTER
            });

        } else {
            alert("Location must be open");
        }
    };

    const [value, setValue] = useState(new Date());
    useEffect(() => {
        const interval = setInterval(() => setValue(new Date()), 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div>
            <ManagerAppBar drawerOption={""} location="Home" />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            {/* Same as */}
            <ToastContainer />
            <div className="container" style={{ marginTop: 20 }}>
                <div className="row"><h1>ZUE NHMS PORTAL ATTENDANCE MODULE</h1></div>
                <div className="row text-center">
                    <div className="col-md-6 mt-5">
                        <Clock value={value} size="400" />
                    </div>
                    <div className="col-md-6 mt-5 d-flex align-items-center justify-content-center">
                        <button className="btn btn-primary btn-lg" onClick={clockInHandler} style={{ marginRight: 20, padding: 12, fontSize: 35 }}
                        disabled = {checkAlready?.status == 1 ? 'disabled' : ''}
                        >CLOCK IN</button>

                        {/* <button className="btn btn-primary btn-lg" onClick={clockInHandler} style={{ marginRight: 20, padding: 12, fontSize: 35 }}>CLOCK IN</button> */}

                        <button className="btn btn-success btn-lg" onClick={clockOutHandler} style={{ marginRight: 20, padding: 12, fontSize: 35 }}>CLOCK OUT</button>

                    </div>
                </div>
            </div>

        </div>
    );
}

export default ClockIn;