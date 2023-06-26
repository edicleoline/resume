import { lazy } from 'react';

import MainLayout from './../layout/MainLayout';
import Loadable from './../ui-component/Loadable';

const Latest = Loadable(lazy(() => import('./../views/latest')));
const Posts = Loadable(lazy(() => import('./../views/posts')));
const Post = Loadable(lazy(() => import('./../views/post')));

const Resume = Loadable(lazy(() => import('./../views/resume')));

// const _Congrats = Loadable(lazy(() => import('./../views/congrats')));


const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/resume',
            element: <Resume />
        },
        {
            path: '/latest',
            element: <Latest />
        },
        {
            path: '/posts',
            element: <Posts />
        },
        {
            path: '/post',
            element: <Post />
        },
        // {
        //     path: '/r/imagem',
        //     element: <_Congrats />
        // }        
    ]
};

export default MainRoutes;
