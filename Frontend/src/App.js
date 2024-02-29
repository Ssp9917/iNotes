import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./pages/Main";
import Home from "./pages/Home";
import Login from "./pages/Login";
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
          element:<ProtectedRoutes>
          <Home/>
          </ProtectedRoutes>
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

export const ProtectedRoutes = ({children}) =>{
  if(localStorage.getItem('token')){
    return children
  }else{
    return <Navigate to='/login'/>
  }
}
