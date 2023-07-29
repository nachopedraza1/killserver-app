import { FC } from "react";

import { TableRow, Box, Tooltip, IconButton, Button, styled, tableCellClasses, TableCell } from "@mui/material";
import { VulnerabilitiesCell } from "./VulnerabilitiesCell";

import { faGlobe, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { IGameServer } from '@/interfaces';

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

export const PaginationTable: FC<{ gameservers: IGameServer[], page: number }> = ({ gameservers, page }) => {

    const paginated = gameservers.slice(page * 10, page * 10 + 10)

    return (
        <>
            {(paginated).map(({ game, name, urlWebsite, vulnerabilities }) => (
                <TableRow key={name} className="fadeIn">

                    <StyledTableCell>
                        <Box width={60} height={40} pt={0.7}>
                            <img src={`/${game}.png`} width="100%" />
                        </Box>
                    </StyledTableCell>

                    <StyledTableCell align="center" scope="row">
                        {name}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                        <Tooltip title={urlWebsite}>
                            <IconButton href={urlWebsite} target="_blank">
                                <FontAwesomeIcon icon={faGlobe} size="sm" />
                            </IconButton>
                        </Tooltip>
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
        </>
    )
}
