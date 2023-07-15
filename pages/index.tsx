import Image from 'next/image';
import { Inter } from 'next/font/google'

import { MainLayout } from '@/components';

import { Button, Grid, Typography } from '@mui/material';

const inter = Inter({ subsets: ['latin'] })

const HomePage = () => {
  return (
    <MainLayout>
      <Grid container minHeight="100vh" justifyContent="center" alignItems="center">
        <Grid item xs={6}>
          <Typography variant="h3"> Build Inform Advance </Typography>
          <Typography variant="h6" mb={1}> Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups. </Typography>
          <Button className='custom-btn'>
            Apply For Accelerator
          </Button>
        </Grid>
        <Grid item xs={6}>
          <img src="/ilust-home.svg" alt="Kill a Server" width="100%" />
        </Grid>
      </Grid>
    </MainLayout>
  )
}

export default HomePage;
