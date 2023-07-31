import { useContext, useState } from 'react';

import { useSession } from 'next-auth/react';
import { AuthContext } from '@/context';

import { Menu, MenuItem, ListItemIcon, IconButton, Typography } from '@mui/material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faRightFromBracket, faCircleUser } from '@fortawesome/free-solid-svg-icons';





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
                <FontAwesomeIcon icon={faCircleUser} />
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
                        <FontAwesomeIcon icon={faUser} />
                    </ListItemIcon>
                    <Typography textTransform="capitalize"> {data?.user?.name}</Typography>
                </MenuItem>
                <MenuItem disabled>
                    <ListItemIcon>
                        <FontAwesomeIcon icon={faEnvelope} />
                    </ListItemIcon>
                    {data?.user?.email}
                </MenuItem>
                <MenuItem onClick={logoutUser}>
                    <ListItemIcon>
                        <FontAwesomeIcon icon={faRightFromBracket} />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
}