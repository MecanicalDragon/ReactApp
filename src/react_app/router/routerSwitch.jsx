import React from 'react';
import {Switch, Route} from 'react-router';
import * as routes from './routes';

const LazyIndex = React.lazy(() => import( '@/component/index'));
const LazyFirstPage = React.lazy(() => import( '@/component/first'));
const LazySecondPage = React.lazy(() => import( '@/component/second'));
const LazyThirdPage = React.lazy(() => import( '@/component/third'));

export default () => (
    <Switch>
        <Route exact path={routes.index()} component={LazyIndex}/>
        <Route exact path={routes.pageOne()} component={LazyFirstPage}/>
        <Route exact path={routes.pageTwo()} component={LazySecondPage}/>
        <Route exact path={routes.pageThree()} component={LazyThirdPage}/>
    </Switch>
);