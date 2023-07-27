import { useEffect, useState } from "react";
import { killApi } from "@/api";

import { useGameServers } from "@/hooks";
import { attacks } from "@/utils";

import { VulnerabilitiesCell } from "./VulnerabilitiesCell";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, tableCellClasses, IconButton, Tooltip, TextField, Grid, InputAdornment, MenuItem, Chip, Stack } from "@mui/material";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faGlobe, faSearch } from "@fortawesome/free-solid-svg-icons";

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

    const { gameservers, isLoading } = useGameServers('/gameservers');

    const [serverByFilter, setServerByFilter] = useState<GameServer[]>([]);

    const [chipName, setChipName] = useState({ show: false, name: '', })
    const [chipVuln, setChipVuln] = useState({ show: false, name: '', })

    useEffect(() => {
        setServerByFilter(gameservers)
        onFilterByGame();
    }, [])

    const onFilterByGame = () => {
        const serversFilter = gameservers.filter(srv => srv.game.includes(chipName.name));
        if (chipName.name === 'All') {
            setChipName({ name: 'All', show: false })
            setServerByFilter(gameservers)
            return;
        }
        setServerByFilter(serversFilter)
    }

    return (
        <TableContainer component={Paper}>

            <Grid container alignItems="center" padding={2} gap={3} >
                <Grid item xs={3}>
                    <TextField
                        fullWidth
                        size="small"
                        label="Search"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton size="small">
                                        <FontAwesomeIcon icon={faSearch} />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        select
                        fullWidth
                        size="small"
                        label='Filter by game'
                        value={chipName.name}
                        onChange={({ target }) => setChipName({ show: true, name: target.value })}
                    >
                        <MenuItem value="muonline"> Mu Online </MenuItem>
                        <MenuItem value="cabal"> Cabal Online </MenuItem>
                        <MenuItem value="lineage2"> Lineage 2 </MenuItem>
                        <MenuItem value="worldofwarcraft"> World of Warcraft </MenuItem>
                        <MenuItem value="aion"> Aion Online </MenuItem>
                        <MenuItem value="All">All</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        select
                        fullWidth
                        value={chipVuln.name}
                        size="small"
                        label='Filter by attack'
                        onChange={({ target }) => setChipVuln({ show: true, name: target.value })}
                    >
                        {attacks.map(atk => (
                            <MenuItem key={atk} value={atk}> {atk} </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid item xs={4}>
                    <Stack direction="row" spacing={2}>
                        <Chip
                            label={chipName.name}
                            onDelete={() => setChipName({ name: '', show: false })}
                            sx={{ display: chipName.show ? "flex" : "none", textTransform: 'Capitalize' }}
                        />
                        <Chip
                            label={chipVuln.name}
                            onDelete={() => setChipVuln({ name: '', show: false })}
                            sx={{ display: chipVuln.show ? "flex" : "none", textTransform: 'Capitalize' }}
                        />
                    </Stack>
                </Grid>
            </Grid>

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
                    {serverByFilter.map(({ game, name, urlWebsite, vulnerabilities }) => (
                        <TableRow key={name}>

                            <StyledTableCell>
                                <img src={`/${game}.png`} width="80px" />
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
                </TableBody>
            </Table>
        </TableContainer >
    );
}
