import { useContext, useEffect, useRef, useState } from 'react';
import { GetServerSideProps, NextPage } from "next"
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import { getProviders, getSession, signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

import { isEmail } from "@/utils";
import { AuthContext } from "@/context";

import { Grid, Typography, TextField, Button, Divider, CircularProgress, IconButton } from '@mui/material';
import { AuthLayout, ReCaptcha } from "@/components";
import ReCAPTCHA from 'react-google-recaptcha';

type FormData = {
    name: string,
    email: string;
    password: string;
};

const RegisterPage: NextPage = () => {

    const [providers, setProviders] = useState<any>({});

    useEffect(() => {
        getProviders().then(prov => {
            setProviders(prov)
        })
    }, [])

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
            <form onSubmit={handleSubmit(onRegister)} noValidate className="form-sign">

                <Grid container direction="column" gap={1.5}>
                    <Typography variant='h4'>Register</Typography>
                    <TextField
                        type="text"
                        fullWidth
                        label="Name"
                        placeholder="Enter your name"
                        {...register('name', {
                            required: 'Required',
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
                            required: 'Required',
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
                            required: 'Required',
                            minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                        })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />

                    <ReCaptcha ref={recaptchaRef} />

                    <Button variant="contained" type="submit" disabled={submitted}>
                        {submitted ? <CircularProgress size={25} /> : "login"}
                    </Button>

                    <Divider sx={{ width: '100%' }} >or</Divider>

                    <Grid container justifyContent="center" alignItems="center" mb={1}>
                        <IconButton disableRipple onClick={() => signIn(providers.discord.id)}>
                            <Image src="/discord.png" width={38} height={39} alt='discord' />
                        </IconButton>
                        <IconButton disableRipple onClick={() => signIn(providers.facebook.id)}  >
                            <Image src="/facebook.png" width={32} height={32} alt='facebook' />
                        </IconButton>
                        <IconButton disableRipple onClick={() => signIn(providers.github.id)} >
                            <Image src="/github.png" width={32} height={32} alt='github' />
                        </IconButton>
                    </Grid>

                    <Typography textAlign="center">
                        Already Registered?
                        <Link href={query.p ? `/auth/login?p=${query.p}` : '/auth/login'} className="custom-link" >
                            Login
                        </Link>
                    </Typography>
                </Grid>

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