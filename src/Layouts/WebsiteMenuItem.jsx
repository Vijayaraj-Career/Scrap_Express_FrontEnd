import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const links = [
  {name:"Image",
  submenu:true,
  sublinks:[
    {
      Head:"Head1",
      Mysublink:[
        {name:"Title1", link:"/"},
        {name:"Title2", link:"/"},
        {name:"Title3", link:"/"}
      ]
    },
    {
      Head:"Head2",
      Mysublink:[
        {name:"Title1", link:"/"},
        {name:"Title2", link:"/"},
        {name:"Title3", link:"/"}
      ]
    },
    {
      Head:"Head3",
      Mysublink:[
        {name:"Title1", link:"/"},
        {name:"Title2", link:"/"},
        {name:"Title3", link:"/"}
      ]
    }

  ]},
  // {name:"Video",
  // submenu:true,
  // sublinks:[
  //   {
  //     Head:"Head1",
  //     Mysublink:[
  //       {name:"Title1", link:"/"},
  //       {name:"Title2", link:"/"},
  //       {name:"Title3", link:"/"}
  //     ]
  //   },
  //   {
  //     Head:"Head2",
  //     Mysublink:[
  //       {name:"Title1", link:"/"},
  //       {name:"Title2", link:"/"},
  //       {name:"Title3", link:"/"}
  //     ]
  //   },
  //   {
  //     Head:"Head3",
  //     Mysublink:[
  //       {name:"Title1", link:"/"},
  //       {name:"Title2", link:"/"},
  //       {name:"Title3", link:"/"}
  //     ]
  //   }

  // ]},
 
]
function NavbarLink() {
  const [open,setOpen]=useState("");
  const [opensubMenu, setOpensubMenu] = useState('');
 
  return (
  <>
  {links.map((link,linkIndex)=>(
    <div key={linkIndex}>
      <div className='px-3 text-left md:cursor-pointer group'>
        <h2 className='py-5 flex justify-between items-center md:pr-0 pr-5 group hover:text-green-400 active:text-red-400 focus:text-[#FF0000]' onClick={()=> {open !== link.name ? setOpen(link.name):setOpen(''); setOpensubMenu('')}}>
          {link.name}
          <span className='text-xl md:hidden inline'>
           {open === link.name ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
          </span>
          <span className='text-xl md:-mt-1 md:ml-2 md:block hidden group-hover:rotate-180'>
            <KeyboardArrowDownIcon/>
          </span>
          </h2>
        {
          link.submenu && 
          (
            <div>
              <div className='absolute top-10 hidden group-hover:md:block hover:md:block'>
                <div className='py-5'>
                  <div className='w-4 h-4 left-3 absolute mt-3 bg-gray-600 rotate-45'>

                  </div>
                </div>
                <div className='bg-gray-600 p-3.5 grid grid-cols-3 gap-10'>
                  {
                    link.sublinks.map((mysublinks,mysublinksIndex)=>(
                      <div key={mysublinksIndex}>
                        <h2 className='text-lg font-semibold'>{mysublinks.Head}</h2>
                        {
                          mysublinks.Mysublink.map((item,index)=>(
                            <li key={index} className='text-sm text-gray my-2.5'>
                              <Link to={item.link} className='hover:text-red-500'>{item.name}</Link>
                            </li>
                          ))
                        }
                      </div>
                    ))
                  }
                </div>
              </div>

              {/* // mobile view */}
              <div className={`${open === link.name ? 'md:hidden':'hidden'}`}>
                {link.sublinks.map((item,sublinksIndex)=>(
                  <div key={sublinksIndex}> 
                    <div>
                      <h1 onClick={()=>opensubMenu !== item.Head ? setOpensubMenu(item.Head):setOpensubMenu("") } 
                      className='py-4 pl-7 font-semibold md:pr-0 pr-5 flex justify-between items-center'>
                        {item.Head}
                        <span className='text-xl md:mt-1 md:ml-2 inline'>
                          {opensubMenu === item.name ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                        </span>
                        </h1>
                      <div className={`${opensubMenu === item.Head ? "md:hidden":"hidden"}`}>
                        {item.Mysublink.map((items,indexs)=>(
                          <li key={indexs} className='py-3 pl-12'>
                            <Link to={items.link} className='hover:text-500'>{items.name}</Link>
                          </li>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        }
      </div>
    </div>
  ))}
  </>
  )
}

export default NavbarLink