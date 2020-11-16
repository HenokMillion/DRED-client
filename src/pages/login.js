import React from "react"
import { Link } from "gatsby"
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Img from "gatsby-image"
import Paper from '@material-ui/core/Paper';

import SEO from "../components/seo"
import { Image } from "../components/image"
import { handleLogin } from '../services/auth'

let user =  {
    username: "",
    password: ""
}
const login = (e) => {
    e.preventDefault();
    // console.log(user)
    handleLogin(user)
}

const Login = () => (
    <Container style={{ display: 'flex', justifyContent: "center", alignItems: "center", backgroundColor: '#E4DFED', width: '100vw', height: '100vh', margin: '0', maxWidth: 'unset' }}>
        {/* <Image type="left" /> */}
        <Paper style={{ width: '60vw', height: '80vh' }}>
            <Container>
                <SEO title="Login" />
                <Grid container spacing={1} item>
                    <Grid item lg={6}>
                        {/* <Image type="left" /> */}
                    </Grid>
                    <Grid item lg={6} style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                        <h1>Login</h1>
                        <Grid item container>
                            <Image type="left" />
                        </Grid>
                        <form onSubmit={e => login(e)}>
                            <Grid item container>
                                <TextField onChange={e => {user.username = e.target.value}} id="username" label="Username" variant="outlined" />
                            </Grid>
                            <Grid item container>
                                <TextField onChange={e => {user.password = e.target.value}} id="password" label="Password" type="password" variant="outlined" />
                            </Grid>
                            <Grid item container>
                                <Link to="/">Go back to the homepage</Link>
                            </Grid>
                            <Grid item container>
                                <Button type="submit" variant="contained" color="primary">
                                    SIGN IN
                        </Button>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Container>
        </Paper>
    </Container>
)


export default Login
