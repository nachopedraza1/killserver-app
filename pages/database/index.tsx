import { NextPage } from "next";

import { MainLayout } from "@/components";

import { Button, Grid, Typography } from "@mui/material";

const DatabasePage: NextPage = () => {

    return (
        <MainLayout bgClass='bg-main'>
            <Grid container minHeight="100vh" justifyContent="center" alignItems="center" textAlign="center">
                <Grid item xs={6}>
                    <Grid container direction="column" gap={2}>
                        <Typography variant="h3" textTransform="uppercase" color="primary.main"> server list </Typography>
                        <span className="line"></span>
                        <Typography variant="h6" mb={2}>if you do not find what you are looking for in our database, you can send a request for our experts to analyze the desired server and add it to our database.</Typography>
                    </Grid>
                    <Button variant='outlined' sx={{ mr: 2 }}>
                        Add server
                    </Button>
                    <Button variant='contained' >
                        contact us
                    </Button>
                </Grid>
            </Grid>

            <Grid container minHeight="100vh" className="bg-servers">

            </Grid>
        </MainLayout>
    )
}

export default DatabasePage;