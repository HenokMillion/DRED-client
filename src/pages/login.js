import React, { useEffect } from "react"
import { Link } from "gatsby"
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import { navigate } from "gatsby"

import SEO from "../components/seo"
import { Image } from "../components/image"
import { handleLogin } from '../services/auth'
import { isAuthenticated, getAuthUser } from '../services/auth'

class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loggingIn: false,
            user: { username: '', password: '' }
        }
    }

    componentDidMount() {
        if (isAuthenticated()) {
            navigate('/')
        }
    }

    renderProgress() {
        return this.state.loggingIn ? (
            <span>
                <LinearProgress />
                <Paper style={{
                    width: '100%', height: '100%',
                    zIndex: '9', backgroundColor: '#e0e0e0', position: 'absolute', opacity: '.3'
                }}></Paper>
            </span>
        ) : null
    }

    async login(e) {
        e.preventDefault();
        const loginSuccess = await handleLogin(this.state.user)
        this.setState({ loggingIn: true })
        if (loginSuccess) {
            navigate('/')
            console.log('LOGIN SUCCESS', loginSuccess)
        } else {
            //
            console.log('LOGIN FAILED', loginSuccess)
        }
        this.setState({ loggingIn: false })
    }

    render() {
        return (
            <Container style={{ display: 'flex', justifyContent: "center", alignItems: "center", backgroundColor: '#E4DFED', width: '100vw', height: '100vh', margin: '0', maxWidth: 'unset' }}>
                {/* <Image type="left" /> */}
                <Paper style={{ width: '60vw', height: '80vh', position: 'relative' }}>
                    {this.renderProgress()}
                    <Container>
                        <SEO title="Login" />
                        <Grid container spacing={1} item>
                            <Grid item lg={6}>
                            </Grid>
                            <Grid item lg={6} style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                                <h1>Login</h1>
                                <Grid item container>
                                    <Image type="loginimg" />
                                </Grid>
                                <form onSubmit={e => this.login(e)}>
                                    <Grid item container>
                                        <TextField disabled={this.state.loggingIn} onChange={e => this.setState({ user: { username: e.target.value, password: this.state.user.password } })} id="username" label="Username" variant="outlined" />
                                    </Grid>
                                    <Grid item container>
                                        <TextField disabled={this.state.loggingIn} onChange={e => this.setState({ user: { username: this.state.user.username, password: e.target.value } })} id="password" label="Password" type="password" variant="outlined" />
                                    </Grid>
                                    <Grid item container>
                                        <Link to="#">Forgot Password?</Link>
                                    </Grid>
                                    <Grid item container>
                                        <Button type="submit" disabled={this.state.loggingIn} variant="contained" color="primary">
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
    }
}


export default Login
