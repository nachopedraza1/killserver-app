import { createTheme } from "@mui/material";

export const DarkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#EF1679',
        }
    },
    typography: {
        fontFamily: 'Roboto'
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
                    fontWeight: 400,
                    fontFamily: 'Orbitron',
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: 600,
                    fontFamily: 'Orbitron',
                    color: 'white',
                    paddingLeft: 20,
                    paddingRight: 20,
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
                    fontWeight: 600,
                    fontFamily: 'Orbitron',
                },
                h5: {
                    fontWeight: 600,
                    fontFamily: 'Orbitron',
                    color: '#EF1679'
                }
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                input: {
                    "&:-webkit-autofill": {
                        "WebkitBoxShadow": "0 0 0 100px var(--primary-weak) inset",
                        "WebkitTextFillColor": "var(--text-primary)",
                    },
                },
            },
        }
    }
})