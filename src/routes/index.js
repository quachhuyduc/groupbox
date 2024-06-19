// routes.js
import HomePage from '../pages/HomePage/HomePage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import ProductsPage from '../pages/ProductsPage/ProductsPage';
import MainPage from '../pages/MainPage/MainPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';

const routes = [
    {
        path: '/homepage',
        page: HomePage,
        isShowHeader: true
    },
    {
        path: '/',
        page: MainPage,
        isShowHeader: false
    },
    {
        path: '/products',
        page: ProductsPage,
        isShowHeader: true
    },
    {
        path: '/login',
        page: LoginPage,
    },
    {
        path: '/register',
        page: RegisterPage,
    },
    {
        path: '*',
        page: NotFoundPage
    }
];
export default routes;
