import { FC } from "react";
import Image from "next/image";

import { useSession } from "next-auth/react";

import { AppBar, Button, Container, Grid, Link, List, ListItem, Toolbar, Link as MuiLink } from "@mui/material";

const navLinks = [
    { text: 'HOME', path: '/' },
    { text: 'SERVERS', path: '/database' },
    { text: 'TEAM', path: '/' },
    { text: 'ABOUT', path: '/' },
]

export const Footer: FC = () => {

    const { status } = useSession();

    return (
        <footer>
            <AppBar position="relative">
                <Toolbar sx={{ pt: 2, pb: 2, mt: 5 }}>
                    <Container>
                        <Grid container justifyContent="space-between">
                            <Grid item xs={2}>
                                <Image src="/Logo.png" alt="Kill a Server" width={170} height={60} />
                            </Grid>
                            <Grid item display="flex" alignItems="center">
                                <nav>
                                    <List sx={{ display: 'flex' }}>
                                        {navLinks.map(({ text, path }) => (
                                            <ListItem key={text}>
                                                <MuiLink component={Link} href={path} fontSize={13} letterSpacing={3} className="nav-link">
                                                    {text}
                                                </MuiLink>
                                            </ListItem>
                                        ))}
                                    </List>
                                </nav>

                                {
                                    status == 'unauthenticated'
                                    &&
                                    <>
                                        < Button variant="contained" sx={{ ml: 2, px: 3 }}>
                                            Login
                                        </Button>
                                        <Button variant="outlined" sx={{ ml: 2, px: 3 }}>
                                            Register
                                        </Button>
                                    </>
                                }
                            </Grid>
                        </Grid>
                    </Container>
                </Toolbar>
            </AppBar>
        </footer >
    )
}
