import { FC, ReactNode } from "react";
import Head from "next/head";

import { Grid, Container, Box } from '@mui/material';

interface Props {
    title: string,
    children: ReactNode,
}

export const AuthLayout: FC<Props> = ({ children, title }) => {
    return (
        <Box className="bg-auth">
            <Head>
                <title>{title}</title>
                <meta name="og:title" content={title} />
            </Head>

            <main>
                <Container>
                    <Grid container minHeight="100vh">
                        <Grid item xs={6} mt={2}>
                            <img src="/Logo.png" alt="Kill a Server" width="170px" />
                        </Grid>
                        <Grid item xs={6} display="flex" alignItems="center" justifyContent="center">
                            {children}
                        </Grid>
                    </Grid>
                </Container>
            </main>

        </Box>
    )
}
