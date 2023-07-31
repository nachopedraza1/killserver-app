import { FC } from "react";

import { CountUp } from "use-count-up";
import { useInView } from "react-intersection-observer";
import { useGameServers } from "@/hooks";

import { Grid, Typography } from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faDatabase, faEye, faMeteor } from "@fortawesome/free-solid-svg-icons";

export const ClientStats: FC = () => {

    const { gameservers } = useGameServers('/gameservers');

    const stats = [
        { title: "Satisfied Customers", value: 150, icon: <FontAwesomeIcon icon={faUser} /> },
        { title: "Servers in DB", value: gameservers.length, icon: <FontAwesomeIcon icon={faDatabase} /> },
        { title: "Monthly Visits", value: 500, icon: <FontAwesomeIcon icon={faEye} /> },
        { title: "Total Down", value: 213, icon: <FontAwesomeIcon icon={faMeteor} /> }
    ]

    const { ref, inView } = useInView();

    return (
        <Grid
            container
            ref={ref}
            className="stats-box"
            gap={{ xs: 4, sm: 0 }}
            direction={{ xs: "column", sm: "row" }}
            data-aos="fade"
        >
            {stats.map(({ title, value, icon }) => (
                <Grid item xs={3} textAlign="center" key={title}>
                    {icon}
                    <Typography className="count">+<CountUp isCounting={inView} end={value} duration={3.2} /> </Typography>
                    <span className="divider"></span>
                    <Typography variant="h6"> {title} </Typography>
                </Grid>
            ))}
        </Grid>
    )
}
