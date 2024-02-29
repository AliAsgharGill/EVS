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
import Vote from "./pages/Vote/Vote";
import Login from "./pages/SignInPage/SignIn";
import Signup from "./pages/SignupPage/Signup";
import CampaignPage from "./pages/CampaignPage"
import NoMatch from "./pages/NoMatch/Index";
import UserDetails from "./pages/UserDetails/Index";



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index path="/" element={<Home />} />
      <Route path="/candidates" element={<CandidateList />} />
      <Route path="/vote" element={<Vote />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/campaigns" element={<CampaignPage />} >
        <Route path=":userId" element={<UserDetails />} />
      </Route>
      <Route path="*" element={<NoMatch />} />
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


