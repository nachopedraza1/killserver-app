import { FC, ReactNode } from "react";
import Head from "next/head";

import { Footer, Navbar, NavbarMobile } from "../ui";
import { Box, Container, Grid } from "@mui/material";

interface Props {
    title: string,
    children: ReactNode,
    pageDescription?: string
}

export const MainLayout = ({ children, pageDescription, title }: Props) => {
    return (
        <Grid className="bg-main">

            <Head>
                <title>{title}</title>
                <meta name="description" content={pageDescription} />
                <meta name="og:title" content={title} />
                <meta name="og:description" content={pageDescription} />
                <meta name="og:image" content="/Logo.png" />
            </Head>

            <Box display={{ xs: 'none', md: 'flex' }}><Navbar /></Box>
            <Box display={{ md: 'none' }}><NavbarMobile /></Box>

            <main>
                <Container>
                    {children}
                </Container>
            </main>
              <Footer />
        </Grid>
    )
}
