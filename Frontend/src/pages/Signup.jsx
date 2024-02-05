
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {MainContext} from '../context/Context'

const Signup = () => {
  // useContext
  const {error,success} = useContext(MainContext)


  //* creating three usestate
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // navigate hook
  const navigate = useNavigate()

  //* Create a function
  const signUpHandler = async () => {
    //* Send Data through api
    const res = await fetch('http://localhost:5001/api/auth/signup',
    {
        method:'POST',
        headers: {
            'Content-Type':'application/json',
        },
        body:JSON.stringify({name,email,password})
    }
    ) ;

    //* Receving response
    const signupData = await res.json()


    console.log(signupData)

    // condition
    if(signupData.error){
      error(signupData.error)
      // alert(signupData.error)
    }else{
      success(signupData.success)
      // alert(signupData.success)
      setTimeout(
        ()=>{
          navigate('/login')

        },3000
      )
    }


    setName('')
    setEmail('')
    setPassword('')
  };

  return (
    <div className=" flex justify-center items-center h-screen">
      {/* main div  */}
      <div className=" bg-[#d2cbbf] shadow-md px-10 py-10 rounded-xl ">
        {/* Top Heading  */}
        <div className="">
          <h1 className="text-center text-black text-xl mb-4 font-bold">
            Signup
          </h1>
        </div>
        {/* Input 1 Name  */}
        <div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
            className=" bg-[#beb9b1] border border-red-700 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-black outline-none"
            placeholder="Name"
          />
        </div>
        {/* Input 2 Email  */}
        <div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            className=" bg-[#beb9b1] border border-red-700 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-black outline-none"
            placeholder="Email"
          />
        </div>
        {/* Input 3 Password  */}
        <div>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="bg-[#beb9b1] border border-red-700 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-black outline-none"
            placeholder="Password"
          />
        </div>
        {/* Button For Signup  */}
        <div className=" flex justify-center mb-3">
          <button
            onClick={signUpHandler}
            className=" bg-red-700 w-full text-white font-bold  px-2 py-2 rounded-lg"
          >
            Sign up
          </button>
        </div>
        {/* Link For Login  */}
        <div>
          <h2 className="text-black">
            Have an account{" "}
            <Link className=" text-green-700 font-bold" to={"/login"}>
              Login
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Signup;
