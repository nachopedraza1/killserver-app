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
                <meta name="description" content="Explore our database of breached servers by our experts, we have the best and unique system penetration techniques, start destroying your competition." />
                <meta name="og:title" content={title} />
                <meta name="og:description" content="Explore our database of breached servers by our experts, we have the best and unique system penetration techniques, start destroying your competition." />
                <meta name="og:image" content="/favicon.png" />
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
