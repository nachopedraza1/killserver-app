import { NextPage } from "next"

import { LoadDataTables, MainLayout } from "@/components";
import { Button, Grid, InputAdornment, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TextField, Typography, styled, tableCellClasses } from "@mui/material";

import { faSearch, faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

const AboutPage: NextPage = () => {

    return (
        <MainLayout title="Website List">
            <Grid container minHeight="100vh" justifyContent="center" alignItems="center" textAlign="center">
                <Grid item xs={6}>
                    <Grid container direction="column" gap={2}>
                        <Typography variant="h3" textTransform="uppercase" color="primary.main"> Website list </Typography>
                        <span className="line"></span>
                        <Typography variant="h6" mb={2}>If you do not find what you are looking for in our database, you can send a request to our experts to analyze the desired website and add it to our database.</Typography>
                    </Grid>
                    <Button variant='outlined' sx={{ mr: 2 }} disabled={true} >
                        Add website
                    </Button>
                    <Button variant='contained' >
                        contact us
                    </Button>
                </Grid>
            </Grid>

            <Grid container minHeight="100vh" className="bg-servers">
                <TableContainer>

                    <Grid container alignItems="center" padding={2} gap={3} >
                        <Grid item xs={3}>
                            <TextField
                                disabled
                                fullWidth
                                size="small"
                                label="Search"
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
                                disabled
                                size="small"
                                label='Filter by attack'
                            >

                            </TextField>
                        </Grid>

                        <Grid xs={6}>
                            <Typography textAlign="end" variant="h5">Section under maintenance <FontAwesomeIcon icon={faScrewdriverWrench} /> </Typography>
                        </Grid>
                    </Grid>

                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell >Name</StyledTableCell>
                                <StyledTableCell align="center">Url</StyledTableCell>
                                <StyledTableCell align="center">Hosting</StyledTableCell>
                                <StyledTableCell align="center">Vulnerabilities</StyledTableCell>
                                <StyledTableCell align="center">Available</StyledTableCell>
                                <StyledTableCell align="center"></StyledTableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            <LoadDataTables />
                        </TableBody>

                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    colSpan={6}
                                    count={0}
                                    rowsPerPage={10}
                                    rowsPerPageOptions={[10]}
                                    page={0}
                                    sx={{ borderBottom: "none" }}
                                    onPageChange={() => { }}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer >
            </Grid>
        </MainLayout>
    )
}

export default AboutPage;
