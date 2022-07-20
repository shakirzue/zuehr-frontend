import { authHeader } from "../helpers/auth-header";
import { getCookieOid } from "../helpers/utils";

export function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
     
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                // userService.logout();
                // location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

export function getHeaders() {
    // return {
    //     'Content-Type': 'application/json',
    //     'oid': getCookieOid(),
    //     ...authHeader()
    // }
    return {
        'Content-Type': 'application/json',
        'oid': getCookieOid(),
        'Access-Control-Allow-Origin': process.env.REACT_APP_SERVER_BASE_URL,
        'Access-Control-Allow-Credentials':'true',
        'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
        'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token, Authorization, Origin',
        ...authHeader()
    }
}