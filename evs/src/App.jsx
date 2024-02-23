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
import Login from "./pages/LoginPage/Login";
import Signup from "./pages/Signup/Signup";



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index path="/" element={<Home />} />
      <Route path="/candidates" element={<CandidateList />} />
      <Route path="/vote" element={<Vote />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
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


