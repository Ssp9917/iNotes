import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./pages/Main";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AddNote from "./pages/AddNote";
import UpdateNote from "./pages/UpdateNote";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";


function App() {

  const router = createBrowserRouter([
    {
      path:'/',
      element:<Main/>,
      children:[
        {
          path:'',
          element:<Home/>
        },
        {
          path:'addnote',
          element:<AddNote/>
        },
        {
          path:'updatenote',
          element:<UpdateNote/>
        },
        {
          path:'profile',
          element:<Profile/>
        },
        {
          path:'signup',
          element:<Signup/>
        },
        {
          path:'login',
          element:<Login/>
        },
      ]
    }
  ])

  return (
   <RouterProvider router={router}>
    
   </RouterProvider>
  );
}

export default App;
