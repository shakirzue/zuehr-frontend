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

    const validateForm = ()=> {
        return email.length > 0 && password.length > 0;
    };

    const redirectToDashboard = ()=>{
        window.location.href = '/';
    }

    const getPersonalDetailOfLogger = ()=>{
        dispatch(hrModuleActions.getProfileByUserProfileIdAction(redirectToDashboard));
    }

    
    const handleSubmitNonCpcgrLogin = (event)=> {
        event.preventDefault();

        dispatch(userActions.loginNonCpcgrUserProfileAction({email: email,
                                                            password: password
                                                             },getPersonalDetailOfLogger));
        
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

            <Button block="true" size="lg" type="submit" disabled={!validateForm()} onClick={handleSubmitNonCpcgrLogin}>
                    Login
            </Button>
            </Form>
        </div>
        </div>
    );
}

export default Login;