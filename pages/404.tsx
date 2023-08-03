
import { NextPage } from 'next'
import { Grid, Typography } from '@mui/material';

export const ErrorPage: NextPage = () => {
    return (
        <Grid container minHeight="100vh" justifyContent="center" alignItems="center">
            <Typography> {"dont even try, lol"} </Typography>
        </Grid>
    )
}
