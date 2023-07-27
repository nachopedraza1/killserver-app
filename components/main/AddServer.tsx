import { FC, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";

import { useSession } from "next-auth/react";

import { UiContext } from "@/context/ui";
import { hostings, alertSnack } from "@/utils";
import { killApi } from "@/api";

import { Modal, Backdrop, Box, Fade, TextField, Typography, Grid, MenuItem, Button } from "@mui/material";
import { Games, Hostings } from "@/interfaces";
import { isAxiosError } from "axios";

interface FormData {
    name: string,
    urlWebsite: string,
    game: Games,
    host: Hostings,
}

export const AddServer: FC = () => {

    const { query } = useRouter();

    const { data } = useSession();

    const { openServerModal, toggleModal } = useContext(UiContext);

    const [submitted, setSubmitted] = useState<boolean>(false)

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit = async ({ game, host, name, urlWebsite }: FormData) => {
        try {
            setSubmitted(true);
            await killApi.post('/gameservers', { game, host, name, urlWebsite });
            setSubmitted(false);
            alertSnack('Server successfully sent', 'success')
            toggleModal();
        } catch (error) {
            if (isAxiosError(error)) {
                alertSnack(error.response?.data.message, 'error')
            }
            setSubmitted(false);
        }
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
                                            maxLength: { value: 15, message: 'maximum 15 characters' },
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

                                        <MenuItem value="muonline"> Mu Online </MenuItem>
                                        <MenuItem value="cabal"> Cabal Online </MenuItem>
                                        <MenuItem value="lineage2"> Lineage 2 </MenuItem>
                                        <MenuItem value="worldofwarcraft"> World of Warcraft </MenuItem>
                                        <MenuItem value="aion"> Aion Online </MenuItem>
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


                                    <Button type="submit" disabled={!data?.user || submitted} variant="contained" fullWidth>
                                        {!data?.user ? 'not authenticated' : 'submit'}
                                    </Button>

                                </Grid>
                            </form>


                            <Typography textAlign="center" mt={2} display={data?.user ? "none" : "block"}>
                                Already have an account?
                                <Link href={query.p ? `/auth/register?p=${query.p}` : '/auth/register'} className="custom-link" >
                                    Sign in
                                </Link>
                            </Typography>

                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}