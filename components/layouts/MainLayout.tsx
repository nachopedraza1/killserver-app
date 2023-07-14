import { FC, ReactNode } from "react";

import Grid from '@mui/material/Grid';
import { Navbar } from "../ui";
import Container from '@mui/material/Container'


export const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <Grid className="bg-main">
            <Navbar />
            <Container >
                {children}
            </Container>
        </Grid>
    )
}
