
import { NextPage } from 'next'
import { Grid, Typography } from '@mui/material';

export const ErrorPage: NextPage = () => {
    return (
        <Grid container minHeight="100vh">
            <Typography> {"don't even try, lol"} </Typography>
        </Grid>
    )
}
