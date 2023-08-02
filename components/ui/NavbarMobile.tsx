import { FC, useContext } from "react";
import Image from "next/image";

import { useNavbar } from "@/hooks";
import { UiContext } from "@/context";
import { Sidebar } from "@/components";

import { Slide, AppBar, Toolbar, Container, Grid, IconButton } from '@mui/material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from "@fortawesome/free-solid-svg-icons";

interface Props {
    window?: () => Window;
}

export const NavbarMobile: FC = (props: Props) => {

    const { navbarStyle, trigger } = useNavbar(props);

    const { toggleSideBar } = useContext(UiContext);

    return (
        <>
            <Slide appear={false} direction="down" in={!trigger}>
                <AppBar>
                    <Toolbar sx={{ pt: 2, pb: 2 }} className={`navbar-blur ${navbarStyle}`} disableGutters>
                        <Container>
                            <Grid container justifyContent="space-between" alignItems="center">

                                <Grid item>
                                    <Image src="/Logo.png" alt="Kill a Server" width={125} height={50} />
                                </Grid>

                                <Grid item>
                                    <IconButton onClick={toggleSideBar}>
                                        <FontAwesomeIcon icon={faBars} />
                                    </IconButton>
                                </Grid>

                            </Grid>
                        </Container>
                    </Toolbar>
                </AppBar>
            </Slide >
            <Sidebar />
        </>
    )
}