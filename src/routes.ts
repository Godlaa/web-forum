import Admin from './pages/Admin';
import Auth from './pages/Auth';
import Forum from './pages/Forum';
import Profile from './pages/Profile';
import Question from './pages/QuestionPage';
import Section from './pages/SectionPage';
import { ADMIN_ROUTE, FORUM_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, QUESTION_ROUTE, REGISTRATION_ROUTE, SECTION_ROUTE } from './utils/consts';

export const authRoutes = [
{
    path: ADMIN_ROUTE,
    Component: Admin,
},
{
    path: PROFILE_ROUTE,
    Component: Profile,
}
];

export const publicRoutes = [
{
    path: FORUM_ROUTE,
    Component: Forum,
},
{
    path: LOGIN_ROUTE,
    Component: Auth,
},
{
    path: REGISTRATION_ROUTE,
    Component: Auth,
},
{
    path: QUESTION_ROUTE + '/:id',
    Component: Question,
},
{
    path: SECTION_ROUTE + '/:id',
    Component: Section,
}
];