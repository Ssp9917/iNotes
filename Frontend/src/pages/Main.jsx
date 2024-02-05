import React from 'react'
import Navbar from '../components/navbar/Navbar'
import { Outlet } from 'react-router-dom'


const Main = () => {
  return (
    <>
   
    <div className='lg:flex block'>

    <Navbar/>
    <Outlet/>
    </div>
    </>
  )
}

export default Main 