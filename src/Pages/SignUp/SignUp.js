import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../../context/useAuth";

export default function SignUp() {
	const { createNewUserUsingEmailPassword, signInUsingGoogle, auth } =
		useAuth();
	const { register, handleSubmit } = useForm();
	const location = useLocation();
	const navigate = useNavigate();
	const handleGoogleSignUp = () => {
		signInUsingGoogle(navigate, location);
	};

	const onSubmit = (data) => {
		createNewUserUsingEmailPassword(
			auth,
			data.email,
			data.password,
			data.displayName,
			navigate,
			location,
		);
	};
	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}>
				<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Sign up
				</Typography>
				<form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: 3 }}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								margin='normal'
								required
								fullWidth
								id='name'
								label='Name'
								name='name'
								autoComplete='family-name'
								{...register("displayName", { required: true })}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id='email'
								label='Email Address'
								name='email'
								autoComplete='email'
								{...register("email", { required: true })}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								name='password'
								label='Password'
								type='password'
								id='password'
								autoComplete='new-password'
								{...register("password", { required: true })}
							/>
						</Grid>
					</Grid>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						sx={{
							mt: 3,
							mb: 2,
							backgroundColor: "#02598b",
							"&.MuiButtonBase-root:hover": {
								bgcolor: "#02598b",
							},
						}}>
						Sign Up
					</Button>
					<Button
						onClick={handleGoogleSignUp}
						fullWidth
						variant='contained'
						sx={{
							mt: 3,
							mb: 2,
							backgroundColor: "#02598b",
							"&.MuiButtonBase-root:hover": {
								bgcolor: "#02598b",
							},
						}}>
						Sign Up With Google
					</Button>
					<Grid container justifyContent='center'>
						<Grid item>
							<Link to='/login' variant='body2'>
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</form>
			</Box>
		</Container>
	);
}
