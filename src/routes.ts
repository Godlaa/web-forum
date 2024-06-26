import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import SectionsTable from "./pages/SectionsTable";
import Profile from "./pages/UserProfile";
import Question from "./pages/QuestionAnswersForm";
import QuestionsTable from "./pages/QuestionsTable";
import OtherProfile from "./pages/OtherProfile";
import {
  ADMIN_ROUTE,
  FORUM_ROUTE,
  LOGIN_ROUTE,
  PROFILE_ROUTE,
  QUESTION_CREATE_ROUTE,
  QUESTION_ROUTE,
  REGISTRATION_ROUTE,
  SECTION_ROUTE,
} from "./utils/consts";
import QuestionCreatePage from "./pages/QuestionCreatePage";

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin,
  },
  {
    path: PROFILE_ROUTE,
    Component: Profile,
  },
  {
    path: PROFILE_ROUTE + "/:id",
    Component: OtherProfile,
  },
];

export const publicRoutes = [
  {
    path: FORUM_ROUTE,
    Component: SectionsTable,
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
    path: QUESTION_ROUTE + "/:id",
    Component: Question,
  },
  {
    path: SECTION_ROUTE + "/:id",
    Component: QuestionsTable,
  },
  {
    path: QUESTION_CREATE_ROUTE + "/:id",
    Component: QuestionCreatePage,
  },
];
