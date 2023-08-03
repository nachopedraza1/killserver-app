
import { NextPage } from 'next'
import { Grid, Typography } from '@mui/material';

const ErrorPage: NextPage = () => {
    return (
        <Grid container minHeight="100vh" justifyContent="center" alignItems="center">
            <Typography> {"dont even try, lol"} </Typography>
        </Grid>
    )
}

export default ErrorPage;
