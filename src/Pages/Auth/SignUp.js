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
        <div style={{ minHeight: "100vh", backgroundImage: backgroundColor }}>
        <div class="container">
            <Form>
                <Form.Group size="lg" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    autoFocus
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                </Form.Group>

                <Form.Group size="lg" controlId="employeeNumber">
                <Form.Label>Employee Number</Form.Label>
                <Form.Control
                    autoFocus
                    type="text"
                    value={employeeNumber}
                    onChange={(e) => setEmployeeNumber(e.target.value)}
                />
                </Form.Group>

                <Form.Group size="lg" controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                    autoFocus
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                </Form.Group>

                <Form.Group size="lg" controlId="surName">
                <Form.Label>Surname</Form.Label>
                <Form.Control
                    autoFocus
                    type="text"
                    value={surName}
                    onChange={(e) => setSurName(e.target.value)}
                />
                </Form.Group>

                <Form.Group size="lg" controlId="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                    autoFocus
                    type="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                </Form.Group>

                <Form.Group size="lg" controlId="timezone">
                <Form.Label>Timezone</Form.Label>
                <Select name={'timezone'} id={'timezone'} options={lookups?.timezone} onChange={(name, value) => setTimezone(value)} />
                {/* <Form.Control
                    autoFocus
                    type="timezone"
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                /> */}
                </Form.Group>

                <Button block="true" size="lg" type="submit" disabled={!validateForm()} onClick={handleSubmitNonCpcgrSignUp}>
                Sign Up
                </Button>
            </Form>
        </div>
        </div>
    );
}

export default SignUp;