import { FC } from "react";
import Link from "next/link";

import { Slide, AppBar, Toolbar, List, Container, ListItem, Grid, Link as MuiLink, Button } from '@mui/material';
import { useNavbar } from "@/hooks";

interface Props {
    window?: () => Window;
}

const navLinks = [
    { text: 'HOME', path: '/' },
    { text: 'SERVERS', path: '/database' },
    { text: 'TEAM', path: '/' },
    { text: 'ABOUT', path: '/' },
]

export const Navbar: FC = (props: Props) => {

    const { navbarStyle, trigger } = useNavbar(props);

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            <AppBar>
                <Toolbar sx={{ pt: 2, pb: 2 }} className={`navbar-blur ${navbarStyle}`}>
                    <Container>
                        <Grid container justifyContent="space-between">
                            <Grid item xs={2}>
                                <img src="/Logo.png" alt="Kill a Server" width="170px" />
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
                                <Button variant="contained" sx={{ ml: 2, px: 3 }}>
                                    Login
                                </Button>
                            </Grid>
                        </Grid>
                    </Container>
                </Toolbar>
            </AppBar>
        </Slide >
    )
}