import * as actionType from "@/constants/actionTypes";

export default (state = {auth: null}, action = {}) => {
    switch (action.type) {
        case actionType.SET_AUTH:
            const newState = Object.assign({}, state);
            if (action.auth === null) return Object.assign({}, {auth: null});
            newState.auth = {
                access: action.auth.access,
                refresh: action.auth.refresh,
                roles: action.auth.roles,
            };
            return newState;
        case actionType.REFRESH_TOKEN:
            const newState2 = Object.assign({}, state);
            newState2.auth.access = action.token.access;
            newState2.auth.refresh = action.token.refresh;
            return newState2;
        default:
            return state;
    }
};