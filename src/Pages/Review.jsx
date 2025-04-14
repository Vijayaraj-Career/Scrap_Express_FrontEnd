import { Card, CardContent, Grid, Typography } from "@mui/material";
import {  useInView, useMotionValue, useSpring } from "framer-motion";
import React, { useEffect, useRef } from "react";

const AnimatedNumbers = ({value}) => {
    const ref = useRef(null);
     
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { duration: 3000 })
    const isInView = useInView(ref, {once: true});
     
    useEffect(()=>{
        if(isInView){
            motionValue.set(value);
        }
    }, [isInView, value, motionValue])
     
    useEffect(() => {
        springValue.on("change", (latest) => {
            console.log(latest)
            if(ref.current && latest.toFixed(0) <= value){
                ref.current.textContent = latest.toFixed(0);
            }
        })
    }, [springValue,value])
     
        return <span ref={ref}></span>
    }

export default function Review(){
    return(
        <div className="p-8 md:p-12">
            <Grid container spacing={2}>
              <Grid  size={{ xs: 12, md: 4 }}>
                <Card>
                    <CardContent>
                        <Typography className="flex w-full justify-center" sx={{fontSize:"50px",fontWeight:700}}><AnimatedNumbers value={10}/>+</Typography>
                        <Typography className="flex w-full justify-center">Satisfied Clients</Typography>
                    </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Card>
                    <CardContent>
                        <Typography className="flex w-full justify-center" sx={{fontSize:"50px",fontWeight:700}}><AnimatedNumbers value={10}/>+</Typography>
                        <Typography className="flex w-full justify-center">Project Completed</Typography>
                    </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Card>
                    <CardContent>
                        <Typography className="flex w-full justify-center" sx={{fontSize:"50px",fontWeight:700}}><AnimatedNumbers value={3}/>+</Typography>
                        <Typography className="flex w-full justify-center">Year Of Experience</Typography>
                    </CardContent>
                </Card>
              </Grid>
            </Grid>
        </div>
    )
} 