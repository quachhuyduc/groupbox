// routes.js
import HomePage from '../pages/HomePage/HomePage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import MainPage from '../pages/MainPage/MainPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import DetailPageBook from '../pages/DetailPage/DetailPageBook';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import DetailPageLyrics from '../pages/DetailPage/DetailPageLyrics';
import DetailPageVideo from '../pages/DetailPage/DetailPageVideo';
import RankListPage from '../pages/RankListPage/RankListPage';
import SearchPage from '../pages/SearchPage/SearchPage';
import DetailTaskPage from '../pages/DetailPage/DetailTaskPage';
import GroupPage from '../pages/GroupPage/GroupPage';
import DetailTaskDoPage from '../pages/DetailPage/DetailTaskDoPage';
import SearchUser from '../pages/SearchPage/SearchUser';

const userId = localStorage.getItem('userId')

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
        path: '/login',
        page: LoginPage,
    },
    {
        path: '/register',
        page: RegisterPage,
    },
    {
        path: '/detail',
        page: DetailPageBook
    },
    {
        path: '/detail/lyrics',
        page: DetailPageLyrics
    },
    {
        path: '/detail/video',
        page: DetailPageVideo
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
