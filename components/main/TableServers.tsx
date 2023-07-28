import { ChangeEvent, useEffect, useState } from "react";

import { useGameServers } from "@/hooks";
import { attacks } from "@/utils";

import { VulnerabilitiesCell } from "./VulnerabilitiesCell";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, tableCellClasses, IconButton, Tooltip, TextField, Grid, InputAdornment, MenuItem, Chip, Stack } from "@mui/material";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faGlobe, faSearch } from "@fortawesome/free-solid-svg-icons";
import { IGameServer } from "@/interfaces";

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


type Vuln = | 'Cross-site request' | 'Cross-site scripting' | 'SQLI' | 'DDOS' | 'Loggin Buffer'

export const TableServers = () => {

    const { gameservers, isLoading } = useGameServers('/gameservers');

    const [serverByFilter, setServerByFilter] = useState<IGameServer[]>([]);

    const [chipGame, setChipGame] = useState('');
    const [chipVuln, setChipVuln] = useState('');
    const [chipSearch, setChipSearch] = useState('');

    useEffect(() => {
        setServerByFilter(gameservers)
    }, [isLoading])

    useEffect(() => {
        onFilter();
    }, [chipGame, chipVuln])

    const onFilter = () => {
        setChipSearch('')
        if (chipGame === '') return setServerByFilter(gameservers);
        if (chipVuln === '') {
            const byName = gameservers.filter(serv => serv.game === chipGame);
            return setServerByFilter(byName);
        }
        const byNameAndAttack = gameservers.filter(serv => serv.game === chipGame && serv.vulnerabilities.includes(chipVuln as Vuln));
        setServerByFilter(byNameAndAttack);
    }

    const handleChipDelete = (chipType: 'game' | 'vuln') => {
        if (chipType === 'game') {
            setChipVuln('');
            setChipGame('');
            return;
        }
        if (chipType === 'vuln') return setChipVuln('')
    }

    const onSearch = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setChipGame('')
        setChipSearch(target.value)
        const serversSearch = gameservers.filter(serv => serv.name.includes(target.value) || serv.game.includes(target.value))
        setServerByFilter(serversSearch);
    }


    return (
        <TableContainer component={Paper}>

            <Grid container alignItems="center" padding={2} gap={3} >
                <Grid item xs={3}>
                    <TextField
                        fullWidth
                        size="small"
                        label="Search"
                        value={chipSearch}
                        onChange={onSearch}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <FontAwesomeIcon icon={faSearch} />
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
                        value={chipGame}
                        onChange={({ target }) => setChipGame(target.value)}
                    >
                        <MenuItem value="muonline"> Mu Online </MenuItem>
                        <MenuItem value="cabal"> Cabal Online </MenuItem>
                        <MenuItem value="lineage2"> Lineage 2 </MenuItem>
                        <MenuItem value="worldofwarcraft"> World of Warcraft </MenuItem>
                        <MenuItem value="aion"> Aion Online </MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        select
                        fullWidth
                        disabled={chipGame === ''}
                        value={chipVuln}
                        size="small"
                        label='Filter by attack'
                        onChange={({ target }) => setChipVuln(target.value)}
                    >
                        {attacks.map(atk => (
                            <MenuItem key={atk} value={atk}> {atk} </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid item xs={4}>
                    <Stack direction="row" spacing={2}>
                        <Chip
                            label={chipGame}
                            onDelete={() => handleChipDelete("game")}
                            sx={{ display: chipGame.length >= 1 ? "flex" : "none", textTransform: 'Capitalize' }}
                        />
                        <Chip
                            label={chipVuln}
                            onDelete={() => handleChipDelete("vuln")}
                            sx={{ display: chipVuln.length >= 1 ? "flex" : "none", textTransform: 'Capitalize' }}
                        />
                        <Chip
                            label={chipSearch}
                            onDelete={() => handleChipDelete("vuln")}
                            sx={{ display: chipSearch.length >= 1 ? "flex" : "none", textTransform: 'Capitalize' }}
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
