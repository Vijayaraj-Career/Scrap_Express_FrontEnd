import React from 'react'
import About from './About';
//import backgroundImage from '../Image/backgroundImage.jpg';
import backgroundImage from '../Image/bg-2.jpg'
import truck from "../Image/truck.png"
import {Grid} from '@mui/material';
import Service from './Service';
import { motion } from 'framer-motion';





function Home() {
 
  return (
    <>
    <div className='h-screen w-full bg-zinc-200'>
      <div className='pt-24 w-full h-screen' style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
              }}>
        <Grid container spacing={2}>
         <Grid size={{ xs: 12, md: 6 }} component={motion.div}
                  initial={{ x: -500 }}
                  animate={{ x: 0 }}
                  transition={{ duration: 0.9, bounceDamping: 0 }}  sx={{display:"flex", justifyContent:"center", alignItems:"center",flexDirection:'column',height:"auto"}}>
           <h1 className='flex justify-center w-full text-[40px] md:text-[70px] md:mt-[60px] text-red-600 font-bold'>E - WASTE</h1>
           <h1 className='flex justify-center w-full text-[40px] md:text-[70px] text-red-600 font-bold'>DEALERS</h1>
           <p className='flex justify-center w-full font-bold text-gray-200'>We have expert buyers of scrap which</p>
           <p className='flex justify-center w-full font-bold text-gray-200'>are paying valueable price according to</p>
           <p className='flex justify-center w-full font-bold text-gray-200'>you scrap items</p>
         </Grid>
         <Grid size={{ xs: 12, md: 6 }} component={motion.div}
                  initial={{ x: 500 }}
                  animate={{ x: 0 }}
                  transition={{ duration: 0.9, bounceDamping: 0 }}>
             <img className='rotate-0' src={truck} alt='truck.png'/>
         </Grid>
        </Grid>
      </div>
      
    </div> 
    <Service/>
    <About/>
    </>
   
  )
}

export default Home