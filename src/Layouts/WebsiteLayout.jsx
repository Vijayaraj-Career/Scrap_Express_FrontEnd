
import React, { useEffect, useState } from 'react'
import { FaCanadianMapleLeaf } from "react-icons/fa";
import { Link,  Outlet, useLocation, useNavigate } from 'react-router-dom';
//import NavbarLink from "./NavbarLink";
import { Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

function WebsiteLayout() {
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate()
  useEffect(() => {
    // Store the active link in local storage
    localStorage.setItem('activeLink', pathname);
  }, [pathname]);

  const defaultPath = pathname ? pathname : '/';

  return (
    <>
      <nav className='bg-[#22474d] fixed w-full z-20'>
        <div className='flex items-center justify-around font-medium'>
          <div className='z-50 p-5 md:w-auto w-full flex justify-between'>
            <FaCanadianMapleLeaf className='md:cursor-pointer h-9' size={30} color='#ff0000' />
            <div className='flex justify-center items-center md:hidden' onClick={() => setOpen(!open)}>
              {open ? (<CloseIcon fontSize="large" />) : (<MenuIcon fontSize="large" />)}
            </div>

          </div>
          <ul className='md:flex hidden uppercase items-center gap-2'>
            <li>
              <Link to="/" className={`py-7 px-3 inline-block hover:text-green-400 focus:text-[#FF0000] ${defaultPath === '/' ? 'text-[#FF0000]' : ''
                }`}>Home</Link>
              <Link to="/service" className={`py-7 px-3 inline-block hover:text-green-400 focus:text-[#FF0000] ${defaultPath === '/service' ? 'text-[#FF0000]' : ''
                }`}>Our Service</Link>


              <Link to="/image" className={`py-7 px-3 inline-block hover:text-green-400 focus:text-[#FF0000]
             ${pathname === '/image' ? 'text-[#FF0000]' : ''
                }`}>Image</Link>
                <Link to="/branch" className={`py-7 px-3 inline-block hover:text-green-400 focus:text-[#FF0000] ${defaultPath === '/branch' ? 'text-[#FF0000]' : ''
                }`}>Branch</Link>
              <Link to="/contact" className={`py-7 px-3 inline-block hover:text-green-400 focus:text-[#FF0000] ${defaultPath === '/contact' ? 'text-[#FF0000]' : ''
                }`}>Contact</Link>
            </li>
            {/* <NavbarLink/> */}
            <li>
              <Link to="/about" className={`py-7 px-3 inline-block hover:text-green-400 focus:text-[#FF0000]  ${pathname === '/about' ? 'text-[#FF0000]' : ''
                }`}>Abouts</Link>
            </li>
          </ul>
          <div className='md:block hidden'>
            <Button variant="outlined" onClick={() => navigate('/login')}>LOGIN</Button>
          </div>

          {/* // mobile view */}
          <ul className={`md:hidden fixed h-full w-full bg-gray-700 bottom-0 py-0 pl-4 duration-500 top-[76px] ${open ? "left-0" : "left-[-100%]"}`}>
            <li className='flex flex-col'>
              <Link to="/" className={`py-3 px-3 inline-block hover:text-green-400 focus:text-[#FF0000] ${defaultPath === '/' ? 'text-[#FF0000]' : ''
                }`} onClick={() => setOpen(false)}>Home</Link>
              <Link to="/service" className={`py-3 px-3 inline-block hover:text-green-400 focus:text-[#FF0000] ${defaultPath === '/service' ? 'text-[#FF0000]' : ''
                }`} onClick={() => setOpen(false)}>Our Service</Link>


              <Link to="/image" className={`py-3 px-3 inline-block hover:text-green-400 focus:text-[#FF0000] ${pathname === '/image' ? 'text-[#FF0000]' : ''
                }`} onClick={() => setOpen(false)}>Image</Link>
              <Link to="/contact" className={`py-3 px-3 inline-block hover:text-green-400 focus:text-[#FF0000] ${defaultPath === '/contact' ? 'text-[#FF0000]' : ''
                }`} onClick={() => setOpen(false)}>Contact</Link>
                   <Link to="/branch" className={`py-7 px-3 inline-block hover:text-green-400 focus:text-[#FF0000] ${defaultPath === '/Branch' ? 'text-[#FF0000]' : ''
                }`} onClick={() => setOpen(false)}>Branch</Link>
            </li>
            {/* <NavbarLink/> */}
            <li className='flex flex-col'>
              <Link to="/about" className={`py-3 px-3 inline-block hover:text-green-400 active:text-red-400 focus:text-[#FF0000] ${pathname === '/about' ? 'text-[#FF0000]' : ''
                }`} onClick={() => setOpen(false)}>About</Link>
            </li>
            <div className='py-5 '>
              <Button onClick={() => navigate('/login')} variant="outlined">LOGIN</Button>
            </div>
          </ul>

          {/* // mobile view */}
        </div>
      </nav>
      <Outlet />
    </>


  )
}

export default WebsiteLayout