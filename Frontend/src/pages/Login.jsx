import React, { useContext, useState } from 'react'
import { Link, json, useNavigate } from 'react-router-dom'
import { MainContext } from '../context/Context'
import axios from 'axios'

const Login = () => {
// context
const {success,error} = useContext(MainContext)


//* create useState hook
const [email,setEmail] = useState('')  
const [password, setPassword] = useState('');

// navigate
const navigate = useNavigate() 

const {openToast,API_BASE_URL,USER_BASE_URL} = useContext(MainContext)

const loginHandler =  () => {

    axios.post(API_BASE_URL+USER_BASE_URL+'/login',{email,password}).then(
        (success)=>{
            if(success.data.status){
                openToast(success.data.msg,'success')
                localStorage.setItem('token',success.data.token)
                navigate('/')
              }else{
                openToast(success.data.msg,'error')
              }
        }
    ).catch(
        (err)=>{
           console.log(err)
        }
    )
  
}


  return (
    <div className='mx-auto my-48'>
            {/* main div  */}
            <div className=' bg-[#d2cbbf] shadow-md px-10 py-10 rounded-xl '>
                {/* Top Heading  */}
                <div className="">
                    <h1 className='text-center text-black text-xl mb-4 font-bold'>Login</h1>
                </div>
                {/* Input 1 Email  */}
                <div>
                    <input 
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        type="email"
                        name='email'
                        className=' bg-[#beb9b1] border border-green-700 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-black outline-none'
                        placeholder='Email'
                    />
                </div>
                {/* Input 2 Password  */}
                <div>
                    <input
                     value={password}
                     onChange={(e)=>setPassword(e.target.value)}
                        type="password"
                        className='bg-[#beb9b1] border border-green-700 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-black outline-none'
                        placeholder='Password'
                    />
                </div>
                {/* Button For Login  */}
                <div className=' flex justify-center mb-3'>
                    <button
                        onClick={loginHandler}
                        className=' bg-green-700 w-full text-white font-bold  px-2 py-2 rounded-lg'>
                            Login
                    </button>
                </div>
                {/* Link for Signup  */}
                <div>
                    <h2 className='text-black'>Don't have an account <Link className=' text-red-700 font-bold' to={'/signup'}>Signup</Link></h2>
                </div>
            </div>
        </div>

  )
}

export default Login