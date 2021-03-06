import * as actionType from "@/constants/actionTypes";

// Redux.step2: define action
export const setLocale = (locale = '') => ({type: actionType.SET_LOCALE, locale});
export const setNavPosition = (navPosition = '') => ({type: actionType.SET_NAV_POSITION, navPosition});

export const setAuth = (auth = {
    access: null,
    refresh: null,
    roles: []
}) => ({type: actionType.SET_AUTH, auth});

export const refreshToken = (token = {
    access: null,
    refresh: null
}) => ({type: actionType.REFRESH_TOKEN, token});