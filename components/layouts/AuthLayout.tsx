import { FC, ReactNode } from "react";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";

import { Grid, Container, Box, AppBar, Toolbar } from '@mui/material';

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
                    <Grid container minHeight="100vh" justifyContent="center" overflow="hidden">

                        <AppBar sx={{ pt: 2 }}>
                            <Container>
                                <Link href="/">
                                    <Image src="/Logo.png" alt="Kill a Server" width={170} height={60} />
                                </Link>
                            </Container>
                        </AppBar>

                        <Grid item md={6} mt={2} position="relative" display={{ xs: "none", md: "flex" }}>
                            <Box className="ilust-login">
                                <Image src="/ilust-home5.png" alt="Kill a Server" objectFit="contain" fill />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6} display="flex" alignItems="center" justifyContent={{ xs: 'center', md: 'end' }} className="fadeIn">
                            {children}
                        </Grid>
                    </Grid>
                </Container>
            </main>

        </Box>
    )
}
