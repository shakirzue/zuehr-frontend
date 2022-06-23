import React, { useState } from 'react';
import { backgroundColor } from "../Constants";
import ManagerAppbar from "../components/ManagerAppBar";
import logo from "../Images/logo.png";
import { useDispatch } from "react-redux";
import { userActions, hrModuleActions } from '../redux/actions';
import { Button } from "@material-ui/core";
import { getCookieNonCpcgrAuth } from "../helpers/utils";
import { authenticationService } from "../services/authentication.service";
import Form from "react-bootstrap/Form";

const HomePage = (props) => {
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

    // const handleLogin = () => {
    //     setShowSignUpForm(false);
    // };

    const handleNonCpcgrSignUp = () => {
        authenticationService.SignUp();
        // if(!showSignUpForm){
        //     setShowSignUpForm(true);
        //     setShowLoginForm(false);
        // }
        // else
        //     setShowSignUpForm(false)
        //activeDirectoryService.signIn(instance);
        //dispatch(userActions.createNonCpcgrUserProfileAction({}))
    };

    const handleNonCpcgrLogin = () => {
        authenticationService.Login();
        // if(!showLoginForm){
        //     setShowLoginForm(true);
        //     setShowSignUpForm(false)
        // }
        // else
        //     setShowLoginForm(false)
    };

    // const validateForm = ()=> {
    //     return email.length > 0 && password.length > 0;
    // };
    
    // const redirectToDashboard = ()=>{
    //     window.location.reload();
    // }

    // const getPersonalDetailOfLogger = ()=>{
    //     dispatch(hrModuleActions.getProfileByUserProfileIdAction());
    // }

    // const handleSubmitNonCpcgrSignUp = (event)=> {
    //     event.preventDefault();

    //     dispatch(userActions.createNonCpcgrUserProfileAction({email: email,
    //                                                         password: password,
    //                                                         firstName: firstName,
    //                                                         surName: surName,
    //                                                         phone: phone,
    //                                                         employeeNumber: employeeNumber}, redirectToDashboard));
        
    // };
    
    // const handleSubmitNonCpcgrLogin = (event)=> {
    //     event.preventDefault();

    //     dispatch(userActions.loginNonCpcgrUserProfileAction({email: email,
    //                                                         password: password
    //                                                          },getPersonalDetailOfLogger));
        
    // };


    return (
        <div className="width-set-cont" style={{ minHeight: "100vh", backgroundImage: backgroundColor }}>
            {   isAuthenticated ? <>
                <ManagerAppbar drawerOption="open" location="Home" />
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        
                    }}
                >
                    <p style={{ fontSize: 14, marginLeft: -50 }} autoCapitalize>
                        Click on the left Navigation bar to continue hello 123
                    </p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
                    <img
                        src={logo}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            // paddingLeft: 50,
                        }}
                        alt="CPCGR LOGO"
                    />
                    <div class="hello-world">
                    <h2><a href="www.google.com">Hello World</a></h2>
                    
                    </div>
                </div>
                </>
                :<>  
                <div className="hello">         
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNonCpcgrSignUp}
                    style={{ alignSelf: "center" }}
                >
                   Non CPCGR Sign Up
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNonCpcgrLogin}
                    style={{ alignSelf: "center" }}
                >
                   Non CPCGR Login
                </Button>
                </div>    
                </>
            }
        </div>
    );
}

export default HomePage;