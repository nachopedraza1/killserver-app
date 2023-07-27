import { FC } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMeteor, faSyringe, faBug, faFileCode, faRobot } from "@fortawesome/free-solid-svg-icons";
import { Tooltip, IconButton } from "@mui/material";

export const VulnerabilitiesCell: FC<{ vulns: string[] }> = ({ vulns }) => {

    const vulnsIcons = vulns.map(item => {
        if (item === "DDOS") {
            return {
                name: item,
                icon: <FontAwesomeIcon size="xl" icon={faMeteor} />
            }
        } else if (item === "SQLI") {
            return {
                name: item,
                icon: <FontAwesomeIcon size="xl" icon={faSyringe} />
            }
        } else if (item === "Cross-site scripting") {
            return {
                name: item,
                icon: <FontAwesomeIcon size="xl" icon={faBug} />
            }
        } else if (item === "Cross-site request") {
            return {
                name: item,
                icon: <FontAwesomeIcon size="xl" icon={faFileCode} />
            }
        } else if (item === "Loggin Buffer") {
            return {
                name: item,
                icon: <FontAwesomeIcon size="xl" icon={faRobot} />
            }
        }
    })

    return (
        <>
            {
                vulnsIcons.map(item => (
                    <Tooltip title={item?.name}>
                        <IconButton size="small" disableRipple>
                            {item?.icon}
                        </IconButton >
                    </Tooltip>
                ))
            }
        </>
    )
}
