import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

import { useSession } from "next-auth/react";

import { AppBar, Button, Container, Grid, List, ListItem, Toolbar, Link as MuiLink } from "@mui/material";

const navLinks = [
    { text: 'HOME', path: '/' },
    { text: 'SERVERS', path: '/database' },
    { text: 'WEBSITES', path: '/websites' },
    { text: 'CONTACT', path: process.env.NEXT_PUBLIC_TELEGRAM!, target: '_blank' },
]

export const Footer: FC = () => {

    const { status } = useSession();

    return (
        <footer>
            <AppBar position="relative">
                <Toolbar sx={{ pt: 2, pb: 2, mt: 5 }}>
                    <Container>
                        <Grid container justifyContent="space-between" alignItems="center" direction={{ xs: 'column', sm: 'row' }}>

                            <Grid item >
                                <Image src="/Logo.png" alt="Kill a Server" width={170} height={60} />
                            </Grid>

                            <Grid item >
                                <Grid container alignItems="center" gap={3} direction={{ xs: 'column', sm: 'row' }}>
                                    {navLinks.map(({ text, path, target }) => (
                                        <Grid key={text}>
                                            <MuiLink component={Link} href={path} fontSize={13} letterSpacing={3} className="nav-link" target={target}>
                                                {text}
                                            </MuiLink>
                                        </Grid>
                                    ))}
                                    {
                                        status == 'unauthenticated'
                                        &&
                                        <Grid item >
                                            <Button variant="contained" sx={{ ml: 2, px: 3 }}>
                                                Login
                                            </Button>
                                            <Button variant="outlined" sx={{ ml: 2, px: 3 }}>
                                                Register
                                            </Button>
                                        </Grid>
                                    }
                                </Grid>
                            </Grid>

                        </Grid>

                    </Container>
                </Toolbar>
            </AppBar>
        </footer >
    )
}
