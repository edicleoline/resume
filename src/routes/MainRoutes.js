import { lazy } from 'react';

import MainLayout from './../layout/MainLayout';
import Loadable from './../ui-component/Loadable';

const Resume = Loadable(lazy(() => import('./../views/resume')));

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <Resume />
        }        
    ]
};

export default MainRoutes;
