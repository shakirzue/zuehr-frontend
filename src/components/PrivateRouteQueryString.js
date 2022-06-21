import { Navigate, Outlet, useSearchParams } from 'react-router-dom';
import { useIsAuthenticated } from "@azure/msal-react";
import PermissionProvider from './PermissionProvider';
import {getModuleName} from '../helpers/QueryStringModuleMapper';
import { getCookieNonCpcgrAuth } from "../helpers/utils";

const PrivateRouteQueryString = ({
    permissionList,
    redirectPath = '/landing',
    module,
    permissionLevel
    }) => {
    const [searchParams] = useSearchParams();

    const q = searchParams.get('ReportType');
    const isAuthenticated = useIsAuthenticated() === false ? getCookieNonCpcgrAuth() : true;    
    if (!isAuthenticated) {      
        return <Navigate to={{ pathname: '/' }} />
    }
    if(PermissionProvider({ permissionDetails: permissionList, moduleName: getModuleName(q), permissionLevel: permissionLevel }))
        return <Outlet />
    else
        return <Navigate to={{ pathname: '/' }} />
  
}
export default PrivateRouteQueryString;