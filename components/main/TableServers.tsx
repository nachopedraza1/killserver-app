import { ChangeEvent, useEffect, useState } from "react";

import { useGameServers } from "@/hooks";
import { attacks } from "@/utils";

import { LoadDataTables } from "./LoadDataTables";
import { PaginationTable } from "./PaginationTable";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, tableCellClasses, TextField, Grid, InputAdornment, MenuItem, Chip, Stack, TableFooter, TablePagination } from '@mui/material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from "@fortawesome/free-solid-svg-icons";

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

    const [input, setInput] = useState({ game: '', vuln: '', search: '' });

    useEffect(() => {
        setServerByFilter(gameservers)
    }, [isLoading])

    useEffect(() => {
        onFilter();
    }, [input.game, input.vuln])


    //Filters
    const onFilter = () => {
        setPage(0)
        setInput({ ...input, search: '' })
        if (input.game === '') return setServerByFilter(gameservers);
        if (input.vuln === '') {
            const byName = gameservers.filter(serv => serv.game === input.game);
            return setServerByFilter(byName);
        }
        const byNameAndAttack = gameservers.filter(serv => serv.game === input.game && serv.vulnerabilities.includes(input.vuln as Vuln));
        setServerByFilter(byNameAndAttack);
    }

    const handleChipDelete = (chipType: 'game' | 'vuln' | 'search') => {
        if (chipType === 'game') return setInput({ ...input, vuln: '', game: '' });
        if (chipType === 'vuln') return setInput({ ...input, vuln: '' });
        if (chipType === 'search') {
            setInput({ ...input, search: '', game: '' })
            setServerByFilter(gameservers);
            return;
        };
    }

    const onSearch = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setPage(0)
        setInput({ vuln: '', game: '', search: target.value })
        const serversSearch = gameservers.filter(serv => serv.name.includes(target.value) || serv.game.includes(target.value))
        setServerByFilter(serversSearch);
    }


    //Pagination 
    const [page, setPage] = useState<number>(0);

    const emptyRows = Math.max(0, (1 + page) * 10 - serverByFilter.length);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    return (
        <TableContainer>

            <Grid container alignItems="center" padding={2} gap={3} >
                <Grid item xs={12} sm={3.5} md={3}>
                    <TextField
                        fullWidth
                        size="small"
                        label="Search"
                        value={input.search}
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
                <Grid item xs={5.5} sm={3.5} md={2}>
                    <TextField
                        select
                        fullWidth
                        size="small"
                        label='Filter by game'
                        value={input.game}
                        onChange={({ target }) => setInput({ ...input, game: target.value })}
                    >
                        <MenuItem value="muonline"> Mu Online </MenuItem>
                        <MenuItem value="cabal"> Cabal Online </MenuItem>
                        <MenuItem value="lineage2"> Lineage 2 </MenuItem>
                        <MenuItem value="worldofwarcraft"> World of Warcraft </MenuItem>
                        <MenuItem value="aion"> Aion Online </MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={5.5} sm={3.5} md={2}>
                    <TextField
                        select
                        fullWidth
                        disabled={input.game === ''}
                        value={input.vuln}
                        size="small"
                        label='Filter by attack'
                        onChange={({ target }) => setInput({ ...input, vuln: target.value })}
                    >
                        {attacks.map(atk => (
                            <MenuItem key={atk} value={atk}> {atk} </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid item xs={4}>
                    <Stack direction="row" spacing={2}>
                        <Chip
                            label={input.game}
                            onDelete={() => handleChipDelete("game")}
                            sx={{ display: input.game.length >= 1 ? "flex" : "none", textTransform: 'Capitalize' }}
                        />
                        <Chip
                            label={input.vuln}
                            onDelete={() => handleChipDelete("vuln")}
                            sx={{ display: input.vuln.length >= 1 ? "flex" : "none", textTransform: 'Capitalize' }}
                        />
                        <Chip
                            label={input.search}
                            onDelete={() => handleChipDelete("search")}
                            sx={{ display: input.search.length >= 1 ? "flex" : "none", textTransform: 'Capitalize' }}
                        />
                    </Stack>
                </Grid>
            </Grid>

            <Table>
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

                    {
                        isLoading
                            ? <LoadDataTables />
                            : <PaginationTable gameservers={serverByFilter} page={page} />
                    }

                    {emptyRows > 0 && (
                        <TableRow style={{ height: 71.5 * emptyRows }}>
                            <StyledTableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            colSpan={6}
                            count={serverByFilter.length}
                            rowsPerPage={10}
                            rowsPerPageOptions={[10]}
                            page={page}
                            onPageChange={handleChangePage}
                            sx={{ borderBottom: "none" }}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer >
    );
}