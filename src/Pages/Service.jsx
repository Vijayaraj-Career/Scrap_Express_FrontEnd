import React from 'react'
import styled from "styled-components";
import logo from "../Image/shape-avatar.svg"
import Copper from "../Image/Copper.jpg";
import Brass from "../Image/Brass.jpg";
import Steel from "../Image/Steel.jpg";
import Iron from "../Image/Iron.jpg";
import Aluminimum from "../Image/Aluminimum.jpg";
import Baterry from "../Image/Baterry.jpg";
import Monitor from "../Image/Monitor.jpg";
import Pet from "../Image/Pet.jpg";
import Ac from "../Image/Ac.jpg";
import Mobile from "../Image/Mobile.jpg";
import Washing from "../Image/Washing.png";
import Circuits from "../Image/Circuits.jpg";
import { Grid,  } from '@mui/material';
import {FaCanadianMapleLeaf} from "react-icons/fa";

const Item = styled.div`
display: flex;
justify-content: center;
align-items: center;
//height: auto;
width: 100%;
flex-direction:column;
border-radius:18px;


             `;

const card = [
  {
    img: Copper,
    logo: logo,
    title: "Copper",
    description: 'We have a huge collection of scrap copper that we are willing to sell. Copper materials are used widely in electronic equipment like wiring and motors.',
  },
  {
    img: Brass,
    logo: logo,
    title: "Brass",
    description: 'Brass is an alloy made from copper and zinc. Depending on the amount of each metal used, different types of brasses can be made with varying properties.',
  },
  {
    img: Aluminimum,
    logo: logo,
    title: "Aluminimum",
    description: 'We have a stock of aluminum scraps for sale. We offer our customers a quality aluminum scrap which can meet their all expectations and requirements.',
  },
  {
    img: Steel,
    logo: logo,
    title: "Steel",
    description: 'Steel scrap is metal which contains iron and can be processed and re-melted repeatedly to form new products2.',
  },
  {
    img: Iron,
    logo: logo,
    title: "Iron",
    description: 'Iron and steel are very popular and useful materials that are used in a variety of things.',
  },
  {
    img: Baterry,
    logo: logo,
    title: "Battery",
    description: 'we buy old battery scrap, UPS battery, inverter battery, lead acid battery, sealed battery motor bike battery, genset battery.',
  },
  {
    img: Monitor,
    logo: logo,
    title: "Computer",
    description: 'We are a well-known and well-established company in this computer and IT scrap field. We have acquired almost every type of Computer & IT scrap.',
  },
  {
    img: Pet,
    logo: logo,
    title: "Pet Bottle",
    description: 'Discarded PET bottles are collected, sorted, cleaned, shredded, and made into ‘washed flakes,’ which are then used to produce a variety of products.',
  },
  {
    img: Mobile,
    logo: logo,
    title: "Mobile",
    description: 'Recycling your unwanted mobile phones means that the valuable resources in your mobile phone, such as silver and gold, can be reused again. ',
  },
  {
    img: Ac,
    logo: logo,
    title: "AC",
    description: 'The process typically involves dismantling the unit to extract valuable materials such as copper, aluminum, and steel.',
  },
  {
    img: Washing,
    logo: logo,
    title: "Washing Machine",
    description: 'Our advanced facilities and skilled team work to maximize the value of washing machine scrap, transforming it into high-quality recycled materials ready for reuse. ',
  },
  {
    img: Circuits,
    logo: logo,
    title: "Circuits",
    description: 'Used electronics which are destined for refurbishment, reuse, resale, salvage recycling through material recovery, or disposal are also considered e-waste',
  },
]
function Service() {

  return (
    <div className='p-12 pt-32 bg-gray-200' >
      <Grid container spacing={2}>
        {card.map((item, index) => (

          <Grid size={{ xs: 12, md: 3 }} key={index}>
            <Item >
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
                  <img alt="ima" src={item.logo} style={{ fontSize: "30px" }} />
                </div>
                <div className="mt-[-30px] ml-[37px] h-[70px] w-[70px] rounded-full bg-gray-200 absolute flex items-center justify-center">
                <FaCanadianMapleLeaf  size={30} color='#ff0000'/>
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

          </Grid>

        ))}
      </Grid>
    </div>
  )
}

export default Service