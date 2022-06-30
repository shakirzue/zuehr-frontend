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
            <ManagerAppBar drawerOption={""} location="/HRM/Employee" />

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
                                
                            </div>
                            <div className="col-sm-12 col-md-6">
                         
                            {/* <div id="filter" class="dataTables_filter">
                                <label>Search:<input type="search" class="form-control form-control-sm" placeholder="" aria-controls="example1"/></label>
                                </div>
                          
                            </div> */}
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <table id="example1" className="table table-bordered table-hover dataTable dtr-inline" aria-describedby="example1_info">
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


                                        <tr class="odd">
                                            <td class="sorting_1 dtr-control">1</td>
                                            <td>Netscape 7.2</td>
                                            <td>Win 95+ / Mac OS 8.6-9.2</td>
                                            <td>1.7</td>
                                            <td>A</td>
                                            <td>A</td>
                                            <td class="sorting_1 dtr-control">
                                                <Link to={'#'}>
                                                    <Edit />
                                                </Link>
                                                <Link to={'#'}>
                                                    <Delete />
                                                </Link>
                                            </td>
                                        </tr><tr class="even">
                                            <td class="sorting_1 dtr-control">2</td>
                                            <td>Netscape Browser 8</td>
                                            <td>Win 98SE+</td>
                                            <td>1.7</td>
                                            <td>A</td>
                                            <td>A</td>
                                            <td class="sorting_1 dtr-control">
                                                <Link to={'#'}>
                                                    <Edit />
                                                </Link>
                                                <Link to={'#'}>
                                                    <Delete />
                                                </Link>
                                            </td>
                                        </tr><tr class="odd">
                                            <td class="sorting_1 dtr-control">3</td>
                                            <td>Netscape Navigator 9</td>
                                            <td>Win 98+ / OSX.2+</td>
                                            <td>1.8</td>
                                            <td>A</td>
                                            <td>A</td>
                                            <td class="sorting_1 dtr-control">
                                                <Link to={'#'}>
                                                    <Edit />
                                                </Link>
                                                <Link to={'#'}>
                                                    <Delete />
                                                </Link>
                                            </td>
                                        </tr><tr class="even">
                                            <td class="sorting_1 dtr-control">4</td>
                                            <td>Mozilla 1.0</td>
                                            <td>Win 95+ / OSX.1+</td>
                                            <td>1</td>
                                            <td>A</td>
                                            <td>A</td>
                                            <td class="sorting_1 dtr-control">
                                                <Link to={'#'}>
                                                    <Edit />
                                                </Link>
                                                <Link to={'#'}>
                                                    <Delete />
                                                </Link>
                                            </td>
                                        </tr>

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