import { useContext, useState } from 'react';

import { useSession } from 'next-auth/react';
import { AuthContext } from '@/context';

import { Menu, MenuItem, ListItemIcon, IconButton, Typography } from '@mui/material';
import { Email, Logout, ManageAccountsOutlined, Person } from '@mui/icons-material';


export const UserButtons = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const { logoutUser } = useContext(AuthContext);
    const { data } = useSession();

    return (
        <>
            <IconButton onClick={handleClick} color='primary' sx={{ mb: 0.8 }}>
                <ManageAccountsOutlined />
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem disabled>
                    <ListItemIcon >
                        <Person fontSize="small" />
                    </ListItemIcon>
                    <Typography textTransform="capitalize"> {data?.user?.name}</Typography>
                </MenuItem>
                <MenuItem disabled>
                    <ListItemIcon>
                        <Email fontSize="small" />
                    </ListItemIcon>
                    {data?.user?.email}
                </MenuItem>
                <MenuItem onClick={logoutUser}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
}