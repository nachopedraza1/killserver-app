
import { NextPage } from 'next'
import { Grid, Typography } from '@mui/material';

export const ErrorPage: NextPage = () => {
    return (
        <Grid container minHeight="100vh" justifyContent="center" alignItems="center">
            <Typography textAlign="center"> {"don't even try, lol"} </Typography>
        </Grid>
    )
}
