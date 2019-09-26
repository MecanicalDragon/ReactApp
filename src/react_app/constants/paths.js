import * as routes from '@/router/routes'

export const Home = "Home";
export const pageOne = "Page One";
export const pageTwo = "Page Two";
export const pageThree = "Page Three";

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
export {paths};