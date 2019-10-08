import {deployedUrl} from './rootUrl';
import {createStore} from 'redux';
import {reducers} from '@/reducer/reducers';
import {history} from '@/App';
import {setAuth, refreshToken} from '@/reducer/actions';
import * as axios from 'axios';
import * as routers from '@/router/routes';

axios.interceptors.response.use(
    function (response) {
        return response;
    },
    async function (error) {
        if (error.response.status === 401 && isUserLoggedIn()) {
            let token = await refreshJWT();
            if (token == null) {
                console.log("Token is expired");
                logout();
                return Promise.reject(error);
            } else {
                let config = error.config;
                config.headers.Authorization = 'Bearer ' + token.access;
                return axios.request(config);
            }
        } else return Promise.reject(error);
    }
);

async function refreshJWT() {
    const params = new URLSearchParams();
    params.append('accessToken', store.getState().auth.auth.access);
    params.append('refreshToken', store.getState().auth.auth.refresh);

    let response = await axios.post(deployedUrl + "token/refresh", params, {
        headers: {
            "Authorization": "NoAuth"
        }
    });

    if (response.status !== 200) {
        return null;
    }

    let token = {
        access: response.data.accessToken,
        refresh: response.data.refreshToken
    };

    store.dispatch(refreshToken(token));
    return token;
}

axios.interceptors.request.use(function (config) {
    if (isUserLoggedIn() && config.headers.Authorization == null) {
        config.headers.Authorization = 'Bearer ' + getAccessToken();
        config.withCredentials = true;
    }

    return config;
});

export function getAccessToken() {
    return store.getState().auth.auth.access;
}

export function isUserLoggedIn() {
    return store.getState().auth.auth != null;
}

export function userHasRole(role) {
    let auth = store.getState().auth.auth;
    return auth === null ? false : auth.roles.includes(role);
}

export function logout() {
    store.dispatch(setAuth(null));
    history.push(routers.login());
}

export async function login(email, password) {
    const params = new URLSearchParams();
    params.append('email', email);
    params.append('password', password);

    let response = await axios.post(deployedUrl + "auth/login", params).catch(err => {
        return false
    });

    if (response.status !== 200) return false;
    else return getRoles(response);
}

async function getRoles(response) {
    let roles = await axios.get(deployedUrl + "auth/getRoles", {
        headers: {
            'Authorization': 'Bearer ' + response.data.accessToken
        },
        withCredentials: true,
    });

    if (roles.status !== 200) {
        return false;
    }

    store.dispatch(setAuth({
        access: response.data.accessToken,
        refresh: response.data.refreshToken,
        roles: roles.data.roles
    }));

    return true;
}

// Redux
export const loadState = () => {
    try {
        const state = localStorage.getItem('state');
        return state === null ? {auth: {auth: null}} : JSON.parse(state);
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        localStorage.setItem('state', JSON.stringify(state));
    } catch {
        /*ignore errors*/
    }
};

const store = createStore(
    reducers,
    loadState()
);

store.subscribe(() => {
    saveState({
        auth: store.getState().auth
    });
});