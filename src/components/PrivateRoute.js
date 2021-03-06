import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useIsAuthenticated } from "@azure/msal-react";
import PermissionProvider from './PermissionProvider';
import { getCookieNonCpcgrAuth } from "../helpers/utils";

const PrivateRoute = ({
    permissionList,
    redirectPath = '/landing',
    module,
    permissionLevel
  }) => {
    const isAuthenticated = useIsAuthenticated() === false ? getCookieNonCpcgrAuth() : true;   
    if (!isAuthenticated) {      
        return <Navigate to={{ pathname: '/' }} />
    }    
    if(PermissionProvider({ permissionDetails: permissionList, moduleName: module, permissionLevel: permissionLevel }))
        return <Outlet />
    else
        return <Navigate to={{ pathname: '/' }} />
}

export default PrivateRoute;