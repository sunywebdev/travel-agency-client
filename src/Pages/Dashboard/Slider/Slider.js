import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import {
	Backdrop,
	Box,
	IconButton,
	Button,
	CircularProgress,
	Container,
	Table,
	Paper,
	Grid,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	TextField,
} from "@mui/material";
import Swal from "sweetalert2";

import DeleteIcon from "@mui/icons-material/Delete";

import AttachFileIcon from "@mui/icons-material/AttachFile";
import axios from "axios";

import { styled } from "@mui/material/styles";
import { useForm } from "react-hook-form";

const Slider = () => {
	const [submitting, setSubmitting] = useState(false);
	const [imageLink2, setImageLink2] = useState(null);
	const [deleted, setDeleted] = useState(false);
	const [loading, setLoading] = useState(false);
	const [data, setData] = React.useState([]);
	useEffect(() => {
		fetch(`https://pure-forest-30659.herokuapp.com/sliders`)
			.then((res) => res.json())
			.then((data) => setData(data.reverse()));
	}, [submitting, deleted]);

	const handleDelete = (id) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				axios
					.delete(`https://pure-forest-30659.herokuapp.com/sliders/${id}`)
					.then(function (response) {
						Swal.fire("Deleted!", "That slider has been deleted.", "success");
						setDeleted(true);
					})
					.catch(function (error) {
						console.log(error);
					});
			}
		});
	};
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
		setImageLink2(file.secure_url);
		setLoading(false);
	};
	const Input = styled("input")({
		display: "none",
	});
	const { register, handleSubmit, reset } = useForm();
	const onSubmit = ({ title, subtitle }) => {
		const data = {
			title,
			subtitle,
			imageLink2,
			submitTime: new Date().toLocaleString(),
		};
		console.log(data);
		setSubmitting(true);
		axios
			.post(`https://pure-forest-30659.herokuapp.com/sliders`, data)
			.then(function (response) {
				setSubmitting(false);
				Swal.fire({
					icon: "success",
					title: "Your banner updated Successfully",
					showConfirmButton: false,
					timer: 1500,
				});
				setSubmitting(false);
				reset();
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	let count = 1;
	return (
		<Container sx={{ pt: 1 }}>
			<Typography
				variant='h4'
				gutterBottom
				className='color'
				sx={{ fontWeight: "bold" }}>
				Slider Pictures
			</Typography>
			<Typography variant='body' gutterBottom className='color'>
				Last changed in {data?.[0]?.submitTime}
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)} method='post'>
				<Box
					display='flex'
					flexDirection='column'
					alignItems='center'
					sx={{ mt: 3, mb: 1, mx: "auto" }}>
					<label
						htmlFor='icon-button-file'
						className='button'
						style={{
							color: "white",
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
						<Typography
							sx={{ my: 2, ml: 2 }}
							variant='body1'
							component='div'
							gutterBottom>
							Upload New Picture*
						</Typography>
						<IconButton
							sx={{ mx: 2 }}
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
							<CircularProgress className='color' />
						</Box>
					) : (
						<img src={imageLink2} style={{ width: "300px" }} alt='' />
					)}
				</Box>

				{imageLink2 && (
					<Grid container spacing={2}>
						<Grid item md={6} xs={12} sx={{ mx: "auto", mt: 2 }}>
							<Grid container spacing={2}>
								<Grid item md={12} xs={12}>
									<TextField
										required
										sx={{ width: "100%" }}
										id='outlined-basic'
										name='blogTitle'
										label='Enter Title'
										{...register("title", { required: true })}
									/>
								</Grid>
								<Grid item md={12} xs={12}>
									<TextField
										required
										sx={{ width: "100%" }}
										id='outlined-basic'
										name='blogTitle'
										label='Enter Subtitle'
										multiline
										rows={4}
										{...register("subtitle", { required: true })}
									/>
								</Grid>
								<Grid item md={12} xs={12}>
									<Button
										className='button'
										type='submit'
										sx={{
											width: "100%",
											fontWeight: "bold",
											border: "2px solid",
											borderRadius: "25px",
										}}
										variant='contained'>
										Upload
									</Button>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				)}
			</form>
			<Backdrop
				sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={submitting}>
				<CircularProgress color='inherit' />
			</Backdrop>

			<Grid>
				<Typography
					className='color'
					sx={{ my: 3, fontWeight: "bold" }}
					variant='h4'
					component='div'
					gutterBottom>
					All Sliders
				</Typography>
				<Paper
					className='container'
					sx={{ overflow: "auto", maxHeight: "80vh", maxWidth: "90vw" }}>
					<Table size='small' aria-label='a dense table'>
						<TableHead sx={{ th: { fontWeight: "bold" } }}>
							<TableRow>
								<TableCell align='left'>No</TableCell>
								<TableCell align='left'>Image</TableCell>
								<TableCell align='left'>Uploaded</TableCell>
								<TableCell align='left'>Title</TableCell>
								<TableCell align='left'>Subtitle</TableCell>
								<TableCell align='left'>Action</TableCell>
							</TableRow>
						</TableHead>
						{data?.length > 0 ? (
							<TableBody sx={{ td: { py: 1 } }}>
								{data.map((image) => (
									<TableRow
										key={image?._id}
										sx={{
											"&:last-child td, &:last-child th": { border: 0 },
										}}>
										<TableCell align='left'>{count++}</TableCell>
										<TableCell align='left'>
											<img src={image?.imageLink2} alt='' width='100px' />
										</TableCell>
										<TableCell align='left'>{image?.submitTime}</TableCell>
										<TableCell align='left'>{image?.title}</TableCell>
										<TableCell align='left'>{image?.subtitle}</TableCell>
										<TableCell align='left'>
											<Button
												className='button border'
												onClick={() => handleDelete(image?._id)}
												sx={{
													fontWeight: "bold",
													border: "2px solid",
													borderRadius: "25px",
												}}
												variant='contained'>
												<DeleteIcon />
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						) : (
							<TableHead sx={{ th: { fontWeight: "bold" } }}>
								<TableRow>
									<TableCell align='left'>N/A</TableCell>
									<TableCell align='left'>N/A</TableCell>
									<TableCell align='left'>N/A</TableCell>
									<TableCell align='left'>N/A</TableCell>
									<TableCell align='left'>N/A</TableCell>
									<TableCell align='left'>N/A</TableCell>
								</TableRow>
							</TableHead>
						)}
					</Table>
				</Paper>
			</Grid>
			<Backdrop
				sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={submitting}>
				<CircularProgress color='inherit' />
			</Backdrop>
		</Container>
	);
};

export default Slider;
