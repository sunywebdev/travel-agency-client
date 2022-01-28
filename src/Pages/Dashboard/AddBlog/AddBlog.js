import {
	Backdrop,
	Button,
	CircularProgress,
	Container,
	Grid,
	IconButton,
	TextField,
	Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import useAuth from "../../../context/useAuth";

const AddBlog = () => {
	const { user } = useAuth();
	const [submitting, setSubmitting] = useState(false);
	const [imageLink, setImageLink] = useState(null);
	const [loading, setLoading] = useState(false);
	const uploadImage = async (e) => {
		const files = e.target.files;
		const data = new FormData();
		data.append("file", files[0]);
		data.append("upload_preset", "travel-blogs");
		setLoading(true);
		const res = await fetch(
			"https://api.cloudinary.com/v1_1/dqdug0ows/image/upload",
			{
				method: "POST",
				body: data,
			},
		);
		const file = await res.json();
		setImageLink(file.secure_url);
		setLoading(false);
	};
	const Input = styled("input")({
		display: "none",
	});
	const { register, handleSubmit, reset } = useForm();
	const onSubmit = ({
		blogTitle,
		publishedBy,
		totalDays,
		totalCost,
		location,
		details,
		blogID,
		catagory,
	}) => {
		const book = {
			imageLink: imageLink,
			blogTitle,
			publishedBy,
			publisherPhoto: user?.photoURL,
			userEmail: user?.email,
			postTime: new Date().toLocaleString(),
			totalRating: 0,
			rating: 0,
			totalDays,
			totalCost,
			location,
			details,
			blogID,
			catagory,
			confirmation: "Pending",
		};
		setSubmitting(true);
		axios
			.post(`https://pure-forest-30659.herokuapp.com/blogs`, book)
			.then(function (response) {
				Swal.fire({
					icon: "success",
					title: "Your Blog Successfully Added",
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
				Add New Blog
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)} method='post'>
				<Box
					display='flex'
					flexDirection='column'
					alignItems='center'
					sx={{
						mt: 3,
						mb: 2,
						mx: "auto",
						color: "white",
					}}>
					<label
						htmlFor='icon-button-file'
						className='button'
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							margin: "0 9px",
							borderRadius: 5,
						}}>
						<Input
							accept='image/*'
							id='icon-button-file'
							type='file'
							onChange={uploadImage}
						/>
						<Typography sx={{ m: 2 }} variant='h6' component='div' gutterBottom>
							Upload Blog Photo
						</Typography>
						<IconButton
							color='primary'
							aria-label='upload picture'
							component='span'>
							<AttachFileIcon
								fontSize='large'
								sx={{ fontWeight: "bold", color: "white" }}
							/>
						</IconButton>
					</label>

					{loading ? (
						<Box sx={{ my: 2 }}>
							<CircularProgress className='textColor' />
						</Box>
					) : (
						<img
							src={imageLink}
							style={{ width: "100px", padding: "5px 0" }}
							alt=''
						/>
					)}
				</Box>
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
									{...register("blogTitle", { required: true })}
								/>
							</Grid>
							<Grid item md={12} xs={12}>
								<TextField
									required
									sx={{ width: "100%" }}
									id='outlined-basic'
									defaultValue={user?.displayName}
									name='publishedBy'
									label='Published By'
									{...register("publishedBy", { required: true })}
								/>
							</Grid>
							<Grid item md={6} xs={6}>
								<TextField
									required
									sx={{ width: "100%" }}
									id='outlined-basic'
									name='totalDays'
									label='Total Days'
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
									{...register("totalCost", { required: true })}
								/>
							</Grid>
							<Grid item md={12} xs={12}>
								<TextField
									required
									sx={{ width: "100%" }}
									id='outlined-basic'
									label='Visited Location'
									name='location'
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
							rows={10}
							{...register("details", { required: true })}
						/>
					</Grid>
					<Grid item md={6} xs={12}>
						<TextField
							required
							sx={{ width: "100%", mb: { md: 2, xs: 0 } }}
							id='outlined-basic'
							name='blogID'
							value={`blog${Math.floor(Math.random() * 90000) + 10000}`}
							label='Blog ID'
							{...register("blogID", { required: true })}
						/>
					</Grid>
					<Grid item md={6} xs={12}>
						<TextField
							required
							sx={{ width: "100%" }}
							id='outlined-basic'
							name='catagory'
							label='Catagory'
							{...register("catagory", { required: true })}
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
					Add Blog
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

export default AddBlog;
