import { useContext, useRef, useState } from 'react';
import { useForm } from "react-hook-form";

import { useRouter } from "next/router";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

import { getSession } from "next-auth/react";
import ReCAPTCHA from 'react-google-recaptcha';

import { isEmail } from "@/utils";
import { AuthContext } from '@/context';

import { Box, Button, CircularProgress, Divider, Grid, TextField, Typography } from "@mui/material";
import { AuthLayout, ReCaptcha } from "@/components";

type FormData = {
    email: string;
    password: string;
};

const LoginPage: NextPage = () => {

    const recaptchaRef = useRef<ReCAPTCHA>(null);

    const { query } = useRouter();

    const { loginUser } = useContext(AuthContext);

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const [submitted, setSubmitted] = useState<boolean>(false);

    const onLogin = async ({ email, password }: FormData) => {
        setSubmitted(true);
        await loginUser(email, password)
        setSubmitted(false);
        recaptchaRef.current?.reset();
    }

    return (
        <AuthLayout title="Ingresar">
            <form onSubmit={handleSubmit(onLogin)} noValidate>
                <Box className="form-sign">
                    <Grid container direction="column" gap={1.6}>

                        <Typography variant='h4'>Login</Typography>

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
                            {submitted ? <CircularProgress size={25} /> : "login"}
                        </Button>

                        <Typography textAlign="center" mt={1}> Forgot password? </Typography>

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
                            Don’t have an account ?
                            <Link href={query.p ? `/auth/register?p=${query.p}` : '/auth/register'} className="custom-link" >
                                Signup
                            </Link>
                        </Typography>
                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    )
}


export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

    const session = await getSession({ req });

    const { p = '/' } = query;

    if (session) {
        return {
            redirect: {
                destination: p?.toString(),
                permanent: false
            }
        }
    }

    return {
        props: {

        }
    }
}

export default LoginPage;