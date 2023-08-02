import { FC, useContext } from 'react';
import Link from 'next/link'
import Image from 'next/image';
import { useRouter } from 'next/router';

import { useSession } from 'next-auth/react';

import { AuthContext, UiContext } from '@/context';

import { Link as MuiLink, Drawer, Box, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Button, Typography } from '@mui/material'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faHome, faDatabase, faGlobe, faPaperPlane, faCircleUser, faEnvelope, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'


const navLinks = [
    { text: 'HOME', path: '/' },
    { text: 'SERVERS', path: '/database' },
    { text: 'WEBSITES', path: '/websites' },
    { text: 'CONTACT', path: process.env.NEXT_PUBLIC_TELEGRAM!, target: '_blank' },
]

export const Sidebar: FC = () => {

    const { data, status } = useSession();

    const { sidebarOpen, toggleSideBar } = useContext(UiContext);

    const { asPath } = useRouter();

    const { logoutUser } = useContext(AuthContext);

    return (
        <Drawer
            open={sidebarOpen}
            onClose={toggleSideBar}
            anchor="right"
        >
            <Box width={250}>

                <Grid container justifyContent="space-between" alignItems="center" p="10px 20px 0px 20px">
                    <Image src="/Logo.png" alt="Kill a Server" width={120} height={45} />
                    <IconButton disableRipple onClick={toggleSideBar}>
                        <FontAwesomeIcon icon={faClose} />
                    </IconButton>
                </Grid>

                <span className="line"></span>

                <List>
                    {navLinks.map(({ text, path, target }) => (
                        <ListItem key={text} disablePadding >
                            <ListItemButton onClick={toggleSideBar}>
                                <ListItemIcon>
                                    {text === "HOME" && <FontAwesomeIcon icon={faHome} color="#EF1679" />}
                                    {text === "SERVERS" && <FontAwesomeIcon icon={faDatabase} color="#EF1679" />}
                                    {text === "WEBSITES" && <FontAwesomeIcon icon={faGlobe} color="#EF1679" />}
                                    {text === "CONTACT" && <FontAwesomeIcon icon={faPaperPlane} color="#EF1679" />}
                                </ListItemIcon>
                                <MuiLink component={Link} href={path} fontSize={13} letterSpacing={3} target={target || ""}  >
                                    <ListItemText primary={text} sx={{ fontFamily: 'Orbitron', textTransform: 'uppercase' }} disableTypography />
                                </MuiLink>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>

                <span className="line"></span>

                <List >
                    {status == 'unauthenticated'
                        &&
                        <Grid container justifyContent="center" gap={1}>
                            <Link href={`/auth/login?p=${asPath}`}>
                                <Button variant="contained" sx={{ px: 3 }}>
                                    Login
                                </Button>
                            </Link>
                            <Link href={`/auth/register?p=${asPath}`}>
                                <Button variant="outlined" sx={{ px: 2 }}>
                                    Register
                                </Button>
                            </Link>
                        </Grid>
                    }
                </List>

                <List>
                    {status == 'authenticated'
                        &&
                        <>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <FontAwesomeIcon icon={faCircleUser} color="#EF1679" />
                                    </ListItemIcon>
                                    <Typography fontSize={13} letterSpacing={3} fontFamily="Orbitron" textTransform="uppercase" textOverflow="ellipsis" noWrap > {data?.user?.name}  </Typography>
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <FontAwesomeIcon icon={faEnvelope} color="#EF1679" />
                                    </ListItemIcon>
                                    <Typography fontSize={13} letterSpacing={3} fontFamily="Orbitron" textTransform="uppercase" textOverflow="ellipsis" noWrap > {data?.user?.email}  </Typography>
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={logoutUser}>
                                    <ListItemIcon>
                                        <FontAwesomeIcon icon={faRightFromBracket} color="#EF1679" />
                                    </ListItemIcon>
                                    <Typography fontSize={13} letterSpacing={3} fontFamily="Orbitron" textTransform="uppercase" textOverflow="ellipsis" noWrap > LOGOUT  </Typography>
                                </ListItemButton>
                            </ListItem>
                        </>
                    }
                </List>

            </Box>
        </Drawer >
    )
}
