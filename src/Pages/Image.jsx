import { Grid,Card} from '@mui/material'
import React from 'react'

import img5 from "../Image/life_at_prowesstics_36.jpg"


const Images = [
 
  {
    img:img5
  },
]

function Image() {
  return (
    <div className='pt-24 pr-5 pl-5'>
      <Grid container spacing={2}>
        {
          Images.map((item, index)=>(
            <Grid size={{ xs: 12, md: 4 }}  key={index}>
            <Card
            className='h-[300px] w-full' style={{
              backgroundImage: `url(${item.img})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100% 100%',
            }}/>
  
            
          </Grid>
          ))
        }
       

      </Grid>
    </div>
  )
}

export default Image