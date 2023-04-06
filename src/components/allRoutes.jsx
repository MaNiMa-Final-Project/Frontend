import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import HomePage from '../pages/HomePage'
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import ShoppingCartPage from '../pages/ShoppingCartPage';
import CreateCoursePage from '../pages/CreateCoursePage';
import CourseDetailsPage from '../pages/CourseDetailsPage';
import { useLegitUser } from '../hooks/useLegitUser';

export const paths = {
    homePath: "/",
    registerPath: "/register",
    loginPath: "/login",
    dashboardPath: "/dashboard",
    shoppingCartPath: "/shoppincart",
    createCoursePath: "/create",
    coursePath: "/course/:id"
};

export const routingData = () => {
    const userData = useLegitUser();
    const location = useLocation();

    // console.log("--------------------------------------------------------");
    // console.log("doppelte negation  "+(!((!userData.isCreator) || (!userData.isAdmin))));
    // console.log("normal "+(userData.isCreator || userData.isAdmin));
    // console.log("einfache negation (benutzen wir) "+(!(userData.isCreator || userData.isAdmin)));
    // console.log("--------------------------------------------------------");

    useEffect(()=>{
        userData.fetchUser();
    },[location.pathname]);

    return [
        {
            path: paths.homePath,
            element: <HomePage />,
            isProtected: false,
            redirectPath: null,
        },
        {
            path: paths.registerPath,
            element: <RegisterPage />,
            isProtected: false,
            redirectPath: paths.homePath,
        },
        {
            path: paths.loginPath,
            element: <LoginPage />,
            isProtected: false,
            redirectPath: paths.homePath,
        },
        {
            path: paths.shoppingCartPath,
            element: <ShoppingCartPage />,
            isProtected: false,
            redirectPath: null,
        },
        {
            path: paths.coursePath,
            element: <CourseDetailsPage />,
            isProtected: false,
            redirectPath: null,
        },
        //!protected
        //? admin oder creator
        {
            path: paths.createCoursePath,
            element: <CreateCoursePage />,
            isProtected: (!(userData.isCreator || userData.isAdmin)),
            redirectPath: paths.homePath,
        },
        //? every user
        {
            path: paths.dashboardPath,
            element: <DashboardPage />,
            isProtected: !userData.success,
            redirectPath: paths.homePath,
        },
    ];
}
  
