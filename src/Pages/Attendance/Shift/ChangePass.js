import React, { useEffect, useState } from 'react';
import { Card, Container, Table } from 'react-bootstrap';
import ManagerAppBar from '../../../components/ManagerAppBar';
import { backgroundColor } from '../../../Constants';
import { Edit, Delete } from "@material-ui/icons";
import CustomButton from '../../../components/employee-profiling/form/Button';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { Button } from "@material-ui/core";
import { userActions } from '../../../redux/actions';
import { alertActions } from "../../../redux/actions";
//import { setCookieOid, setCookieNonCpcgrAuth, setLocalStorage, getLocalStorage, isSuccess, getObjWithProfileId } from "../helpers/utils";

import Form from "react-bootstrap/Form";
const ChangePass = props => {

        const { error, isVerified, StatusCode, requestType, newtoken } = useSelector(state => state.users);
   
        const [showSignUpForm, setShowSignUpForm] = React.useState(false);
        const [showLoginForm, setShowLoginForm] = React.useState(false);
        const [email, setEmail] = useState("");
        const [password, setOldPassword] = useState("");
        const [newPassword, setNewPassword] = useState("");
        const [confirmPassword, setConfirmPassword] = useState("");
        const [employeeNumber, setEmployeeNumber] = useState("");
        const [firstName, setFirstName] = useState("");
        const [surName, setSurName] = useState("");
        const [phone, setPhone] = useState("");
        const dispatch = useDispatch();
    
        useEffect(() => {
    
            //const token = getLocalStorage('token');
            const email = 'admin@gmail.com';
            
            //dispatch(userActions.confirmTokenAction({ token: token }))
            console.log(error, 555)
        }, [])
    
        const validateForm = () => {
            return email.length > 0 && password.length > 0;
        };
    
        const redirectToDashboard = () => {
            window.location.href = '/Home';
        }
    
        // const getPersonalDetailOfLogger = () => {
        //     dispatch(hrModuleActions.getProfileByUserProfileIdAction(redirectToDashboard));
        // }
    
        const handleChangePassword = (event) => {
            event.preventDefault();
            console.log(event)
            dispatch(userActions.changePasswordAction({
                newPassword: password,
                newPassword: newPassword,
                confirmPassword: confirmPassword
                // token: getLocalStorage('token'),
                // employeeNumber: getLocalStorage('userProfileId')
            }));
        };

    return (
        <div style={{ height: "800px", backgroundColor: "#f4f4f4", overflow: "scroll" }}>
            <ManagerAppBar drawerOption={"open"} location="/Attendance/ChangePass" />

            <Container className='employee-form-container'>
                {/* <div className='main-dashboard col-sm-12'>
                    <h3 className="mb-3" style={{ textAlign: "left" }}>Change Password</h3>
                </div> */}
                <Card className='employee-form-card-container mb-3'>
                <Form className="card change-pass col-sm-12 mx-auto d-flex justify-content-center align-items-center" style={{ minHeight: "500px", backgroundColor: 'white' }}>
                        
                        <h2 className="mt-3 mb-4">Change Password</h2>
                        <Form.Group className="mb-4 col-sm-4 mx-auto" size="lg" controlId="password">
                            <Form.Control
                                type="password"
                                placeholder={'Enter Old Password'}
                                value={password}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-4 col-sm-4 mx-auto" size="lg" controlId="password">
                            <Form.Control
                                type="password"
                                placeholder={'Set New Password'}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-4 col-sm-4 mx-auto" size="lg" controlId="password">
                            <Form.Control
                                type="password"
                                placeholder={'Confirm Password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Button className="col-sm-4 mx-auto primary-btn mb-3" block="true" size="md" type="submit" onClick={handleChangePassword}>
                            Set New Password
                        </Button>
                        {alert.message &&
                        <div className="container alert-container">
                        <div className={`alert ${alert.type}`}>{alert.message}</div>
                        </div>
                    }

                    </Form>

                    
                </Card>
            </Container>
        </div>
    );
};

ChangePass.propTypes = {

};

export default ChangePass;

