import { FC } from "react"

import Slider from "react-slick";

import { Box, Grid, Typography } from "@mui/material"
import Image from "next/image"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = ['/worldofwarcraft.png', '/muonline.png', '/aion.png', '/cabal.png', '/lineage2.png'];

const settings_custom = {
    dots: true,
    infinite: true,
    autoplay:true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
        {
            breakpoint: 900,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 700,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                initialSlide: 2
            }
        },
        {
            breakpoint: 500,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};


export const SliderGames: FC = () => {

    return (
        <Grid item xs={12} textAlign="center">
            <Typography variant="h3" textTransform="uppercase" color="primary.main" mb={1}> we work on </Typography>
            <span className='line'></span>
            <Slider {...settings_custom}>
                {images.map(img => (
                    <div key={img} className="box-game">
                        <Box width="100%" height={120} position="relative">
                            <Image src={img} alt="Kill Server" fill objectFit="contain" />
                        </Box>
                    </div>
                ))}
            </Slider>

        </Grid>
    )
}
