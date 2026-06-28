"use client"
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React from 'react'
import { MdOutlineExplore } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import Link from 'next/link';
import {HiOutlineHome,} from "react-icons/hi2";

const Sidebar = () => {
    const path = usePathname();
    const Menu = [
        {
            id : 1,
            name: 'Home',
            icon : <HiOutlineHome />,
            link: '/dashboard',
        },
        {
            id : 1,
            name: 'Explore',
            icon : <MdOutlineExplore />,
            link: '/dashboard/explore',
        },
        {
            id : 1,
            name: 'Logout',
            icon : <TbLogout />,
            link: '/dashboard/logout',
        }
    ]
  return (
    <div className='fixed md:w-64 h-full p-5 border-r border-neutral-900 bg-black flex flex-col justify-between text-[#E1E0CC]'>
      <div>
        <Link href="/">
          <div className="text-2xl font-bold text-[#E1E0CC] tracking-wide flex items-center p-3 select-none cursor-pointer">
            Prisma<span className="text-primary text-xs ml-0.5 align-super">*</span>
          </div>
        </Link>
        <hr className='my-5 border-neutral-900'/>
        <ul>
            {Menu.map((item,index) => (
                <Link href={item.link} key={index}>
                   <div className={`flex items-center gap-3 p-3 cursor-pointer rounded-lg mb-3 transition-all duration-200 select-none
                     ${path===item.link 
                       ? 'bg-[#212121] text-[#E1E0CC] border border-neutral-800' 
                       : 'text-gray-500 hover:bg-[#151515] hover:text-[#E1E0CC]'
                     }`}>
                     <div className='text-2xl'>{item.icon} </div>
                     <h2 className="text-sm font-medium">{item.name}</h2>
                   </div> 
                </Link>
            ))}
        </ul>
      </div>

      <div className='w-full mb-5' />
    </div>
  )
}

export default Sidebar