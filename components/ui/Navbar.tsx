import { FC } from "react";

import { useScrollTrigger, Slide, AppBar, Toolbar, List, Container, ListItem, Grid, Link as MuiLink } from "@mui/material";

import Link from "next/link";


interface Props {
    window?: () => Window;
}

const navLinks = [
    { text: 'HOME', path: '/' },
    { text: 'SERVERS', path: '/' },
    { text: 'CLIENTS', path: '/' },
    { text: 'ABOUT', path: '/' },
]


export const Navbar: FC = (props: Props) => {

    const { window } = props;

    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <>
            <Slide appear={false} direction="down" in={!trigger}>
                <AppBar>
                    <Toolbar sx={{ pt: 2, pb: 2 }}>
                        <Container>
                            <Grid container justifyContent="space-between">
                                <Grid item xs={2}>
                                    <img src="/Logo.png" alt="Kill a Server" width="170px" />
                                </Grid>
                                <Grid item xs={4}>
                                    <nav>
                                        <List sx={{ display: 'flex' }}>
                                            {navLinks.map(({ text, path }) => (
                                                <ListItem key={text}>
                                                    <MuiLink component={Link} href={path} fontSize={15} letterSpacing={3}>
                                                        {text}
                                                    </MuiLink>
                                                </ListItem>
                                            ))}
                                        </List>
                                    </nav>
                                </Grid>
                            </Grid>
                        </Container>
                    </Toolbar>
                </AppBar>
            </Slide >
        </>
    )
}