import React, { useEffect, useState } from 'react';
import { backgroundColor } from "../../Constants";
import ManagerAppbar from "../../components/ManagerAppBar";
import logo from "../../Images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { userActions, hrModuleActions } from '../../redux/actions';
import { Button } from "@material-ui/core";
import { getCookieNonCpcgrAuth } from "../../helpers/utils";
import Form from "react-bootstrap/Form";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { setCookieOid, setCookieNonCpcgrAuth, setLocalStorage, getLocalStorage, isSuccess, getObjWithProfileId } from "../../helpers/utils";



// useEffect(() => {
//     if(response.status === 200){
//         history.push('/New-Password')
//       }
// }, [])


// if (token !== "") {
//     history.push('/New-Password')
//          }




const Verify = (props) => {
    const dispatch = useDispatch();
    const { error, isVerified, StatusCode, requestType, newtoken } = useSelector(state => state.users);
    useEffect(() => {

        const token = getLocalStorage('token');       
        const email = 'admin@gmail.com';
        //dispatch(userActions.confirmTokenAction({ token: token }))
        console.log(error, 555)
    }, [])

    useEffect(() => {

        console.log(error, 555)
    }, [error])

    useEffect(() => {

        console.log(StatusCode, requestType, 888)
    }, [isVerified])

    var isAuthenticated = getCookieNonCpcgrAuth();

    const [showSignUpForm, setShowSignUpForm] = React.useState(false);
    const [showLoginForm, setShowLoginForm] = React.useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [employeeNumber, setEmployeeNumber] = useState("");
    const [firstName, setFirstName] = useState("");
    const [surName, setSurName] = useState("");
    const [phone, setPhone] = useState("");


    const validateForm = () => {
        return email.length > 0 && password.length > 0;
    };

    const redirectToDashboard = () => {
        window.location.href = '/NewPassword';
    }

    const getPersonalDetailOfLogger = () => {
        dispatch(hrModuleActions.getProfileByUserProfileIdAction(redirectToDashboard));
    }

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
                        <CheckCircleIcon className='check-cirle' />
                        <h2 className="mt-3 mb-5">Thanks for the <br></br>Verification</h2>
                        <p>{error}</p>

                    </Form>

                </div>

            </div>
        </div>
    );
}

export default Verify;