import * as routes from '@/router/routes'

export const Home = "Home";
export const pageOne = "Page One";
export const pageTwo = "Page Two";
export const pageThree = "Page Three";
export const Login = "Login";
export const Denied = "Denied";

let paths = {};
paths[Home] = {
    formattedId: "app.breadcrump.home",
    pathElements: [],
    link: routes.index()
};
paths[pageOne] = {
    formattedId: "app.breadcrump.pageOne",
    pathElements: [Home],
    link: routes.pageOne()
};
paths[pageTwo] =  {
    formattedId: "app.breadcrump.pageTwo",
    pathElements: [Home],
    link: routes.pageTwo()
};
paths[pageThree] =  {
    formattedId: "app.breadcrump.pageThree",
    pathElements: [Home, pageTwo],
    link: routes.pageThree()
};
paths[Login] =  {
    formattedId: "app.breadcrump.login",
    pathElements: [],
    link: routes.login()
};
paths[Denied] =  {
    formattedId: "app.breadcrump.denied",
    pathElements: [],
    link: routes.denied()
};
export {paths};