import React from 'react';
import {Switch, Route} from 'react-router';
import SecuredRouter from '@/router/securedRouter';
import * as routes from './routes';
import * as roles from '@/constants/roles';

const LazyIndex = React.lazy(() => import( '@/component/index'));
const LazyDenied = React.lazy(() => import( '@/component/denied'));
const LazyLoginPage = React.lazy(() => import( '@/component/login'));
const LazyFirstPage = React.lazy(() => import( '@/component/first'));
const LazySecondPage = React.lazy(() => import( '@/component/second'));
const LazyThirdPage = React.lazy(() => import( '@/component/third'));
const LazyDnd = React.lazy(() => import( '@/dnd/dnd'));

export default () => (
    <Switch>
        <SecuredRouter exact path={routes.index()} roles={[roles.user]} component={LazyIndex}/>
        <SecuredRouter exact path={routes.pageOne()} roles={[roles.user]} component={LazyFirstPage}/>
        <SecuredRouter exact path={routes.pageTwo()} roles={[roles.user]} component={LazySecondPage}/>
        <SecuredRouter exact path={routes.pageThree()} roles={[roles.admin]} component={LazyThirdPage}/>
        <SecuredRouter exact path={routes.dnd()} roles={[roles.admin]} component={LazyDnd}/>
        <Route exact path={routes.login()} component={LazyLoginPage}/>
        <Route exact path={routes.denied()} component={LazyDenied}/>
    </Switch>
);