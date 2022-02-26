import {
	Backdrop,
	Button,
	CircularProgress,
	Container,
	Grid,
	TextField,
	Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

const EditBlog = () => {
	const [submitting, setSubmitting] = useState(false);
	const [data, setData] = useState();
	const { register, handleSubmit, reset } = useForm({
		defaultValues: {
			blogTitle: "",
			publishedBy: "",
			totalDays: "",
			totalCost: "",
			location: "",
			details: "",
			blogID: "",
			catagory: "",
		},
	});
	const { id } = useParams();

	useEffect(() => {
		axios
			.get(`https://pure-forest-30659.herokuapp.com/blogs/${id}`)
			.then((res) => {
				reset(res.data);
				setData(res.data);
			});
	}, [id, reset]);
	console.log(data);
	const onSubmit = ({
		blogTitle,
		totalDays,
		totalCost,
		location,
		details,
		catagory,
	}) => {
		const book = {
			blogTitle,
			publishedBy: data?.publishedBy,
			totalDays,
			totalCost,
			location,
			details,
			blogID: data?.blogID,
			catagory,
		};
		setSubmitting(true);
		axios
			.put(`https://pure-forest-30659.herokuapp.com/blogupdate/${id}`, book)
			.then(function (response) {
				Swal.fire({
					icon: "success",
					title: "Your Blog Successfully Updated",
					showConfirmButton: false,
					timer: 1500,
				});
				setSubmitting(false);
				reset();
			})
			.catch(function (error) {
				console.log("error", error);
				console.log(error);
			});
		reset();
	};

	return (
		<Container>
			<Typography
				sx={{ fontWeight: 900, mb: 3.5 }}
				variant='h4'
				component='div'
				className='color'
				gutterBottom>
				Edit Blog
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)} method='post'>
				<Grid container spacing={2}>
					<Grid item md={6} xs={12}>
						<Grid container spacing={2}>
							<Grid item md={12} xs={12}>
								<TextField
									required
									sx={{ width: "100%" }}
									id='outlined-basic'
									name='blogTitle'
									label='Enter Blog Title'
									InputLabelProps={{
										shrink: true,
									}}
									{...register("blogTitle", { required: true })}
								/>
							</Grid>
							<Grid item md={6} xs={6}>
								<TextField
									required
									sx={{ width: "100%" }}
									id='outlined-basic'
									name='totalDays'
									label='Total Days'
									InputLabelProps={{
										shrink: true,
									}}
									{...register("totalDays", { required: true })}
								/>
							</Grid>
							<Grid item md={6} xs={6}>
								<TextField
									required
									sx={{ width: "100%" }}
									id='outlined-basic'
									name='totalCost'
									label='Total cost'
									InputLabelProps={{
										shrink: true,
									}}
									{...register("totalCost", { required: true })}
								/>
							</Grid>
							<Grid item md={12} xs={12}>
								<TextField
									required
									sx={{ width: "100%" }}
									id='outlined-basic'
									name='catagory'
									label='Catagory'
									InputLabelProps={{
										shrink: true,
									}}
									{...register("catagory", { required: true })}
								/>
							</Grid>
							<Grid item md={12} xs={12}>
								<TextField
									required
									sx={{ width: "100%" }}
									id='outlined-basic'
									label='Visited Location'
									name='location'
									InputLabelProps={{
										shrink: true,
									}}
									{...register("location", { required: true })}
								/>
							</Grid>
						</Grid>
					</Grid>
					<Grid item md={6} xs={12}>
						<TextField
							required
							sx={{ width: "100%", mb: 2 }}
							id='"outlined-multiline-flexible'
							label='Blog Details '
							name='details'
							multiline
							rows={10.5}
							InputLabelProps={{
								shrink: true,
							}}
							{...register("details", { required: true })}
						/>
					</Grid>
				</Grid>
				<Button
					className='button'
					type='submit'
					variant='contained'
					sx={{
						mt: { xs: 2, md: 0 },
						width: "100%",
						mb: 2,
						px: 3,
						fontWeight: "bold",
						borderRadius: "25px",
					}}>
					Edit Blog
				</Button>
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

export default EditBlog;
