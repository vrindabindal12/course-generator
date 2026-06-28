"use client"
import React from 'react'
import Sidebar from './_components/Sidebar'
import Header from './_components/Header'
import { UserCourseListContext } from "../_context/UserCourseListContext";
import { useState } from "react";

const DashboardLayout = ({children}) => {
  const [userCourseList, setUserCourseList] = useState([]);
  return (
    <UserCourseListContext.Provider
    value={{ userCourseList, setUserCourseList }}
  >
    <div className='bg-black min-h-screen relative'>
      {/* Background noise overlay for style unification */}
      <div className="fixed inset-0 bg-noise opacity-[0.04] pointer-events-none z-30" />
      <div className='md:w-64 hidden md:block'>
        <Sidebar/>
      </div>
      <div className='md:ml-64 bg-black min-h-screen text-[#E1E0CC]'>
        <Header/>
        <div className='p-10'>
          {children}
        </div>
        
      </div>
        
    </div>
    </UserCourseListContext.Provider>
  )
}

export default DashboardLayout