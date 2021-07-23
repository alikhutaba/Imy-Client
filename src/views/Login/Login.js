import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { login } from '../../Redux/actions';
import { useDispatch } from "react-redux";

import { loginUser } from "Controllers/userController";



function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://www.afeka.ac.il/">
                Afeka
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Login(props) {

    const classes = useStyles();

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();



    const dispatch = useDispatch();

    const handleSubmit = async e => {
        e.preventDefault();

        await loginUser({
            username,
            password
        }).then(data => {
            dispatch(login(data));
            localStorage.setItem('rememberMe', JSON.stringify({ "email": data.email, "password": data.password }));
            props.login(true);
        }).catch(e => {
            toast.error(e.error, { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
        });

    }


    // TODO delete this auto login
    useEffect(() => {
        // autoLogin();
    }, []);// eslint-disable-line react-hooks/exhaustive-deps



    async function autoLogin() {

        await loginUser({
            username: "lolo-stam@gmail.com",
            password: "lolo123"
        }).then(data => {
            dispatch(login(data));
            localStorage.setItem('rememberMe', JSON.stringify({ "email": data.email, "password": data.password }));
            window.location.reload();
        }).catch(e => {
            toast.error(e.error, { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
        });


    }


    return (
        <Container component="main" maxWidth="xs">

            <CssBaseline />

            <div className={classes.paper}>
                <Typography component="h1" variant="h3">Imy</Typography>

                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h6">Sign in</Typography>

                <form onSubmit={handleSubmit} className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={e => setUserName(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={e => setPassword(e.target.value)}
                    />
                    {/* <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    /> */}


                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>

                    {/* <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid> */}

                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}