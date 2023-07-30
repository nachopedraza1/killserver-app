import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

import { useSession } from "next-auth/react";

import { UserButtons } from "./UserButtons";
import { Slide, AppBar, Toolbar, List, Container, ListItem, Grid, Link as MuiLink, Button } from '@mui/material';
import { useNavbar } from "@/hooks";

interface Props {
    window?: () => Window;
}

const navLinks = [
    { text: 'HOME', path: '/' },
    { text: 'SERVERS', path: '/database' },
    { text: 'WEBSITES', path: '/websites' },
    { text: 'CONTACT', path: '/a' },
]

export const Navbar: FC = (props: Props) => {

    const { navbarStyle, trigger, asPath } = useNavbar(props);

    const { status } = useSession();

    const isActiveClass = (path: string) => {
        if (asPath === path) return "active-link nav-link";
        return "nav-link";
    }

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            <AppBar>
                <Toolbar sx={{ pt: 2, pb: 2 }} className={`navbar-blur ${navbarStyle}`}>
                    <Container>
                        <Grid container justifyContent="space-between">
                            <Grid item xs={2}>
                                <Image src="/Logo.png" alt="Kill a Server" width={170} height={60} />
                            </Grid>
                            <Grid item display="flex" alignItems="center">
                                <nav>
                                    <List sx={{ display: 'flex' }}>
                                        {navLinks.map(({ text, path }) => (
                                            <ListItem key={text} className={isActiveClass(path)}>
                                                <MuiLink component={Link} href={path} fontSize={13} letterSpacing={3}  >
                                                    {text}
                                                </MuiLink>
                                            </ListItem>
                                        ))}
                                    </List>
                                </nav>

                                {status == 'unauthenticated'
                                    &&
                                    <Link href={`/auth/login?p=${asPath}`}>
                                        <Button variant="contained" sx={{ ml: 2, px: 3 }}>
                                            Login
                                        </Button>
                                    </Link>
                                }

                                {status == 'authenticated' && <UserButtons />}

                            </Grid>
                        </Grid>
                    </Container>
                </Toolbar>
            </AppBar>
        </Slide >
    )
}