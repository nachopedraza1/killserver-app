import { createTheme } from "@mui/material";

export const DarkTheme = createTheme({
    palette: {
        mode: 'dark'
    },
    typography: {
        fontFamily: 'Montserrat',
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
                    paddingRight: 15
                }
            }
        },
        MuiTypography: {
            styleOverrides: {
                h3: {
                    fontWeight: 700
                }
            }
        }
    }
})