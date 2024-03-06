import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import "./App.css";

//Layout
import Layout from "./layout/Layout";

// Pages And Components
import CandidateList from "./pages/CandidatesList/CandidatesList";
import Home from "./pages/Home/Home";
import CampaignPage from "./pages/CampaignPage/CampaignPage"
import NoMatch from "./pages/NoMatch/Index";
import CandidateVote from "./pages/candidatesVoting/candidatesVoting";
import SignupForm from "./components/SignupForm/SignupForm";
import LoginForm from "./components/LoginForm/LoginForm";
import AdminDashboard from "./components/adminDashboard/adminDashboard";
import CampaignManagementPage from "./pages/CampaignManagementPage/CampaignManagementPage";




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index path="/" element={<Home />} />
      <Route path="/candidates" element={<CandidateList />} />
      <Route path="/candidatesVoting" element={<CandidateVote />} />
      <Route path="/signup/user" element={<SignupForm path="/signup/user" prop='w-1/3' type='user' />} />
      <Route path="/login/user" element={<LoginForm path="/login/user" prop='w-[400px]' type='user' />} />
      <Route path="/campaigns" element={<CampaignPage />} >

      </Route>
      <Route path="*" element={<NoMatch />} />
      <Route path="/dashboard" element={<AdminDashboard />} />
      <Route path="/campaignsPage" element={<CampaignManagementPage />} />


      {/* dynamic */}
      <Route path="/signup/user" element={<SignupForm prop='w-1/3' type='users' path="/signup/user" />} />
      <Route path="/login/user" element={<LoginForm prop='w-1/3' type='users' path="/login/users" />} />

      <Route path="/signup/admin" element={<SignupForm prop='w-1/3 bg-[#F09A3E]' path='path="/signup/admin"' type='admin' />} />
      <Route path="/login/admin" element={<LoginForm prop='w-1/3 bg-[#d7cabe]' path="/login/admin" type='admin' />} />
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


