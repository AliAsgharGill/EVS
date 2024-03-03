// import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import "./App.css";

//Layout
import Layout from "./layout/Layout";

//Pages
import CandidateList from "./pages/CandidatesList/CandidatesList";
import Home from "./pages/Home/Home";

import Login from "./pages/SignInPage/SignIn";
import Signup from "./pages/SignupPage/Signup";
import CampaignPage from "./pages/CampaignPage"
import NoMatch from "./pages/NoMatch/Index";
// import UserDetails from "./pages/UserDetails/Index";
import CandidateVote from "./pages/candidatesVoting/candidatesVoting";
import PhonePage from "./pages/PhonesPage/Index";
import PhoneVoting from "./pages/PhoneVoting/PhoneVoting";
import ProgrammingPage from "./pages/ProgrammingPage/ProgrammingPage";
import ProgrammingVoting from "./pages/ProgrammingVoting/ProgrammingVoting";
import ElectronicPage from "./pages/ElectronicsPage/ElectronicPage";
import ElectronicsVoting from "./pages/ElectronicsVoting/ElectronicsVoting";
import AdminLoginPage from "./pages/Admin/AdminSignupPage";
import SignupForm from "./components/SignupForm/SignupForm";
import LoginForm from "./components/LoginForm/LoginForm";



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index path="/" element={<Home />} />
      <Route path="/candidates" element={<CandidateList />} />
      <Route path="/candidatesVoting" element={<CandidateVote />} />
      <Route path="/signup/user" element={<SignupForm path="/signup/user" prop='w-1/3' type='user' />} />
      <Route path="/login/user" element={<LoginForm path="/login/user" prop='w-[400px]' type='user' />} />
      <Route path="/campaigns" element={<CampaignPage />} >
        {/* <Route path=":userId" element={<UserDetails />} /> */}
      </Route>
      <Route path="*" element={<NoMatch />} />
      <Route path="/phones" element={<PhonePage />} />
      <Route path="/phonesVoting" element={<PhoneVoting />} />
      <Route path="/programming" element={<ProgrammingPage />} />
      <Route path="/programmingVoting" element={<ProgrammingVoting />} />
      <Route path="/electronics" element={<ElectronicPage />} />
      <Route path="/electronicsVoting" element={<ElectronicsVoting />} />
      {/* <Route path="/adminSignup" element={<AdminLoginPage />} /> */}
      {/* <Route path="/adminLogin" element={<AdminLoginPage />} /> */}

      {/* dynamic */}
      <Route path="/signup/user" element={<SignupForm prop='w-1/3' type='users' path="/signup/user" />} />
      <Route path="/login/user" element={<LoginForm prop='w-1/3' type='users' path="/login/users" />} />

      <Route path="/signup/admin" element={<SignupForm prop='w-1/3 bg-[#F09A3E]' path='path="/signup/admin"' type='admins' />} />
      <Route path="/login/admin" element={<LoginForm prop='w-1/3 bg-[#d7cabe]' path="/login/admin" type='admins' />} />
    </Route>
  )
);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;


