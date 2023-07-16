import { Inter } from 'next/font/google'

import { MainLayout } from '@/components';

import { Button, Grid, Typography } from '@mui/material';

const inter = Inter({ subsets: ['latin'] })

const HomePage = () => {
  return (
    <MainLayout>
      <Grid container minHeight="100vh" justifyContent="center" alignItems="center">
        <Grid item xs={6}>

        </Grid>
        <Grid item xs={6}>
          <Typography variant="h3" textTransform="uppercase"> search and destroy </Typography>
          <Typography variant="h6" mb={1}> Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups. </Typography>
          <Button variant='contained'>
            Apply For Accelerator
          </Button>
          <Button variant='outlined'>
            Apply
          </Button>
        </Grid>
      </Grid>
    </MainLayout>
  )
}

export default HomePage;
