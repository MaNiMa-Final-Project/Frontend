import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Kurse from "../pages/Kurse";
import Dozenten from "../pages/Dozenten";
import Info from "../pages/Info";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import RegisterForm from "../components/LogReg/RegisterForm";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import ShoppingCartPage from "../pages/ShoppingCartPage";
import CreateCoursePage from "../pages/CreateCoursePage";
import CreateCreatorPage from "../pages/CreateCreatorPage";
import CourseDetailsPage from "../pages/CourseDetailsPage";
import CreatorPage from "../pages/CreatorPage";
import { useLegitUser } from "../hooks/useLegitUser";

export const paths = {
    homePath: "/",
    registerPath: "/register",
    registerForm: "/registerform",
    loginPath: "/login",
    dashboardPath: "/dashboard",
    shoppingCartPath: "/shoppingcart",
    createCoursePath: "/newcourse",
    createCreatorPath: "/newcreator",
    coursePath: "/course/:id",
    creatorPath: "/creator/:id",
    dozentenPath: "/dozenten",
    infoPath: "/info",
    kursePath: "/kurse"
};

export const routingData = () => {
    const userData = useLegitUser();
    const location = useLocation();

    // console.log("--------------------------------------------------------");
    // console.log("doppelte negation  "+(!((!userData.isCreator) || (!userData.isAdmin))));
    // console.log("normal "+(userData.isCreator || userData.isAdmin));
    // console.log("einfache negation (benutzen wir) "+(!(userData.isCreator || userData.isAdmin)));
    // console.log("--------------------------------------------------------");

    useEffect(() => {
        userData.fetchUser();
    }, [location.pathname]);

    return [
        {
            path: paths.homePath,
            element: <HomePage />,
            isProtected: false,
            redirectPath: null
        },
        {
            path: paths.registerPath,
            element: <RegisterPage />,
            isProtected: false,
            redirectPath: paths.homePath
        },
        {
            path: paths.registerForm,
            element: <RegisterForm />,
            isProtected: false,
            redirectPath: paths.homePath
        },
        {
            path: paths.loginPath,
            element: <LoginPage />,
            isProtected: false,
            redirectPath: paths.homePath
        },
        {
            path: paths.creatorPath,
            element: <CreatorPage />,
            isProtected: false,
            redirectPath: null
        },
        {
            path: paths.shoppingCartPath,
            element: <ShoppingCartPage />,
            isProtected: false,
            redirectPath: null
        },
        {
            path: paths.coursePath,
            element: <CourseDetailsPage />,
            isProtected: false,
            redirectPath: null
        },
        {
            path: paths.dozentenPath,
            element: <Dozenten />,
            isProtected: false,
            redirectPath: null
        },
        {
            path: paths.infoPath,
            element: <Info />,
            isProtected: false,
            redirectPath: null
        },
        {
            path: paths.kursePath,
            element: <Kurse />,
            isProtected: false,
            redirectPath: null
        },

        //!protected
        //? admin oder creator
        {
            path: paths.createCoursePath,
            element: <CreateCoursePage />,
            isProtected: !(userData.isCreator || userData.isAdmin),
            redirectPath: paths.homePath
        },
        //?admin
        {
            path: paths.createCreatorPath,
            element: <CreateCreatorPage />,
            isProtected: !userData.isAdmin,
            redirectPath: paths.homePath
        },
        //? every user
        {
            path: paths.dashboardPath,
            element: <DashboardPage />,
            isProtected: !userData.success,
            redirectPath: paths.homePath
        }
    ];
};
