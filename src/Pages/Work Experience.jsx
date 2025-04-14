import { Button, Card,CardContent, Grid, Typography } from '@mui/material'
import React from 'react'
import img2 from "../Image/work2.png"
import CallCampaign from "../Image/CallCampaign.png";
import CHA from "../Image/CHA.jpg";
import ERP from "../Image/logistics-2.jpg";
import NVOCC from "../Image/Shpping.jpg";
import { motion } from 'framer-motion';
import CRM from "../Image/CRM.jpg";



function WorkExperience() {
  return (
    <div className='pt-24 pl-6 pr-6'>
       
        <Grid container spacing={6}>
          <Grid  size={{xs:12}}>
          <Card style={{border:"solid 1px",boxShadow:"8px 8px #000000", borderRadius:"20px"}}>
            <CardContent>
              <Grid container spacing={4}>
                <Grid size={{xs:12, md:6}}  component={motion.div} whileHover={{scale:1.02}} transition={{duration:0.2}}>
                <img className='mt-3 rounded-[15px] w-full h-[350px]' src={CHA}  alt='email.jpg'/>
                </Grid>
                <Grid  size={{xs:12, md:6}}>
                  <Typography sx={{fontSize:"30px",fontWeight:700,marginBottom:"20px"}} className='w-full'>Custom Clearance</Typography>
                  <Typography sx={{fontWeight:500,marginBottom:"20px"}} className='w-full'>Customs clearance is the process of clearing goods for import or export through customs. It's a mandatory step that involves a series of documentation and regulatory requirements to ensure compliance with local and international laws</Typography>
                  <Button sx={{backgroundColor:"#000000",
                     ":   hover": {
                    backgroundColor: "#E0E0E0",
                    color: "#000000",
                    }}}  variant='contained'>Visit Project</Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          </Grid>
          <Grid size={{xs:12, md:6}}>
          <Card style={{border:"solid 1px",boxShadow:"8px 8px #000000", borderRadius:"20px"}}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid size={{xs:12}}  component={motion.div} whileHover={{scale:1.02}} transition={{duration:0.2}}>
                <img className='rounded-[15px]' src={ERP} alt='email.jpg'/>
                </Grid> 
                <Grid size={{xs:12}}>
                <Typography  sx={{fontWeight:700,fontSize:"30px"}}>Shipping ERP</Typography>
                <Typography  sx={{fontWeight:700,fontSize:"12px",marginTop:"10px"}}>ERP in Logistics</Typography>
                <Button sx={{backgroundColor:"#000000",
                    marginTop:"10px",
                     ":   hover": {
                    backgroundColor: "#E0E0E0",
                    color: "#000000",
                    }}}  variant='contained'>Visit</Button>
                </Grid> 
              </Grid>
            </CardContent>
          </Card>
          </Grid>
          <Grid size={{xs:12,md:6}}>
          <Card style={{border:"solid 1px",boxShadow:"8px 8px #000000", borderRadius:"20px"}}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid   size={{xs:12}}  component={motion.div} whileHover={{scale:1.02}} transition={{duration:0.2}}>
                <img style={{height:370}} className='rounded-[15px]' src={NVOCC} alt='email.jpg'/>
                </Grid> 
                <Grid size={{xs:12}}>
                <Typography  sx={{fontWeight:700,fontSize:"30px"}}>NVOCC</Typography>
                <Typography  sx={{fontWeight:700,fontSize:"12px",marginTop:"10px"}}>Transportation Services</Typography>
                <Button sx={{backgroundColor:"#000000",
                    marginTop:"10px",
                     ":   hover": {
                    backgroundColor: "#E0E0E0",
                    color: "#000000",
                    }}}  variant='contained'>Visit</Button>
                </Grid> 
              </Grid>
            </CardContent>
          </Card>
          </Grid>
          <Grid size={{xs:12}}>
          <Card style={{border:"solid 1px",boxShadow:"8px 8px #000000", borderRadius:"20px"}}>
            <CardContent>
              <Grid container spacing={4}>
                <Grid  size={{xs:12,md:6}} component={motion.div} whileHover={{scale:1.02}} transition={{duration:0.2}}>
                <img className='mt-3 rounded-[15px] w-full h-[350px]' src={CRM}  alt='email.jpg'/>
                </Grid>
                <Grid  size={{xs:12,md:6}}  >
                  <Typography sx={{fontSize:"30px",fontWeight:700,marginBottom:"20px"}} className='w-full'>CRM</Typography>
                  <Typography sx={{fontWeight:500,marginBottom:"20px"}} className='w-full'>Customer Relationship Management is a system that helps businesses manage their interactions with customers. The goal of CRM is to improve customer relationships and grow a business.</Typography>
                  <Button sx={{backgroundColor:"#000000",
                     ":   hover": {
                    backgroundColor: "#E0E0E0",
                    color: "#000000",
                    }}}  variant='contained'>Visit Project</Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          </Grid>
          <Grid  size={{xs:12}} >
          <Card style={{border:"solid 1px",boxShadow:"8px 8px #000000", borderRadius:"20px"}}>
            <CardContent>
              <Grid container spacing={4}>
                <Grid style={{display:"flex", justifyContent:"center"}} item xs={12} md={6} component={motion.div} whileHover={{scale:1.02}} transition={{duration:0.2}}>
                <img className='mt-3 rounded-[15px] w-full h-[300px]' src={img2} alt='email.jpg'/>
                </Grid>
                <Grid size={{xs:12,md:6}} >
                  <Typography sx={{fontSize:"30px",fontWeight:700,marginBottom:"20px"}} className='w-full'>Email Campaign</Typography>
                  <Typography sx={{fontWeight:500,marginBottom:"20px"}} className='w-full'>Our email marketing platform makes it easy for marketers in any type of business to send professional, engaging marketing emails.  From drag and drop editors to powerful automations and developer APIs, Mailchimp is built to help you sell more—no matter the complexity of your business</Typography>
                  <Button sx={{backgroundColor:"#000000",
                     ":   hover": {
                    backgroundColor: "#E0E0E0",
                    color: "#000000",
          
                    }}}  variant='contained'>Visit Project</Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          </Grid>
          <Grid size={{xs:12,md:6}} >
          <Card style={{border:"solid 1px",boxShadow:"8px 8px #000000", borderRadius:"20px"}}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid size={{xs:12}}  component={motion.div} whileHover={{scale:1.02}} transition={{duration:0.2}}>
                <img className='rounded-[15px]' src={CallCampaign} alt='email.jpg'/>
                </Grid> 
                <Grid size={{xs:12}} >
                <Typography  sx={{fontWeight:700,fontSize:"30px"}}>Call Campaign</Typography>
                <Typography  sx={{fontWeight:700,fontSize:"12px",marginTop:"10px"}}>Call Tracking Report</Typography>
                <Button sx={{backgroundColor:"#000000",
                    marginTop:"10px",
                     ":   hover": {
                    backgroundColor: "#E0E0E0",
                    color: "#000000",
                    }}}  variant='contained'>Visit</Button>
                </Grid> 
              </Grid>
            </CardContent>
          </Card>
          </Grid>
          <Grid size={{xs:12,md:6}} >
          <Card style={{border:"solid 1px",boxShadow:"8px 8px #000000", borderRadius:"20px"}}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid size={{xs:12}}   component={motion.div} whileHover={{scale:1.02}} transition={{duration:0.2}}>
                <img className='rounded-[15px]' src={CallCampaign} alt='email.jpg'/>
                </Grid> 
                <Grid  size={{xs:12}} >
                <Typography  sx={{fontWeight:700,fontSize:"30px"}}>Social Campaign</Typography>
                <Typography  sx={{fontWeight:700,fontSize:"12px",marginTop:"10px"}}>Social Media Tracking Report</Typography>
                <Button sx={{backgroundColor:"#000000",
                    marginTop:"10px",
                     ":   hover": {
                    backgroundColor: "#E0E0E0",
                    color: "#000000",
                    }}}  variant='contained'>Visit</Button>
                </Grid> 
              </Grid>
            </CardContent>
          </Card>
          </Grid>
        </Grid>
        </div>
  )
}

export default WorkExperience