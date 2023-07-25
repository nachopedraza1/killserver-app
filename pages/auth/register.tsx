import { useContext, useRef, useState } from 'react';
import { GetServerSideProps, NextPage } from "next"
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import { getSession, signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

import { alertSnack, isEmail } from "@/utils";
import { AuthContext } from "@/context";

import { Box, Grid, Typography, TextField, Button, Divider } from "@mui/material";
import { AuthLayout, ReCaptcha } from "@/components";
import ReCAPTCHA from 'react-google-recaptcha';

type FormData = {
    name: string,
    email: string;
    password: string;
};

const RegisterPage: NextPage = () => {

    const recaptchaRef = useRef<ReCAPTCHA>(null);

    const { query } = useRouter();

    const { registerUser } = useContext(AuthContext);

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [submitted, setSubmitted] = useState<boolean>(false);

    const onRegister = async ({ name, email, password }: FormData) => {
        setSubmitted(true);
        await registerUser(name, email, password);
        setSubmitted(false);
        recaptchaRef.current?.reset();
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

                        <ReCaptcha ref={recaptchaRef} />

                        <Button variant="contained" type="submit" disabled={submitted}>
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


export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

    const session = await getSession({ req });

    const { p = '/' } = query;

    if (session) {
        return {
            redirect: {
                destination: p.toString(),
                permanent: false
            }
        }
    }

    return {
        props: {

        }
    }
}

export default RegisterPage;