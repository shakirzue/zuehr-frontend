import { BehaviorSubject } from 'rxjs';
import Cookies from 'universal-cookie';
import { Navigate  } from 'react-router-dom'
import React, { useState, useEffect } from 'react';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {    
    Logout,
    Login,
    SignUp,
    Forget,
    Verify,
    NewPassword,
    ChangePassword,
    Reset,

    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () {return JSON.parse(localStorage.getItem('currentUser')); },
    get clientId() {return JSON.parse(localStorage.getItem('ClientId'));}
};

// 
// const [showSignUpForm, setShowSignUpForm] = React.useState(false);
// const [showLoginForm, setShowLoginForm] = React.useState(false); 

// useEffect(() => {
//     if(showSignUpForm){
//         window.location.href = '/';
//     }

//     if(showLoginForm){
//         window.location.href = '/';
//     }
// }, [showSignUpForm, showLoginForm]);

function Logout() {
    localStorage.clear();

    var cookies = new Cookies();
    cookies.remove('oid', { path: '/' });
    cookies.remove('nonCpcgrUserAuthenticated', { path: '/' });

    window.location.href = '/';
}

function Login() {
    // if(!showLoginForm){
    //     setShowLoginForm(true);
    //     setShowSignUpForm(false)
    // }
    // else{
    //     setShowLoginForm(false)
    // }
    window.location.href = '/Login';
}

function SignUp() {
    // if(!showSignUpForm){
    //     setShowSignUpForm(true);
    //     setShowLoginForm(false);
    // }
    // else
    //     setShowSignUpForm(false)
    window.location.href = '/SignUp';
}

function Forget() {
    // if(!showSignUpForm){
    //     setShowSignUpForm(true);
    //     setShowLoginForm(false);
    // }
    // else
    //     setShowSignUpForm(false)
    window.location.href = '/Forget';
}

function Reset() {
    // if(!showSignUpForm){
    //     setShowSignUpForm(true);
    //     setShowLoginForm(false);
    // }
    // else
    //     setShowSignUpForm(false)
    window.location.href = '/Reset';
}

function Verify() {
    // if(!showSignUpForm){
    //     setShowSignUpForm(true);
    //     setShowLoginForm(false);
    // }
    // else
    //     setShowSignUpForm(false)
    window.location.href = '/Verify';
}

function NewPassword() {
    // if(!showSignUpForm){
    //     setShowSignUpForm(true);
    //     setShowLoginForm(false);
    // }
    // else
    //     setShowSignUpForm(false)
    window.location.href = '/New-Password';
}
function ChangePassword() {
    // if(!showSignUpForm){
    //     setShowSignUpForm(true);
    //     setShowLoginForm(false);
    // }
    // else
    //     setShowSignUpForm(false)
    window.location.href = '/Change-Password';
}