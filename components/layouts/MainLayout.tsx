import { FC, ReactNode } from "react";

import { Navbar } from "../ui";
import { Container, Grid } from "@mui/material";


export const MainLayout: FC<{ children: ReactNode, bgClass?: string }> = ({ children, bgClass }) => {
    return (
        <Grid className={bgClass}>
            <Navbar />
            <Container >
                {children}
            </Container>
        </Grid>
    )
}
