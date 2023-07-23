import { FC, useContext } from "react";
import { useForm } from "react-hook-form";

import { UiContext } from "@/context/ui";
import { hostings, games } from "@/utils";

import { Modal, Backdrop, Box, Fade, TextField, Typography, Grid, MenuItem, Button } from "@mui/material";
import { Games, Hostings } from "@/interfaces";

interface FormData {
    name: string,
    urlWebsite: string,
    game: Games,
    host: Hostings,
}

export const AddServer: FC = () => {

    const { openServerModal, toggleModal } = useContext(UiContext);

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        console.log(data);
    }

    return (
        <div>
            <Modal
                open={openServerModal}
                onClose={toggleModal}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={openServerModal}>
                    <Box className="bg-modal">
                        <Box position="relative">
                            <img src="/addserver.png" width="70%" className="img-z" />
                            <Typography variant="h5" textAlign="center" fontWeight={600} > Add server </Typography>
                            <Typography mb={1}> Please enter the server data, our experts will analyze it and if any vulnerability is found, it will be posted in our list. </Typography>

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Grid container gap={2}>
                                    <TextField
                                        fullWidth
                                        type="text"
                                        label="Name"
                                        placeholder="Enter server name"
                                        error={!!errors.name}
                                        helperText={errors.name?.message}
                                        {...register('name', {
                                            required: 'Required',
                                            minLength: { value: 2, message: 'minimum 2 characters' },
                                            maxLength: { value: 8, message: 'maximum 8 characters' },
                                        })}
                                    />
                                    <TextField
                                        fullWidth
                                        type="text"
                                        label="URL Website"
                                        placeholder="Enter website url"
                                        error={!!errors.urlWebsite}
                                        helperText={errors.urlWebsite?.message}
                                        {...register('urlWebsite', {
                                            required: 'Required',
                                            minLength: { value: 5, message: 'minimum 5 characters' },
                                            maxLength: { value: 36, message: 'maximum 36 characters' },
                                        })}
                                    />

                                    <TextField
                                        select
                                        fullWidth
                                        label="Game"
                                        placeholder="Select Game"
                                        defaultValue={''}
                                        error={!!errors.game}
                                        helperText={errors.game?.message}
                                        {...register('game', {
                                            required: 'Required',
                                        })}
                                    >
                                        {
                                            games.map(game => (
                                                <MenuItem key={game} value={game}> {game} </MenuItem>
                                            ))
                                        }
                                    </TextField>

                                    <TextField
                                        select
                                        fullWidth
                                        label="Hosting"
                                        placeholder="Select Hosting"
                                        defaultValue={''}
                                        error={!!errors.host}
                                        helperText={errors.host?.message}
                                        {...register('host', {
                                            required: 'Required',
                                        })}
                                    >
                                        {
                                            hostings.map(item => (
                                                <MenuItem key={item} value={item}> {item} </MenuItem>
                                            ))
                                        }
                                    </TextField>


                                    <Button type="submit" variant="contained" fullWidth>
                                        submit
                                    </Button>
                                </Grid>
                            </form>

                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}