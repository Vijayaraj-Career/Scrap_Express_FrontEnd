

import { makeStyles } from '@mui/styles';
import React from 'react'

import { FaCanadianMapleLeaf } from "react-icons/fa";

const useStyles = makeStyles({
    rotatingIcon: {
      animation: '$rotate 3s linear infinite',
    },
    rotatingIcon1: {
      animation: '$rotate1 3s linear infinite',
    },
    '@keyframes rotate': {
      from: {
        transform: 'rotate(0deg)',
      },
      to: {
        transform: 'rotate(360deg)',
      },
    },
    '@keyframes rotate1': {
      from: {
        transform: 'rotate(360deg)',
      },
      to: {
        transform: 'rotate(0deg)',
      },
    },
  });
function Loading() {
    const classes = useStyles();
  return (
    <div className='h-screen w-full flex justify-center items-center'>
        <div className="mt-5 w-full flex flex-col justify-center items-center">
          <div
            className={`flex justify-center items-center p-2 h-[100px] w-[100px]  rounded-lg border-2 border-[#ff0000] ${classes.rotatingIcon1}`}
          />
          <div
            className={`flex justify-center items-center p-3 h-[70px] w-[70px] mt-[-85px]  rounded-lg border-4 border-[#ff0000] ${classes.rotatingIcon}`}
          />
          <FaCanadianMapleLeaf color="#ff0000" style={{ marginTop: '-52px' }} size={30} />
        </div>
    </div>
  )
}

export default Loading;