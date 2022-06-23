import React, { useEffect, useState } from 'react';
import { Card, Container, Table } from 'react-bootstrap';
import ManagerAppBar from '../../../components/ManagerAppBar';
import { backgroundColor } from '../../../Constants';
import moment from "moment";
import { Edit, Delete } from "@material-ui/icons";
import CustomButton from '../../../components/employee-profiling/form/Button';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { attendanceActions } from "../../../redux/actions";
import _ from 'lodash';

const AttendanceList = props => {

    const [attendanceList, setAttendanceList] = useState([])
    const [dateFilter, setDateFilter] = useState({
        from_date: '',
        to_date: ''
    });

    const dispatch = useDispatch();
    const { attendance } = useSelector(state => state.attendance);

    const handleInputs = (e) => {
        setDateFilter({
            ...dateFilter,
            [e.target.name]: e.target.value
        })
    }

    const searchData = async (e) => {
        e.preventDefault();
        let data = {
            from_date : moment(dateFilter.from_date).format("DD/MM/YYYY"),
            to_date : moment(dateFilter.to_date).format("DD/MM/YYYY")
        }
        dispatch(attendanceActions.searchAttendanceAction(data))
    }

    useEffect(() => {
        dispatch(attendanceActions.getAttendanceAction());
    }, [])

    useEffect(() => {
        if (_.isArray(attendance)) {
            setAttendanceList(attendance)
        }
    }, [attendance])

    return (
        <div style={{ minHeight: "100vh", backgroundImage: backgroundColor }}>
            <ManagerAppBar drawerOption={"open"} location="Home" />
            <Container className='employee-form-container'>
                <Card className='employee-form-card-container'>
                    <div className=''>
                        <h1 className='center' style={{ color: '#0d6efd' }}>Current Month Attendance History</h1>
                    </div>

                    <form onSubmit={searchData}>
                        <div className='row'>

                            <div className="col-md-3">
                                <div className="select-component-container">
                                    <label className="select-component-label form-label" for="family_dob">From Date</label>
                                    <input name="from_date" type="date" value={dateFilter.from_date} onChange={handleInputs} className="select-component-item form-control" />
                                </div>
                            </div>

                            <div className="col-md-3"><div class="select-component-container">
                                <label className="select-component-label form-label" for="family_dob">To Date</label>
                                <input name="to_date" type="date" value={dateFilter.to_date} onChange={handleInputs} className="select-component-item form-control" />
                            </div>
                            </div>

                            <div className="col-md-3">
                                <div class="select-component-container">
                                    <button type="submit" className="btn btn-primary btn-sm" style={{ marginTop: 35 }}>Search</button>
                                </div>
                            </div>

                        </div>
                    </form>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Clock In Date</th>
                                <th>Clock In Time</th>
                                <th>Clock Out Date</th>
                                <th>Clock Out Time</th>
                                <th>Difference</th>

                            </tr>
                        </thead>
                        <tbody>
                            {attendanceList.map((dat) => (
                                <tr>
                                    <td>{dat.Date_Clock_In}</td>
                                    <td>{dat.Clock_In}</td>
                                    <td>{dat.Date_Clock_Out}</td>
                                    <td>{dat.Clock_In}</td>
                                    <td>{dat.Clock_Difference}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card>
            </Container>
        </div>
    );
};

AttendanceList.propTypes = {

};

export default AttendanceList;