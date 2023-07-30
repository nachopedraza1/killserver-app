import { FC } from "react"

import { Slide } from "react-slideshow-image"
import 'react-slideshow-image/dist/styles.css'

import { Box, Grid, Typography } from "@mui/material"
import Image from "next/image"

const images = ['/worldofwarcraft.png', '/muonline.png', '/aion.png', '/cabal.png', '/lineage2.png']

export const SliderGames: FC = () => {
    return (
        <Grid item xs={12} textAlign="center">
            <Typography variant="h3" textTransform="uppercase" color="primary.main" mb={1}> we work on </Typography>
            <span className='line'></span>
            <Slide slidesToShow={4} infinite>
                {images.map(img => (
                    <Grid key={img} className="box-game each-slide-effect">
                        <Box width="100%" height={120} position="relative">
                            <Image src={img} alt="Kill Server" fill objectFit="contain" />
                        </Box>
                    </Grid>
                ))}
            </Slide>
        </Grid>
    )
}
