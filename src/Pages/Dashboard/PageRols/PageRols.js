import {
	Autocomplete,
	Backdrop,
	Button,
	CircularProgress,
	Container,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../context/useAuth";

const PageRols = () => {
	const { token } = useAuth();
	const [allUsers, setAllUsers] = useState([]);
	const [submitting, setSubmitting] = useState(false);
	useEffect(() => {
		fetch(`https://pure-forest-30659.herokuapp.com/users`)
			.then((res) => res.json())
			.then((data) => setAllUsers(data));
	}, []);

	const { register, handleSubmit } = useForm();
	const onSubmit = (data) => {
		setSubmitting(true);
		axios
			.put(`https://pure-forest-30659.herokuapp.com/users/pageRole`, data, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(function (response) {
				Swal.fire("Success!", "User Role Changed Successfully.", "success");
				setSubmitting(false);
			})
			.catch(function (error) {
				Swal.fire("Error!", "You don't have access to change role.", "error");
				setSubmitting(false);
			});
	};

	return (
		<Container>
			<Typography
				variant='h4'
				gutterBottom
				component='div'
				className='color'
				sx={{ fontWeight: "bold" }}>
				Change or Add Page Role
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid
					item
					xs={12}
					md={6}
					sx={{ textAlign: "left", mx: "auto", my: { xs: 5 } }}>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							"& > :not(style)": { m: 1 },
						}}>
						<Autocomplete
							freeSolo
							id='free-solo-2-demo'
							disableClearable
							options={allUsers?.map((user) => user?.email)}
							renderInput={(params) => (
								<TextField
									{...register("email", { required: true })}
									{...params}
									label='Search Users'
									InputProps={{
										...params.InputProps,
										type: "search",
									}}
								/>
							)}
						/>
						<FormControl>
							<InputLabel id='demo-simple-select-autowidth-label'>
								Roles
							</InputLabel>
							<Select
								labelId='demo-simple-select-autowidth-label'
								id='demo-simple-select-autowidth'
								autoWidth
								label='Roles'
								{...register("userRole", { required: true })}>
								<MenuItem value='Admin'>Admin</MenuItem>
								<MenuItem value='User'>User</MenuItem>
							</Select>
						</FormControl>
						<Button type='submit' variant='contained' className='button'>
							Change Role
						</Button>
					</Box>
				</Grid>
			</form>
			<Backdrop
				sx={{
					color: "#fff",
					zIndex: (theme) => theme.zIndex.drawer + 1,
				}}
				open={submitting}>
				<CircularProgress color='inherit' />
			</Backdrop>
		</Container>
	);
};

export default PageRols;
