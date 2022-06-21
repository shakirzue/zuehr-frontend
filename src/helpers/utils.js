import Cookies from 'universal-cookie';
const cookies = new Cookies();

const getCookieOid = () => {
    return cookies.get('oid')
}

const setCookieOid = (data) => {
    cookies.set('oid', data, { path: '/' });
}

const getCookieNonCpcgrAuth = () => {
    return cookies.get('nonCpcgrUserAuthenticated')
}

const setCookieNonCpcgrAuth = (data) => {
    cookies.set('nonCpcgrUserAuthenticated', data !== null ? true : false, { path: '/' });
}

const setLocalStorage = (data, keyName) => {
    localStorage.setItem(keyName, data);
}

const getLocalStorage = (keyName) => {
   return localStorage.getItem(keyName);
}

const isSuccess = (status) => {
    return status === 1 ? true : false;
}

const getFullEmployeeName = (employee) => {
    return `${employee?.FirstName} ${employee?.LastName}`
}

const getObjWithProfileId = (data) => {
    let id = localStorage.getItem('userProfileId')
    Object.assign(data, { 'userProfileId': id })

    return data;
}

export {
    getCookieOid,
    setCookieOid,
    getCookieNonCpcgrAuth,
    setCookieNonCpcgrAuth,
    setLocalStorage,
    getLocalStorage,
    isSuccess,
    getFullEmployeeName,
    getObjWithProfileId
}