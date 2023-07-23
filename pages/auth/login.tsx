import { useState } from 'react';
import { useRouter } from "next/router";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

import { getSession, signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

import { alertSnack, isEmail } from "@/utils";

import { Box, Button, Checkbox, Divider, FormControlLabel, FormGroup, Grid, TextField, Typography } from "@mui/material";
import { AuthLayout } from "@/components";

type FormData = {
    email: string;
    password: string;
};

const LoginPage: NextPage = () => {

    const { reload, query } = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [submitted, setSubmitted] = useState<boolean>(false);

    const onLogin = async ({ email, password }: FormData) => {
        setSubmitted(true);
        const resp = await signIn('credentials', {
            email,
            password,
            redirect: false,
        });
        setSubmitted(false);
        if (resp?.error) {
            alertSnack('Invalid credentials', 'error');
        } else {
            reload()
        }
    }

    return (
        <AuthLayout title="Ingresar">
            <form onSubmit={handleSubmit(onLogin)} noValidate>
                <Box className="form-sign">
                    <Grid container direction="column" gap={2}>

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

                        <Button variant="contained" type="submit" disabled={submitted}>
                            Login
                        </Button>

                        <Typography textAlign="center" mt={1}> Forgot password? </Typography>

                        <FormGroup>
                            <FormControlLabel control={<Checkbox />} label="Recordame" />
                        </FormGroup>

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