import { Button, Card, CardContent, Grid, Typography } from '@mui/material'
import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function Branch() {
  return (
    <div className='p-12 pt-32' >
   <Grid container spacing={2}>
        <Grid  size={{ xs: 12, md: 4 }} >
          <Card>
            <CardContent>
              <div className="w-full">
                <AccountCircleIcon sx={{ fontSize: '120px' }} />
              </div>
              <Typography variant="h5" sx={{ marginTop: '20px' }}>
                Title
              </Typography>
              <div className="w-full mt-10">
                <Typography>Address -1</Typography>
                <Typography>Address -2</Typography>
                <Typography>Address -3</Typography>
                <Typography>Address -4</Typography>
              </div>
              <div className="w-full flex justify-end mt-10">
                <Button startIcon={<LocationOnIcon />} variant="contained" className="rounded-md">
                  Map
                </Button>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}
