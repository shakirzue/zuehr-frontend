import React, { useEffect, useState } from 'react';
import { Card, Container, Table } from 'react-bootstrap';
import ManagerAppBar from '../../../components/ManagerAppBar';
import { backgroundColor } from '../../../Constants';
import { Edit, Delete } from "@material-ui/icons";
import CustomButton from '../../../components/employee-profiling/form/Button';
import { Link } from 'react-router-dom';
import Pagination from '../../../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { hrModuleActions } from '../../../redux/actions';
import _ from 'lodash';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import PrintIcon from '@material-ui/icons/Print';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
const ShiftList = props => {

    const [shifts, setProfiles] = useState([]);

    const dispatch = useDispatch();

    const __shifts = useSelector(state => state.hrModule.shiftDetails);

    useEffect(() => {
        dispatch(hrModuleActions.getUserPersonalDetailsAction())
    }, [])

    useEffect(() => {
        if (!_.isEmpty(__shifts) && _.isObject(__shifts)) {
            setProfiles(__shifts)
        }

    }, [__shifts])

    const getCompanyObject = (array) => {
        if (_.isArray(array) && array.length > 0) {
            let desgination = array[0].Designation;
            return desgination ? desgination.Description : '';
        }

        return '';
    }

    return (
        <div style={{ height: "800px", backgroundColor: "#f4f4f4", overflow: "scroll" }}>
            <ManagerAppBar drawerOption={"open"} location="/HRM/Employee" />

            <Container className='employee-form-container'>
                <div className='main-dashboard col-sm-12'>
                    <h3 className="mb-3" style={{ textAlign: "left" }}>Shift Listing</h3>
                </div>
                <Card className='employee-form-card-container mb-3'>
                    <div className='employee-list-add-btn d-flex pr-1'>
                        <Link to={'/Attendance/AssignShift'}>
                            <CustomButton className="btn-transparent mb-4 mr-1" title={'Assign'} size="" />
                        </Link>
                        <Link to={'/Attendance/CreateShift'}>
                            <CustomButton className="btn-transparent mb-4 ml-1" title={'Add Shift'} size="" />
                        </Link>
                    </div>


                    <div id="example1_wrapper1" className="dataTables_wrapper dt-bootstrap4 mb-4">
                        <div className="row">
                            <div className="col-md-3 d-flex">
                                <div class="dt-buttons btn-group">
                                <button class="btn btn-print buttons-excel buttons-html5 bg-transparent" tabindex="0" aria-controls="example1" type="button"><span><div class="print-btn"><LibraryBooksIcon /><span className='print-btntext'>Excel</span></div></span></button> 
                                <button class="btn btn-print buttons-pdf buttons-html5 bg-transparent" tabindex="0" aria-controls="example1" type="button"><span><div class="print-btn"><PictureAsPdfIcon /><span className='print-btntext'>PDF</span></div></span></button> 
                                <button class="btn btn-print buttons-print bg-transparent" tabindex="0" aria-controls="example1" type="button"><span><div class="print-btn"><PrintIcon /><span className='print-btntext'>Print</span></div></span></button> 
                                </div>
                            </div>
                            <div className="col-md-6 d-flex"></div>
                            <div className="col-md-3 d-flex pl-5 pr-0">

                                <div id="filter" class="dataTables_filter">
                                    <label>Search:<input type="search" class="form-control form-control-sm" placeholder="" aria-controls="example1" /></label>
                                </div>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <table id="example11" className="table table-bordered table-hover dataTable dtr-inline mb-3" aria-describedby="example1_info">
                                    <thead>
                                        <tr>
                                            <th className="sorting sorting_asc" tabindex="0" aria-controls="example1" rowspan="1" colspan="1" aria-label="Browser: activate to sort column ascending">Shift Title</th>
                                            <th className="sorting" tabindex="0" aria-controls="example1" rowspan="1" colspan="1" aria-label="Platform(s): activate to sort column ascending">Validity</th>
                                            <th className="sorting" tabindex="0" aria-controls="example1" rowspan="1" colspan="1" aria-label="Platform(s): activate to sort column ascending">Status</th>
                                            <th className="sorting" tabindex="0" aria-controls="example1" rowspan="1" colspan="1" aria-label="Platform(s): activate to sort column ascending">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="sorting_1 dtr-control">IT Shift</td>
                                            <td class="sorting_1 dtr-control w-50">11:00 AM to 8:00 PM</td>
                                            <td class="sorting_1 dtr-control" style={{ color: "#28cc28" }}>Active </td>
                                            <td class="sorting_1 dtr-control">
                                                {/* <Link to={`/HRM/Edit/Shift/${EmployeeId}`}> */}
                                                <Link to={`/HRM/Edit/Shift`}>
                                                    <Edit /><Delete />
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="sorting_1 dtr-control">Non Voice Team</td>
                                            <td class="sorting_1 dtr-control">09:00 AM to 6:00 PM</td>
                                            <td class="sorting_1 dtr-control" style={{ color: "#28cc28" }}>Active </td>
                                            <td class="sorting_1 dtr-control">
                                                {/* <Link to={`/HRM/Edit/Shift/${EmployeeId}`}> */}
                                                <Link to={`/HRM/Edit/Shift`}>
                                                    <Edit /><Delete />
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="sorting_1 dtr-control">Voice Team</td>
                                            <td class="sorting_1 dtr-control">09:00 AM to 6:00 PM</td>
                                            <td class="sorting_1 dtr-control">InActive </td>
                                            <td class="sorting_1 dtr-control">
                                                {/* <Link to={`/HRM/Edit/Shift/${EmployeeId}`}> */}
                                                <Link to={`/HRM/Edit/Shift`}>
                                                    <Edit /><Delete />
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="sorting_1 dtr-control">IT Shift</td>
                                            <td class="sorting_1 dtr-control w-50">11:00 AM to 8:00 PM</td>
                                            <td class="sorting_1 dtr-control" style={{ color: "#28cc28" }}>Active </td>
                                            <td class="sorting_1 dtr-control">
                                                {/* <Link to={`/HRM/Edit/Shift/${EmployeeId}`}> */}
                                                <Link to={`/HRM/Edit/Shift`}>
                                                    <Edit /><Delete />
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="sorting_1 dtr-control">IT Shift</td>
                                            <td class="sorting_1 dtr-control w-50">11:00 AM to 8:00 PM</td>
                                            <td class="sorting_1 dtr-control" style={{ color: "#28cc28" }}>Active </td>
                                            <td class="sorting_1 dtr-control">
                                                {/* <Link to={`/HRM/Edit/Shift/${EmployeeId}`}> */}
                                                <Link to={`/HRM/Edit/Shift`}>
                                                    <Edit /><Delete />
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="sorting_1 dtr-control">IT Shift</td>
                                            <td class="sorting_1 dtr-control w-50">11:00 AM to 8:00 PM</td>
                                            <td class="sorting_1 dtr-control" style={{ color: "#28cc28" }}>Active </td>
                                            <td class="sorting_1 dtr-control">
                                                {/* <Link to={`/HRM/Edit/Shift/${EmployeeId}`}> */}
                                                <Link to={`/HRM/Edit/Shift`}>
                                                    <Edit /><Delete />
                                                </Link>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <Pagination />
                </Card>
            </Container>
        </div>
    );
};

ShiftList.propTypes = {

};

export default ShiftList;

