import { backgroundColor } from "../../Constants";
import ManagerAppbar from "../../components/ManagerAppBar";
import logo from "../../Images/logo.png";
import { userActions, hrModuleActions } from '../../redux/actions';
import { getCookieNonCpcgrAuth } from "../../helpers/utils";
import Select from '../../components/employee-profiling/form/Select';

import React, { useState } from 'react';
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";

const SignUp = (props) => {
    var isAuthenticated = getCookieNonCpcgrAuth();

    const [showSignUpForm, setShowSignUpForm] = React.useState(false);
    const [showLoginForm, setShowLoginForm] = React.useState(false);    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [employeeNumber, setEmployeeNumber] = useState("");
    const [firstName, setFirstName] = useState("");
    const [surName, setSurName] = useState("");
    const [phone, setPhone] = useState("");
    const [timezone, setTimezone] = useState("");
    const dispatch = useDispatch();

    const lookups = useSelector(state => state.hrModule.lookups);

    const validateForm = ()=> {
        return email.length > 0 && password.length > 0;
    };
    
    const redirectToDashboard = ()=>{
        window.location.href = '/';
    }


    const handleSubmitNonCpcgrSignUp = (event)=> {
        event.preventDefault();

        dispatch(userActions.createNonCpcgrUserProfileAction({
                                                            email: email,
                                                            password: password,
                                                            firstName: firstName,
                                                            surName: surName,
                                                            phone: phone,
                                                            employeeNumber: employeeNumber,
                                                            timezone: timezone}, redirectToDashboard));
        
    };

    return (
        <div className="login-background" style={{ minHeight: "100vh", backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat' }}>
        <div className="container">
            <div class="row">
                <div class="mt-5 d-flex justify-content-center align-items-center hrms-head col-sm-8">
                    <h1 class="mt-5">Welcome to HRMS</h1>
                </div>
            <Form className="card sign-up col-sm-4 mx-auto d-flex justify-content-center align-items-center" style={{ minHeight: "600px", backgroundColor: 'white' }}>
            <img src={logo} alt="Zue logo" width="35%"/>
            <h2 className="mb-3">Sign Up</h2>
                <Form.Group className="mb-3 col-sm-8" size="lg" controlId="email">
               
                <Form.Control
                    autoFocus
                    type="email"
                    placeholder={'Email Address*'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </Form.Group>
                <Form.Group className="mb-3 col-sm-8" size="lg" controlId="password">
               
                <Form.Control
                    type="password"
                    placeholder={'Set Password*'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                </Form.Group>

                <Form.Group className="mb-3 col-sm-8" size="lg" controlId="employeeNumber">
               
                <Form.Control
                    autoFocus
                    type="text"
                    placeholder={'Enter Employee ID*'}
                    value={employeeNumber}
                    onChange={(e) => setEmployeeNumber(e.target.value)}
                />
                </Form.Group>

                <Form.Group className="mb-3 col-sm-8" size="lg" controlId="firstName">
             
                <Form.Control
                    autoFocus
                    type="text"
                    placeholder={'First Name*'}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                </Form.Group>

                <Form.Group className="col-sm-8" size="lg" controlId="surName">
        
                <Form.Control
                    autoFocus
                    type="text"
                    placeholder={'Last Name*'}
                    value={surName}
                    onChange={(e) => setSurName(e.target.value)}
                />
                </Form.Group>

                {/* <Form.Group className="mb-3 col-sm-8" size="lg" controlId="phone"> */}
          
                {/* <Form.Control
                    autoFocus
                    type="phone"
                    placeholder={'Phone Number*'}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                /> */}
                {/* </Form.Group> */}

                <Form.Group className="col-sm-8" size="lg" controlId="timezone">
       
                <Select name={'timezone'} id={'timezone'} options={lookups?.timezone} onChange={(name, value) => setTimezone(value)} />
                {/* <Form.Control
                    autoFocus
                    type="timezone"
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                /> */}
                </Form.Group>

                <Button className="col-sm-8 primary-btn mb-3" block="true" size="lg" type="submit" disabled={!validateForm()} onClick={handleSubmitNonCpcgrSignUp}>
                Sign Up
                </Button>
                <div class="reg mb-3">
                    Already have an account? <a href="/">Login</a>
                </div>
            </Form>
            </div>
        </div>
        </div>
    );
}

export default SignUp;