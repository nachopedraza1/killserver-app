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
                    <Grid container minHeight="100vh" overflow="hidden">
                        <Grid item xs={6} mt={2} position="relative">
                            <img src="/Logo.png" alt="Kill a Server" width="170px" />
                            <img src="/ilust-home5.png" className="ilust-login" />
                        </Grid>
                        <Grid item xs={6} display="flex" alignItems="center" justifyContent="end">
                            {children}
                        </Grid>
                    </Grid>
                </Container>
            </main>

        </Box>
    )
}
