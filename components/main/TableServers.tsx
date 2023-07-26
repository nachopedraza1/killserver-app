import { useEffect, useState } from "react";
import { killApi } from "@/api";

import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, tableCellClasses, IconButton } from "@mui/material";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyringe, faMeteor, faRobot, faBug, faFileCode, faCheck, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { VulnerabilitiesCell } from "./VulnerabilitiesCell";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
        textTransform: 'Capitalize',
        fontSize: 14,
    },
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.action.hover,
        fontSize: 15,
    },
}));

interface GameServer {
    name: string,
    urlWebsite: string,
    vulnerabilities: string[],
    host: string,
    game: string;
}


export const TableServers = () => {

    const [servers, setServers] = useState<GameServer[]>([]);

    const helpers = async () => {
        const { data } = await killApi.get('/gameservers');
        setServers(data)
    }

    useEffect(() => {
        helpers();
    }, [])


    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell >Game</StyledTableCell>
                        <StyledTableCell align="center">Server Name</StyledTableCell>
                        <StyledTableCell align="center">Website</StyledTableCell>
                        <StyledTableCell align="center">Vulnerabilities</StyledTableCell>
                        <StyledTableCell align="center">Available</StyledTableCell>
                        <StyledTableCell align="center"></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {servers.map(({ game, name, urlWebsite, vulnerabilities }) => (
                        <TableRow key={name}>

                            <StyledTableCell>{game}</StyledTableCell>

                            <StyledTableCell align="center" scope="row">
                                {name}
                            </StyledTableCell>

                            <StyledTableCell align="center">
                                <IconButton>
                                    <FontAwesomeIcon icon={faGlobe} size="sm" />
                                </IconButton>
                            </StyledTableCell>

                            <StyledTableCell align="center">
                                <VulnerabilitiesCell vulns={vulnerabilities} />
                            </StyledTableCell>

                            <StyledTableCell align="center">
                                <FontAwesomeIcon size="xl" icon={faCheck} />
                            </StyledTableCell>

                            <StyledTableCell align="center">
                                <Button variant="contained">
                                    KILL
                                </Button>
                            </StyledTableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
