import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { LaunchGate } from "./components/LaunchGate";
import { ComingSoon } from "./components/ComingSoon";
import { Home } from "./components/Home";
import { SignUp } from "./components/SignUp";
import { SignIn } from "./components/SignIn";
import { CompetitionsList } from "./components/CompetitionsList";
import { CompetitionDetail } from "./components/CompetitionDetail";
import { ProblemDetail } from "./components/ProblemDetail";
import { Editorials } from "./components/Editorials";
import { Contact } from "./components/Contact";
import { AddCompetition } from "./components/AddCompetition";
import { Settings } from "./components/Settings";
import { Dashboard } from "./components/Dashboard";
import { Profile } from "./components/Profile";
import { FAQ } from "./components/FAQ";
import { Notifications } from "./components/Notifications";
import { Blog } from "./components/News";
import { BlogPost } from "./components/NewsPost";
import { BlogAdmin } from "./components/NewsAdmin";
import { NotFound } from "./components/NotFound";
import { Terms } from "./components/Terms";
import { Privacy } from "./components/Privacy";
import { UnsubscribeEmail } from "./components/UnsubscribeEmail";
import { ResetPassword } from "./components/ResetPassword";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        Component: LaunchGate,
        children: [
          { index: true, Component: ComingSoon },
          { path: "news", Component: Blog },
          { path: "news/:postId", Component: BlogPost },
          { path: "news/admin", Component: BlogAdmin },
          { path: "terms", Component: Terms },
          { path: "privacy", Component: Privacy },
          { path: "unsubscribe/email", Component: UnsubscribeEmail },
          { path: "resetpassword/:token", Component: ResetPassword },
          { path: "signup", Component: SignUp },
          { path: "signin", Component: SignIn },
          { path: "competitions", Component: CompetitionsList },
          { path: "competitions/add", Component: AddCompetition },
          { path: "competitions/:id", Component: CompetitionDetail },
          { path: "competitions/:id/problems/:problemId", Component: ProblemDetail },
          { path: "dashboard", Component: Dashboard },
          { path: "profile/:userId", Component: Profile },
          { path: "faq", Component: FAQ },
          { path: "notifications", Component: Notifications },
          { path: "editorials", Component: Editorials },
          { path: "contact", Component: Contact },
          { path: "settings", Component: Settings },
          { path: "*", Component: NotFound },
        ],
      },
    ],
  },
]);
