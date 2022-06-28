import React, { useState } from 'react';
import { backgroundColor } from "../../Constants";
import ManagerAppbar from "../../components/ManagerAppBar";
import logo from "../../Images/logo.png";
import { useDispatch } from "react-redux";
import { userActions, hrModuleActions } from '../../redux/actions';
import { Button } from "@material-ui/core";
import { getCookieNonCpcgrAuth } from "../../helpers/utils";
import Form from "react-bootstrap/Form";


const Login = (props) => {
    var isAuthenticated = getCookieNonCpcgrAuth();

    const [showSignUpForm, setShowSignUpForm] = React.useState(false);
    const [showLoginForm, setShowLoginForm] = React.useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [employeeNumber, setEmployeeNumber] = useState("");
    const [firstName, setFirstName] = useState("");
    const [surName, setSurName] = useState("");
    const [phone, setPhone] = useState("");
    const dispatch = useDispatch();

    const validateForm = () => {
        return email.length > 0 && password.length > 0;
    };

    const redirectToDashboard = () => {
        window.location.href = '/Forget';
    }

    const getPersonalDetailOfLogger = () => {
        dispatch(hrModuleActions.getProfileByUserProfileIdAction(redirectToDashboard));
    }


    const handleSubmitNonCpcgrLogin = (event) => {
        event.preventDefault();

        dispatch(userActions.loginNonCpcgrUserProfileAction({
            email: email,
            password: password
        }, getPersonalDetailOfLogger));

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
                        <h2 className="mt-3 mb-5">Forget Password</h2>
                        <Form.Group className="mb-3 col-sm-8" size="lg" controlId="email">

                            <Form.Control
                                autoFocus
                                type="email"
                                placeholder={'Enter Email or ID'}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>


                        <Button className="col-sm-8 primary-btn mb-3" block="true" size="lg" type="submit" disabled={!validateForm()} onClick={handleSubmitNonCpcgrLogin}>
                            Reset Password
                        </Button>
                        {<div class="reg mb-3">
                            Have an Account? <a href="/">Sign In</a>
                        </div>}
                    </Form>

                </div>

            </div>
        </div>
    );
}

export default Login;