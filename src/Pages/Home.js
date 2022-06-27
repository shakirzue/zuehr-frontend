import React, { useState } from 'react';
import { backgroundColor } from "../Constants";
import ManagerAppbar from "../components/ManagerAppBar";
import logo from "../Images/logo.png";
import { useDispatch } from "react-redux";
import { userActions, hrModuleActions } from '../redux/actions';
import { Button } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { getCookieNonCpcgrAuth } from "../helpers/utils";
import { authenticationService } from "../services/authentication.service";
import Form from "react-bootstrap/Form";
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';


const HomePage = (props) => {
    const state = {
        labels: ['January', 'February', 'March',
            'April'],
        datasets: [
            {
                label: 'Employees',
                fill: false,
                lineTension: 0.5,
                backgroundColor: '#223067',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                borderRadius: 8,
                data: [65, 59, 70, 71]
            }
        ]
    }



    const statee = {
        labels: ['January', 'February', 'March',
            'April'],
        datasets: [
            {
                label: 'Managers',
                fill: false,
                lineTension: 0.5,
                backgroundColor: '#016735',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                borderRadius: 8,
                data: [11, 19, 20, 16]
            }
        ]
    }

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
        <div className="width-set-cont" style={{ height: "100vh", overflow: "scroll", backgroundColor: "#fff" }}>
            {isAuthenticated ? <>
                <ManagerAppbar drawerOption="open" location="Home" />
                <div className='container'>
                    <div className='main-dashboard col-sm-12 pt-3'>
                        <h3 style={{ textAlign: "left" }}>Dashboard</h3>
                        <div className='row mb-3'>

                            <div className='card dashboard col-sm-4 p-3 border-0'>
                                <div className='top-card-banner'>
                                    <div className='top-card-info mt-5 border-0'>
                                        <h2>IT</h2>
                                        <h4>20+</h4>
                                    </div>

                                </div>

                            </div>
                            <div className='card dashboard col-sm-4 p-3 border-0'>
                                <div className='top-card-banner'>
                                    <div className='top-card-info mt-5 border-0'>
                                        <h2>Sales</h2>
                                        <h4>55+</h4>
                                    </div>

                                </div>

                            </div>
                            <div className='card dashboard col-sm-4 p-3 border-0'>
                                <div className='top-card-banner'>
                                    <div className='top-card-info mt-5 border-0'>
                                        <h2>Management</h2>
                                        <h4>30+</h4>
                                    </div>

                                </div>

                            </div>


                        </div>

                        <div className='row'>
                            <div className='graph col-sm-6'>
                                <div className='card'>
                                    <Bar
                                        data={state}
                                        options={{
                                            title: {
                                                display: true,
                                                text: 'Average Rainfall per month',
                                                fontSize: 20,
                                                height: "320px"
                                            },
                                            legend: {
                                                display: true,
                                                position: 'right'
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            <div className='graph col-sm-6'>
                                <div className='card'>
                                    <Bar
                                        data={statee}
                                        options={{
                                            title: {
                                                display: true,
                                                text: 'Average Rainfall per month',
                                                fontSize: 20,
                                                height: "320px"
                                            },
                                            legend: {
                                                display: true,
                                                position: 'right'
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                        </div>

                        <div className='row mt-4'>
                            <div className='col-sm-12'>
                                <div class="card">
                                    <div class="table-dashboard card-header bg-light border-0">
                                        <h3 class="card-title">Pending Requests</h3>
                                    </div>
                                    <div class="card-body table-responsive p-0">
                                        <table class="table table-striped table-valign-middle">
                                            <thead>
                                                <tr>
                                                    <th>Tasks</th>
                                                    <th>Prices</th>
                                                    <th>Sales</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        Some Product
                                                    </td>
                                                    <td>$13 USD</td>
                                                    <td>
                                                        <small class="text-success mr-1">
                                                            <i class="fas fa-arrow-up"></i>
                                                            12%
                                                        </small>
                                                        12,000 Sold
                                                    </td>
                                                    <td>
                                                    <a href="#">
                                                    <EditIcon/>
                                                </a>
                                                <a href="#">
                                                    <DeleteIcon/>
                                                </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        Another Product
                                                    </td>
                                                    <td>$29 USD</td>
                                                    <td>
                                                        <small class="text-warning mr-1">
                                                            <i class="fas fa-arrow-down"></i>
                                                            0.5%
                                                        </small>
                                                        123,234 Sold
                                                    </td>
                                                    <td>
                                                    <a href="#">
                                                    <EditIcon/>
                                                </a>
                                                <a href="#">
                                                    <DeleteIcon/>
                                                </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        Amazing Product
                                                    </td>
                                                    <td>$1,230 USD</td>
                                                    <td>
                                                        <small class="text-danger mr-1">
                                                            <i class="fa fa-arrow-down"></i>
                                                            3%
                                                        </small>
                                                        198 Sold
                                                    </td>
                                                    <td>
                                                    <a href="#">
                                                    <EditIcon/>
                                                </a>
                                                <a href="#">
                                                    <DeleteIcon/>
                                                </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>

                                                        Perfect Item
                                                        <span class="badge bg-danger">NEW</span>
                                                    </td>
                                                    <td>$199 USD</td>
                                                    <td>
                                                        <small class="text-success mr-1">
                                                            <i class="fa fa-arrow-up"></i>
                                                            63%
                                                        </small>
                                                        87 Sold
                                                    </td>
                                                    <td>
                                                    <a href="#">
                                                    <EditIcon/>
                                                </a>
                                                <a href="#">
                                                    <DeleteIcon/>
                                                </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </>
                : <>
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