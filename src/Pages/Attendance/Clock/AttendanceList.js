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
        <div style={{ height: "100vh", backgroundColor: "#f4f4f4", overflow: "scroll" }}>
            <ManagerAppBar drawerOption={"open"} location="Home" />
            <Container className='employee-form-container'>
            <div className='main-dashboard col-sm-12'>
                    <h3 className="mb-3" style={{ textAlign: "left" }}>Attendance History</h3>
                </div>
                <Card className='employee-form-card-container'>
                    
                    <form onSubmit={searchData}>
                        <div className='row'>

                        <div className="col-sm-12 col-md-3" style={{ paddingTop: 36 }}>
                                <div class="dt-buttons btn-group d-flex">   
                                <button class="btn btn-secondary buttons-excel buttons-html5" tabindex="0" aria-controls="example1" type="button"><span>Excel</span></button> 
                                <button class="btn btn-secondary buttons-pdf buttons-html5" tabindex="0" aria-controls="example1" type="button"><span>PDF</span></button> 
                                <button class="btn btn-secondary buttons-print" tabindex="0" aria-controls="example1" type="button"><span>Print</span></button> 
                                </div>
                            </div>

                            <div className="col-sm-12 col-md-4">
                                <div className="select-component-container">
                                    <label className="select-component-label form-label" for="family_dob">From Date</label>
                                    <input name="from_date" type="date" value={dateFilter.from_date} onChange={handleInputs} className="select-component-item form-control" />
                                </div>
                            </div>

                            <div className="col-sm-12 col-md-4">
                                <div class="select-component-container">
                                    <label className="select-component-label form-label" for="family_dob">To Date</label>
                                    <input name="to_date" type="date" value={dateFilter.to_date} onChange={handleInputs} className="select-component-item form-control" />
                                </div>
                            </div>

                            <div className="col-sm-12 col-md-1">
                                <div class="select-component-container">
                                    <button type="submit" className="btn btn-primary btn-md" style={{ marginTop: 35 }}>Search</button>
                                </div>
                            </div>

                        </div>
                    </form>
                    <div id="example1_wrapper" className="dataTables_wrapper dt-bootstrap4">
                    <Table className='table table-bordered table-striped table-hover dataTable dtr-inline'>
                        <thead>
                            <tr>
                                <th className="sorting sorting_asc" tabindex="0" aria-controls="example1" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Clock In Date">Clock In Date</th>
                                <th className="sorting sorting_desc" tabindex="0" aria-controls="example1" rowspan="1" colspan="1" aria-sort="descending" aria-label="Clock In Time">Clock In Time</th>
                                <th className="sorting sorting_asc" tabindex="0" aria-controls="example1" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Clock Out Date">Clock Out Date</th>
                                <th className="sorting sorting_desc" tabindex="0" aria-controls="example1" rowspan="1" colspan="1" aria-sort="descending" aria-label="Clock Out Time">Clock Out Time</th>
                                <th className="sorting sorting_desc" tabindex="0" aria-controls="example1" rowspan="1" colspan="1" aria-sort="descending" aria-label="Difference">Difference</th>

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
                    </div>
                </Card>
            </Container>
        </div>
    );
};

AttendanceList.propTypes = {

};

export default AttendanceList;