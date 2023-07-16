import { createTheme } from "@mui/material";

export const DarkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#EF1679',
        }
    },
    typography: {
        fontFamily: 'Orbitron',
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                    borderBottom: 'none',
                    backgroundImage: 'none'
                }
            }
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    textDecoration: 'none',
                    color: 'white',
                    fontWeight: 400
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: 600,
                    color: 'white',
                    paddingLeft: 15,
                    paddingRight: 15,
                    borderRadius: 0,
                },
                outlined: {
                    border: '2px solid #EF1679',
                    '&:hover': {
                        border: '2px solid #EF1679'
                    }
                },
                contained: {
                    border: '1px solid #EF1679'
                }
            },
        },
        MuiTypography: {
            styleOverrides: {
                h3: {
                    fontWeight: 600
                }
            }
        }
    }
})