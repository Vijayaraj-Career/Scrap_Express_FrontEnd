import React from 'react'
import Carousel from "react-elastic-carousel";
import styled from "styled-components";
import logo from "../Image/shape-avatar.svg"
import img1 from "../Image/img2.jpg"
import PostgreSql from "../Image/PostgreSQL.svg";
import ReactImg from "../Image/React.png";
import Nodejs from "../Image/Nodejs.png";
import Html from "../Image/html.png";
import TailwindCss from "../Image/Tailwind.png";
import JavaScript from "../Image/JS.png";
import MongoDb from "../Image/MongoDB.png";
import NextJs from "../Image/Nextjs.png";
import MUI from "../Image/MUI.png";
import Redux from "../Image/redux.png"
import "../Style/Technology.css";
import { Typography } from '@mui/material';


const Item = styled.div`
display: flex;
justify-content: center;
align-items: center;
//height: auto;
width: 100%;
flex-direction:column;
border-radius:18px;
margin: 0 15px;

             `;

const card = [
  {
    img:img1,
    icon:NextJs,
    logo:logo,
    title:"Next Js",
    description:'Next.js is a React framework for building full-stack web applications. You use React Components to build user interfaces.',
  },
  {
  img:img1,
  icon:ReactImg,
  logo:logo,
  title:"React Js",
  description:'ReactJS is an open-source JavaScript library used to create user interfaces in a declarative and efficient way',
},
{
  img:img1,
  icon:MUI,
  logo:logo,
  title:"MUI",
  description:' Material UI is an open-source React component library that implements Google Material Design',
},
{
  img:img1,
  icon:Redux,
  logo:logo,
  title:"Redux",
  description:'Redux is a JS library for predictable and maintainable global state management',
},
{
  img:img1,
  logo:logo,
  icon:Nodejs,
  title:"Node Js",
  description:'Node.js is a cross-platform runtime environment and library for running JavaScript applications outside the browser',
},
{
  img:img1,
  logo:logo,
  icon:PostgreSql,
  title:"PostgreSql",
  description:'PostgreSQL is one of the most advanced general-purpose object-relational database management system and is open-source. ',
},
{
  img:img1,
  logo:logo,
  icon:MongoDb,
  title:"MongoDB",
  description:'PostgreSQL is one of the most advanced general-purpose object-relational database management system and is open-source. ',
},
{
  img:img1,
  logo:logo,
  icon:Html,
  title:"HTML",
  description:'The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.',
},
{
  img:img1,
  logo:logo,
  icon:TailwindCss,
  title:"Css/Bootstrap/TailwindCss",
  description:'Tailwind CSS is basically a utility-first CSS framework for rapidly building custom user interfaces',
},
{
  img:img1,
  logo:logo,
  icon:JavaScript,
  title:"JavaScript",
  description:'JavaScript is a lightweight, cross-platform, single-threaded, and interpreted compiled programming language',
},
]


function Technology() {
    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 2 },
        { width: 768, itemsToShow: 3 },
        { width: 1200, itemsToShow: 4 },
    ];
  return (
    <div className='h-2/3 w-full bg-gray-200 p-8 pt-24'>
        <Typography variant='h5' fontWeight="bold" className='flex items-center justify-center font-bold' style={{ marginBottom: '25px' }}>Technology</Typography>
        <Carousel breakPoints={breakPoints}>
          {card.map((item, index)=>(
            <Item key={index}>

            <div
              className="h-[200px] w-full rounded-t-2xl"
              style={{
                backgroundImage: `url(${item.img})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
              }}
            />
            <div className="h-[250px] w-full rounded-b-2xl bg-white">
              <div className="mt-[-36px] absolute">
                <img alt="ima" src={item.logo} style={{fontSize:"30px"}} />
              </div>
              <div className="mt-[-30px] ml-[37px] h-[70px] w-[70px] rounded-full bg-gray-200 absolute flex items-center justify-center">
                <img src={item.icon} alt="logo" className='w-10 h-10'/>
              </div>
              <div className='w-full mt-5 p-5'>
                <h3 className='text-2xl font-bold'>
                  {item.title}
                </h3>
              </div>
              <div className='w-full p-5 mt-[-14px]'>
                <h6>{item.description}</h6>
              </div>
            </div>

          </Item>
          ))}
        </Carousel>
        </div>
  )
}

export default Technology