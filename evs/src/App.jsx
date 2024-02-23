// import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Routes,
  Link,
} from "react-router-dom";

import "./App.css";
//Pages
import CandidateList from "./pages/CandidatesList/CandidatesList";
import Home from "./pages/Home/Home";
import Vote from "./pages/Vote/Vote";

//Layout
import Layout from "./layout/Layout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index path="/" element={<Home />} />
      <Route path="/candidates" element={<CandidateList />} />
      <Route path="/vote" element={<Vote />} />
    </Route>
  )
  // [
  // {
  //   path: "/",
  //   element: <Home />
  // },
  // {
  //   path: "candidates",
  //   element: <CandidateList />
  // },
  // {
  //   path: "about",
  //   element: <div>About</div>,
  // },
  // ]
);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;


