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
const EmployeeList = props => {

    const [profiles, setProfiles] = useState([]);

    const dispatch = useDispatch();

    const __profiles = useSelector(state => state.hrModule.profileDetails);

    useEffect(() => {
        dispatch(hrModuleActions.getUserPersonalDetailsAction())
    }, [])

    useEffect(() => {
        if (!_.isEmpty(__profiles) && _.isObject(__profiles)) {
            setProfiles(__profiles)
        }

    }, [__profiles])

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
                    <h3 className="mb-3" style={{ textAlign: "left" }}>Employee List</h3>
                </div>
                <Card className='employee-form-card-container'>
                    <div className='employee-list-add-btn row pr-4'>
                        <Link to={'/HRM/Create/Employee'}>
                            <CustomButton className="btn-transparent" title={'Add Employee'} size="" />
                        </Link>
                    </div>

                    {/* 
                        <div id="example1_wrapper" className="dataTables_wrapper dt-bootstrap4">

                            <div className="row">
                                <div className="col-sm-12 col-md-6">

                                </div>
                                <div className="col-sm-12 col-md-6">
                                  
                                </div>
                            </div>
                            <div className='row'>
                              
                                <Table id="example1" className="table table-bordered table-striped dataTable dtr-inline" aria-describedby="example1_info">
                                    <thead>
                              
                                        <tr>
                                            <th className="sorting sorting_asc" tabindex="0" aria-controls="example1" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Rendering engine: activate to sort column descending">#</th>
                                            <th className="sorting" tabindex="0" aria-controls="example1" rowspan="1" colspan="1" aria-label="Browser: activate to sort column ascending">First Name</th>
                                            <th className="sorting" tabindex="0" aria-controls="example1" rowspan="1" colspan="1" aria-label="Platform(s): activate to sort column ascending">Middle Name</th>
                                            <th className="sorting" tabindex="0" aria-controls="example1" rowspan="1" colspan="1" aria-label="Engine version: activate to sort column ascending">Last Name</th>
                                            <th className="sorting" tabindex="0" aria-controls="example1" rowspan="1" colspan="1" aria-label="CSS grade: activate to sort column ascending">Gender</th>
                                            <th className="sorting" tabindex="0" aria-controls="example1" rowspan="1" colspan="1" aria-label="Platform(s): activate to sort column ascending">Company</th>
                                            <th className="sorting" tabindex="0" aria-controls="example1" rowspan="1" colspan="1" aria-label="Platform(s): activate to sort column ascending">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            profiles.map((item, index) => {
                                                const { FirstName, MiddleName, LastName, Gender, Phone, EmployeeId, id, Company_Details } = item;
                                                return (
                                                    
                                                    <tr class="odd" key={index}>
                                                        <td class="sorting_1 dtr-control">{EmployeeId}</td>
                                                        <td class="sorting_1 dtr-control">{FirstName}</td>
                                                        <td class="sorting_1 dtr-control">{MiddleName}</td>
                                                        <td class="sorting_1 dtr-control">{LastName}</td>
                                                        <td class="sorting_1 dtr-control">{Gender?.Description}</td>
                                                        <td class="sorting_1 dtr-control">{getCompanyObject(Company_Details)}</td>
                                                        <td class="sorting_1 dtr-control">
                                                            <Link to={`/HRM/Edit/Employee/${EmployeeId}`}>
                                                                <Edit />
                                                            </Link>
                                                            <Link to={'#'}>
                                                                <Delete />
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                    
                                                )
                                            })
                                        }
                                    </tbody>

                                </Table>
                            </div>
                        </div>   */}




                    <div id="example1_wrapper" className="dataTables_wrapper dt-bootstrap4">
                        <div className="row">
                             <div className="col-sm-12 col-md-6 d-flex">
                            {/*<div class="dt-buttons btn-group d-flex">   
                                <button class="btn btn-print buttons-excel buttons-html5 bg-transparent" tabindex="0" aria-controls="example1" type="button"><span><div class="print-btn"><LibraryBooksIcon /><span className='print-btntext'>Excel</span></div></span></button> 
                                <button class="btn btn-print buttons-pdf buttons-html5 bg-transparent" tabindex="0" aria-controls="example1" type="button"><span><div class="print-btn"><PictureAsPdfIcon /><span className='print-btntext'>PDF</span></div></span></button> 
                                <button class="btn btn-print buttons-print bg-transparent" tabindex="0" aria-controls="example1" type="button"><span><div class="print-btn"><PrintIcon /><span className='print-btntext'>Print</span></div></span></button> 
                                 </div> */}
                            </div>
                            <div className="col-sm-12 col-md-6">
                         
                            {/* <div id="filter" class="dataTables_filter">
                                <label>Search:<input type="search" class="form-control form-control-sm" placeholder="" aria-controls="example1"/></label>
                                </div>
                          
                            </div> */}
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <table id="example1" className="table table-bordered table-striped table-hover dataTable dtr-inline" aria-describedby="example1_info">
                                    <thead>

                                        <tr>
                                            <th className="sorting sorting_asc" tabindex="0" aria-controls="example1" rowspan="1" colspan="1" aria-label="Browser: activate to sort column ascending">Employee Code</th>
                                            <th className="sorting" tabindex="0" aria-controls="example1" rowspan="1" colspan="1" aria-label="Platform(s): activate to sort column ascending">Name</th>
                                            <th className="sorting" tabindex="0" aria-controls="example1" rowspan="1" colspan="1" aria-label="Engine version: activate to sort column ascending">Company</th>
                                            <th className="sorting" tabindex="0" aria-controls="example1" rowspan="1" colspan="1" aria-label="CSS grade: activate to sort column ascending">Department</th>
                                            <th className="sorting" tabindex="0" aria-controls="example1" rowspan="1" colspan="1" aria-label="Platform(s): activate to sort column ascending">Date of Joining</th>
                                            <th className="sorting" tabindex="0" aria-controls="example1" rowspan="1" colspan="1" aria-label="Platform(s): activate to sort column ascending">Status</th>
                                            <th className="sorting" tabindex="0" aria-controls="example1" rowspan="1" colspan="1" aria-label="Platform(s): activate to sort column ascending">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            profiles.map((item, index) => {
                                                const { FirstName, MiddleName, Department,DateOfBirth,LastName, Gender, Phone, EmployeeId, id, Company_Details } = item;
                                                return (
                                                    
                                                    <tr key={index}>
                                                        <td class="sorting_1 dtr-control">{EmployeeId}</td>
                                                        <td class="sorting_1 dtr-control">{FirstName}</td>
                                                        <td class="sorting_1 dtr-control">{getCompanyObject(Company_Details)}</td>
                                                        <td class="sorting_1 dtr-control">{Department}</td>
                                                        <td class="sorting_1 dtr-control">{DateOfBirth}</td>
                                                        <td class="sorting_1 dtr-control" style={{ color: "#28cc28" }}>Active </td>
                                                        <td class="sorting_1 dtr-control">
                                                            <Link to={`/HRM/Edit/Employee/${EmployeeId}`}>
                                                                <Edit />
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                    
                                                )
                                            })
                                        }
                                    </tbody>

                                </table>

                            </div>
                        </div>
                    </div>
                    </div>
                    {/* <Pagination /> */}
                </Card>
            </Container>
        </div>
    );
};

EmployeeList.propTypes = {

};

export default EmployeeList;

