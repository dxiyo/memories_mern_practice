import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
import { Container, Button, Paper, Grid, Typography, Avatar, TextField } from '@material-ui/core'
import Lock from '@material-ui/icons/Lock'
import useStyles from './style'
import Input from './Input'
import Icon from './Icon'

const Auth = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(false)
    const [isSignUp, setIsSignUp] = useState(true)
    const navigate = useNavigate()

    const handleSubmit = () => {

    }

    const handleChange = () => {

    }

    const handleShowPassword = () => setShowPassword(prevshowPassword => !prevshowPassword)

    const switchMode = () => {
        setIsSignUp(prevIsSignUp => !prevIsSignUp)
        handleShowPassword(false)
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj // ?. will mean the console wont throw an error if res doesnt exist
        const token = res?.tokenId
        
        try {
            dispatch({ type: "AUTH", data: { result, token } })

            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    const googleFailure = () => {
        console.log("Google Sign In was unsuccessful. Try again later.")
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <Lock />
                </Avatar>
                <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
                <form action="" className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autofocus half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        { isSignUp &&  <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" />}
                    </Grid>
                    <Button type="submit" className={classes.submit} fullwidth variant="contained" color="primary">
                        { isSignUp ? "Sign Up" : "Sign In" }
                    </Button>
                    <GoogleLogin
                        clientId="375229301943-gr30hep8fejrf9et0o1tr6f4h03649si.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />}variant="contained"> 
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justifyy="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                { isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up" }
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
