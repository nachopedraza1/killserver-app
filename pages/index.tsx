import Image from 'next/image';
import { ClientStats, MainLayout, SliderGames } from '@/components';
import { Box, Button, Grid, Typography } from '@mui/material';

const HomePage = () => {

  return (
    <MainLayout title='Home'>

      <Grid container minHeight="100vh" justifyContent="center" alignItems="center">
        <Grid item xs={6} >
        </Grid>
        <Grid item xs={6}>
          <Grid container direction="column" gap={1}>
            <Image src="/miniilust.png" alt='Kill a server' width={115} height={20} />
            <Typography variant="h3" textTransform="uppercase" color="primary.main"> search and destroy </Typography>
            <Typography variant="h6" mb={2}>Explore our database of breached servers by our experts, we have the best and unique system penetration techniques, start destroying your competition.</Typography>
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
        <SliderGames />
      </Grid>

      <Grid container justifyContent="center" alignItems="center" mt={5}>
        <Grid item xs={6}>
          <Grid container direction="column" gap={1}>
            <Image src="/miniilust.png" alt='Kill a server' width={115} height={20} />
            <Typography variant="h3" textTransform="uppercase" color="primary.main"> about us </Typography>
            <Typography variant="h6" mb={2}> Our expertise is programming, executing exploits, creating DDOS attacks and cloning or extracting information from databases, we like the challenge of doing things where most others give up. </Typography>
          </Grid>
          <Button variant='outlined' sx={{ mr: 2 }}>
            contact us
          </Button>
        </Grid>
        <Grid item xs={6} textAlign="center" position="relative">
          <Box width="80%" height={330}>
            <Image src="/ilust-home2.png" alt='Kill a server database' fill objectFit='contain' />
          </Box>
        </Grid>
      </Grid>

      <ClientStats />

      <Grid container justifyContent="center" alignItems="center" mt={5} gap={5}>
        <Grid item xs={12} textAlign="center">
          <Typography variant="h3" textTransform="uppercase" color="primary.main" mb={2}> our team </Typography>
          <span className="line" ></span>
        </Grid>
        <Grid item xs={2.6} className="team-card">
          <Typography variant="h6">Vladmir</Typography>
          <Typography>DDOS Expert</Typography>
        </Grid>
        <Grid item xs={2.6} className="team-card">
          <Typography variant="h6">Cracket</Typography>
          <Typography>XSS Expert</Typography>
        </Grid>
        <Grid item xs={2.6} className="team-card">
          <Typography variant="h6">Secret</Typography>
          <Typography>SQLI  expert</Typography>
        </Grid>
        <Grid item xs={2.6} className="team-card">
          <Typography variant="h6">XZT</Typography>
          <Typography>SQLI  expert</Typography>
        </Grid>
      </Grid>
    </MainLayout >
  )
}

export default HomePage;
