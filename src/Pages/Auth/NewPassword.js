import React, { useEffect, useState } from 'react';
import { backgroundColor } from "../../Constants";
import ManagerAppbar from "../../components/ManagerAppBar";
import logo from "../../Images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { userActions, hrModuleActions } from '../../redux/actions';
import { Button } from "@material-ui/core";
import { getCookieNonCpcgrAuth } from "../../helpers/utils";
import Form from "react-bootstrap/Form";
import { setCookieOid, setCookieNonCpcgrAuth, setLocalStorage, getLocalStorage, isSuccess, getObjWithProfileId } from "../../helpers/utils";


const Login = (props) => {

    const { error, isVerified, StatusCode, requestType, newtoken } = useSelector(state => state.users);
    var isAuthenticated = getCookieNonCpcgrAuth();

    const [showSignUpForm, setShowSignUpForm] = React.useState(false);
    const [showLoginForm, setShowLoginForm] = React.useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [employeeNumber, setEmployeeNumber] = useState("");
    const [firstName, setFirstName] = useState("");
    const [surName, setSurName] = useState("");
    const [phone, setPhone] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {

        const token = getLocalStorage('token');
        const email = 'admin@gmail.com';
        
        dispatch(userActions.confirmTokenAction({ token: token }))
        console.log(error, 555)
    }, [error])
 
    const validateForm = () => {
        return email.length > 0 && password.length > 0;
    };

    const redirectToDashboard = () => {
        window.location.href = '/Login';
    }

    const getPersonalDetailOfLogger = () => {
        dispatch(hrModuleActions.getProfileByUserProfileIdAction(redirectToDashboard));
    }


    const handleConfirmPassword = (event) => {
        event.preventDefault();
        console.log(event)
        dispatch(userActions.forgetPasswordAction({
            newPassword: password,
            confirmPassword: confirmPassword,
            token: getLocalStorage('token'),
            employeeNumber: getLocalStorage('userProfileId')
        }));
    };



    return (
        <div className="login-background" style={{
            minHeight: "100vh", backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }}>
            <div className="container">
                <div class="row">
                    <div class="mt-5 d-flex justify-content-center align-items-center hrms-head col-sm-8">
                        <h1 class="mt-5">Welcome to HRMS</h1>
                    </div>


                    <Form className="card col-sm-4 mx-auto d-flex justify-content-center align-items-center" style={{ minHeight: "500px", backgroundColor: 'white' }}>
                        <img src={logo} alt="Zue logo" width="35%" />
                        <h2 className="mt-3 mb-5">New Password</h2>
                        <Form.Group className="mb-3 col-sm-8" size="lg" controlId="password">
                            <Form.Control
                                type="password"
                                placeholder={'Enter New Password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3 col-sm-8" size="lg" controlId="password">
                            <Form.Control
                                type="password"
                                placeholder={'Confirm Password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Button className="col-sm-8 primary-btn mb-3" block="true" size="md" type="submit" onClick={handleConfirmPassword}>
                            Set Password
                        </Button>
                        {<div class="reg mb-3">
                            Know Previous Password? <a href="/">Sign In</a>
                        </div>}

                        <div>
                    <p style={{color: "red"}}><b>{error}</b></p>
                </div>
                    </Form>

                </div>

            </div>
        </div>
    );
}

export default Login;