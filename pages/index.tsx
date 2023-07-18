import Image from 'next/image';
import { MainLayout } from '@/components';
import { Button, Grid, Typography } from '@mui/material';

import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

const HomePage = () => {
  return (
    <MainLayout bgClass='bg-main'>

      <Grid container minHeight="100vh" justifyContent="center" alignItems="center" className="bg-home">

        <Grid item xs={6} >
        </Grid>

        <Grid item xs={6}>
          <Grid container direction="column" gap={1}>
            <Image src="/miniilust.png" alt='Kill a server' width={115} height={20} />
            <Typography variant="h3" textTransform="uppercase" color="primary.main"> search and destroy </Typography>
            <Typography variant="h6" mb={1}> Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups. </Typography>
          </Grid>
          <Button variant='outlined' sx={{ mr: 2 }}>
            Learn more
          </Button>
          <Button variant='contained' >
            register
          </Button>
        </Grid>

      </Grid>

      <Grid container justifyContent="center" alignItems="center" className="bg-home">

        <Grid item xs={12} textAlign="center">
          <Typography variant="h3" textTransform="uppercase" color="primary.main" mb={4}> we work on </Typography>


          <Slide slidesToShow={4} infinite>
            <Grid className="box-game each-slide-effect">
              <img src="/wow.png" width="100%" />
            </Grid>
            <Grid className="box-game each-slide-effect">
              <img src="/muonline.png" width="100%" />
            </Grid>
            <Grid className="box-game each-slide-effect">
              <img src="/aion.png" width="100%" />
            </Grid>
            <Grid className="box-game each-slide-effect">
              <img src="/cabal.png" width="100%" />
            </Grid>
            <Grid className="box-game each-slide-effect">
              <img src="/lineage2.png" width="100%" />
            </Grid>
          </Slide>

          {/* <Grid container justifyContent="center" alignItems="center" gap={3}>
            <Grid item xs={2.8} className="box-game">
              <img src="/wow.png" width="100%" />
            </Grid>
            <Grid item xs={2.8} className="box-game">
              <img src="/muonline.png" width="100%" />
            </Grid>
            <Grid item xs={2.8} className="box-game">
              <img src="/aion.png" width="100%" />
            </Grid>
            <Grid item xs={2.8} className="box-game">
              <img src="/cabal.png" width="100%" />
            </Grid>
          </Grid> */}
        </Grid>
      </Grid>

    </MainLayout>
  )
}

export default HomePage;
