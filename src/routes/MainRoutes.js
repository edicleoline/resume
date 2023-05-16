import { lazy } from 'react';

import MainLayout from './../layout/MainLayout';
import Loadable from './../ui-component/Loadable';

import Resume from './../views/resume';
const _Resume = Loadable(lazy(() => import('./../views/resume')));


const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <_Resume />
        }        
    ]
};

export default MainRoutes;
