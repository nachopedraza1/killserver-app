import { FC } from "react";
import Image from 'next/image';

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
                        <Box width="100%"height={35} pt={0.7} position="relative">
                            <Image src={`/${game}.png`} alt={`Kill Server ${game}`} fill objectFit="contain" />
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
                        <Button variant="contained" data-sellix-product="64c8a3c085041">
                            KILL
                        </Button>
                    </StyledTableCell>

                </TableRow>
            ))}
        </>
    )
}
