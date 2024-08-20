import React from 'react'
import style from './Loading.module.css'
export default function Loading() {
  return (
    <>
    
    <div className='fixed bg-black inset-0 flex justify-center items-center  bg-opacity-25  z-20 dark:bg-opacity-70'>
    <span className={style.loader}>FreshCart </span>
    <i className='fa-solid fa-cart-shopping text-6xl  fa-spin text-main ms-3 ' style={{ "--fa-animation-duration": "5s"}}></i>
    </div>
    </>
  )
}
