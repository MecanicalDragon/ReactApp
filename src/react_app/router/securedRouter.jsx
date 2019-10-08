import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import * as routes from './routes';

import * as AuthenticationService from '@/service/AuthenticationService';

const SecuredRouter = ({ component: Component, roles, ...rest }) => (
    <Route {...rest} render={props => {

        if (!AuthenticationService.isUserLoggedIn()) {
            return <Redirect to={{ pathname: routes.login(), state: { from: props.location } }} />
        }

        if(roles) {
            let accessGranted = false;
            for (let role of roles) {
                if(AuthenticationService.userHasRole(role)) {
                    accessGranted = true;
                    break;
                }
            }
            if(!accessGranted) return <Redirect to={{ pathname: routes.denied()}} />
        }

        return <Component {...props} />
    }} />
);

export default SecuredRouter;