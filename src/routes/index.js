// routes.js
import HomePage from '../pages/HomePage/HomePage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import MainPage from '../pages/MainPage/MainPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import RankListPage from '../pages/RankListPage/RankListPage';
import SearchPage from '../pages/SearchPage/SearchPage';
import DetailTaskPage from '../pages/DetailPage/DetailTaskPage';
import GroupPage from '../pages/GroupPage/GroupPage';
import DetailTaskDoPage from '../pages/DetailPage/DetailTaskDoPage';
import SearchUser from '../pages/SearchPage/SearchUser';

const routes = [
    {
        path: '/homepage',
        page: HomePage,
    },
    {
        path: '/',
        page: MainPage,
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

        path: '/profile/:userId',
        page: ProfilePage
    },
    {
        path: '/ranklist',
        page: RankListPage
    },
    {
        path: '/detail/task/:taskId',
        page: DetailTaskPage
    },
    {
        path: '/detail/dotask/:taskId',
        page: DetailTaskDoPage
    },
    {
        path: '/search/user',
        page: SearchUser
    },
    {
        path: '/group/:groupId',
        page: GroupPage
    },
    {
        path: '/search',
        page: SearchPage
    },
    {
        path: '*',
        page: NotFoundPage
    }

];
export default routes;
