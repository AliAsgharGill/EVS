// import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  // Route,
  Link,
} from "react-router-dom";

import "./App.css";
import CandidateList from "./components/CandidatesList";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />    
  },
  {
    path: "candidates",
    element: <CandidateList  />
  },
  {
    path: "about",
    element: <div>About</div>,
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;


