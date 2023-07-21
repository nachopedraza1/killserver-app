import { NextPage } from "next"
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { useForm } from "react-hook-form";
import { isEmail } from "@/utils";

import { AuthLayout } from "@/components";
import { Box, Grid, Typography, TextField, Button, Divider } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "@/context";
import { signIn } from "next-auth/react";
import { enqueueSnackbar } from "notistack";

type FormData = {
    name: string,
    email: string;
    password: string;
};

const RegisterPage: NextPage = () => {

    const { query } = useRouter();

    const { registerUser } = useContext(AuthContext);

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onRegister = async ({ name, email, password }: FormData) => {

        const { hasError, message } = await registerUser(name, email, password);

        if (hasError) {
            return enqueueSnackbar(`${message}`, {
                variant: 'error',
                autoHideDuration: 1500,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            })
        }

        await signIn('credentials', { email, password });
    }

    return (
        <AuthLayout title="Ingresar">
            <form onSubmit={handleSubmit(onRegister)} noValidate>
                <Box className="form-sign">
                    <Grid container direction="column" gap={2}>

                        <Typography variant='h4'>Register</Typography>

                        <TextField
                            type="text"
                            fullWidth
                            label="Name"
                            placeholder="Enter your name"
                            {...register('name', {
                                required: 'Este campo es requerido',
                                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                            })}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />

                        <TextField
                            type="email"
                            fullWidth
                            label="Email"
                            placeholder="Enter your email"
                            {...register('email', {
                                required: 'Este campo es requerido',
                                validate: isEmail
                            })}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />

                        <TextField
                            fullWidth
                            type='password'
                            label="Password"
                            placeholder="Enter your password"
                            {...register('password', {
                                required: 'Este campo es requerido',
                                minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                            })}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />

                        <Button variant="contained" type="submit">
                            Register
                        </Button>

                        <Divider sx={{ width: '100%' }} >or</Divider>

                        <Grid container justifyContent="center" alignItems="center" mb={3}>
                            <Button disableTouchRipple>
                                <Image src="/google.png" width={32} height={32} alt='google' />
                            </Button>
                            <Button disableTouchRipple>
                                <Image src="/facebook.png" width={32} height={32} alt='google' />
                            </Button>
                            <Button disableTouchRipple>
                                <Image src="/appled.png" width={32} height={32} alt='google' />
                            </Button>
                        </Grid>

                        <Typography textAlign="center">
                            Already Registered?
                            <Link href={query.p ? `/auth/login?p=${query.p}` : '/auth/login'} className="custom-link" >
                                Login
                            </Link>
                        </Typography>

                    </Grid>
                </Box>
            </form>
        </AuthLayout >
    )
}

export default RegisterPage;