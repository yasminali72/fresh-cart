import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'

export default function Layout() {
  return (
   <>
   <NavBar/>
   <div className='container py-12 mt-20 mx-auto  xl:w-[90%] '>
   <Outlet />
   </div>
   <Footer/>
   
   
   </>
  )
}
