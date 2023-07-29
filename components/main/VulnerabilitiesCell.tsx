import { FC } from "react";

import { Tooltip, IconButton } from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMeteor, faSyringe, faBug, faFileCode, faRobot } from "@fortawesome/free-solid-svg-icons";

export const VulnerabilitiesCell: FC<{ vulns: string[] }> = ({ vulns }) => {

    const vulnsIcons = vulns.map(item => {
        if (item === "DDOS") {
            return {
                name: item,
                icon: <FontAwesomeIcon icon={faMeteor} />
            }
        } else if (item === "SQLI") {
            return {
                name: item,
                icon: <FontAwesomeIcon icon={faSyringe} />
            }
        } else if (item === "Cross-site scripting") {
            return {
                name: item,
                icon: <FontAwesomeIcon icon={faBug} />
            }
        } else if (item === "Cross-site request") {
            return {
                name: item,
                icon: <FontAwesomeIcon icon={faFileCode} />
            }
        } else if (item === "Loggin Buffer") {
            return {
                name: item,
                icon: <FontAwesomeIcon icon={faRobot} />
            }
        }
    })

    return (
        <>
            {
                vulnsIcons.map(item => (
                    <Tooltip key={item?.name} title={item?.name}>
                        <IconButton size="small" disableRipple>
                            {item?.icon}
                        </IconButton >
                    </Tooltip>
                ))
            }
        </>
    )
}
