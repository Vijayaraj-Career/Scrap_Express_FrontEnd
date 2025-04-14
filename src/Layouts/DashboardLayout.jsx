import React, { useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import { Typography } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import DensityMediumIcon from '@mui/icons-material/DensityMedium';

function Dashboard({ menuItem }) {

  const[drawerOpen,setDrawerOpen] = useState(false);
  console.log("drawerOpen",drawerOpen);

  const [openStates, setOpenStates] = useState(Array(menuItem?.length).fill(false));


  const OpenDrawer = () =>{
    setDrawerOpen(!drawerOpen)
  }
  // Toggle open state for a specific menu item
  const toggleSubnav = (index) => {
    setOpenStates(
      (prevStates) =>
        prevStates?.map((state, i) => (i === index ? !state : false)) // Close all other menus
    );
  };

  return (
    <div className="flex h-screen w-screen bg-red-300">
      {/* Sidebar */}
      <div className={`h-screen bg-gray-700 z-[99999] mt-[60px] md:mt-0 fixed md:relative  ${drawerOpen ? "w-[70%] sm:z-20 md:w-0 md:hidden" : "hidden md:w-[20%] md:block"}`}>
        <div className={`flex w-full justify-between h-[60px] bg-slate-500 p-3 ${drawerOpen ? "hidden":""}`}>
          <div className="flex justify-center items-center">logo</div>
          <div className="flex justify-center items-center" onClick={()=>OpenDrawer()}>
          <DensityMediumIcon/>
            </div>
        </div>

        <div className={drawerOpen ? "block md:hidden" : " hidden md:block"}>
          {menuItem?.map((item, index) => (
            <div key={index}>
              <Typography
                component={!item.child ?  Link : 'div'}
                to={item.path} // Link to the parent path
                className="flex items-center justify-between p-2 hover:bg-gray-200 rounded cursor-pointer"
                onClick={()=>item.child && toggleSubnav(index)}
              >
                <div className="flex items-center gap-2">
                  <DashboardCustomizeIcon />
                  <span>{item.title}</span>
                </div>
                {item.child && (openStates[index] ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />)}
              </Typography>

              {/* Render child routes if open */}
              {openStates[index]  &&
                  item.child?.map((child, childIndex) => (
                  <Typography
                    key={childIndex}
                    component={Link}
                    to={child.path} // Link to the nested path
                    className="flex items-center justify-between p-2 pl-8 hover:bg-gray-200 rounded cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span>{child.title}</span>
                    </div>
                  </Typography>
                ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex flex-col h-screen ${drawerOpen ? 'w-full ml-0' : 'w-full md:w-[80%]'} bg-gray-300`}>
        <div className="w-full h-[60px] bg-gray-400 sticky top-0 z-10 flex  items-center justify-between p-2">
          <div className={drawerOpen ? "block" : "md:hidden"}  onClick={()=>OpenDrawer()}>
           <DensityMediumIcon/>
          </div>
          <div>
            Profile
          </div>
        </div>
        <div className="w-full overflow-y-auto">
          <div className="p-4">
            <Outlet /> {/* Render nested routes here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;