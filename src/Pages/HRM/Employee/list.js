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
        <div style={{ minHeight: "100vh", backgroundImage: backgroundColor }}>
            <ManagerAppBar drawerOption={"open"} location="Home" />
            <Container className='employee-form-container'>
                <Card className='employee-form-card-container'>
                    <div className='employee-list-add-btn'>
                        <Link to={'/HRM/Create/Employee'}>
                            <CustomButton title={'Add Employee'} size="sm" />
                        </Link>
                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Middle Name</th>
                                <th>Last Name</th>
                                <th>Gender</th>
                                <th>Company</th>
                                {/* <th>Designation</th> */}
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                profiles.map((item, index) => {
                                    const { FirstName, MiddleName, LastName, Gender, Phone, EmployeeId, id, Company_Details } = item;
                                    return (
                                        <tr key={index}>
                                            <td>{EmployeeId}</td>
                                            <td>{FirstName}</td>
                                            <td>{MiddleName}</td>
                                            <td>{LastName}</td>
                                            <td>{Gender?.Description}</td>
                                            <td>{getCompanyObject(Company_Details)}</td>
                                            {/* <td>{'Designation'}</td> */}
                                            <td>
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
                    <Pagination />
                </Card>
            </Container>
        </div>
    );
};

EmployeeList.propTypes = {

};

export default EmployeeList;