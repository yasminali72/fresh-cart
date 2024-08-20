import React, { useContext } from 'react'
import { AuthContext } from '../../Contexts/AuthContext'
import Home from '../Home/Home'
import { Navigate } from 'react-router-dom'

export default function ProdectAuthRoute({children}) {
   let{userToken}= useContext(AuthContext)
  return (
    <>
    {!userToken?children:<Navigate to={'/'}/>}
    
    
    </>
  )
}
