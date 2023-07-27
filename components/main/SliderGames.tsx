import { FC } from "react"

import { Slide } from "react-slideshow-image"
import 'react-slideshow-image/dist/styles.css'

import { Grid, Typography } from "@mui/material"

export const SliderGames: FC = () => {
    return (
        <Grid item xs={12} textAlign="center">
            <Typography variant="h3" textTransform="uppercase" color="primary.main" mb={1}> we work on </Typography>
            <span className='line'></span>
            <Slide slidesToShow={4} infinite>
                <Grid className="box-game each-slide-effect">
                    <img src="/worldofwarcraft.png" width="100%" />
                </Grid>
                <Grid className="box-game each-slide-effect">
                    <img src="/muonline.png" width="100%" />
                </Grid>
                <Grid className="box-game each-slide-effect">
                    <img src="/aion.png" width="100%" />
                </Grid>
                <Grid className="box-game each-slide-effect">
                    <img src="/cabal.png" width="100%" />
                </Grid>
                <Grid className="box-game each-slide-effect">
                    <img src="/lineage2.png" width="100%" />
                </Grid>
            </Slide>
        </Grid>
    )
}
