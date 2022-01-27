import {
	Button,
	Container,
	Grid,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

const AllReviews = () => {
	const [deleted, setDeleted] = useState(false);
	const [reviews, setReviews] = useState([]);
	useEffect(() => {
		fetch(`https://pure-forest-30659.herokuapp.com/reviews`)
			.then((res) => res.json())
			.then((data) => setReviews(data));
	}, [deleted]);

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
					.delete(`https://pure-forest-30659.herokuapp.com/reviews/${id}`)
					.then(function (response) {
						Swal.fire("Deleted!", "That Review has been deleted.", "success");
						setDeleted(true);
					})
					.catch(function (error) {
						console.log(error);
					});
			}
		});
	};

	let count = 1;
	return (
		<Container sx={{ mt: { xs: 9, md: 2 }, minHeight: "100vh" }}>
			<Grid>
				<Typography
					className='color-theme'
					sx={{ mb: 3, fw: "bold", color: "#02598b" }}
					variant='h4'
					component='div'
					gutterBottom>
					All Reviews
				</Typography>
				<Grid item xs={12} md={12}>
					<Paper
						className='container'
						sx={{ overflow: "auto", maxHeight: "80vh" }}>
						<Table size='small' aria-label='a dense table'>
							<TableHead sx={{ th: { fontWeight: "bold" } }}>
								<TableRow>
									<TableCell className='color-theme' align='left'>
										No
									</TableCell>
									<TableCell className='color-theme' align='left'>
										Photo
									</TableCell>
									<TableCell className='color-theme' align='left'>
										Name
									</TableCell>
									<TableCell className='color-theme' align='left'>
										Time
									</TableCell>
									<TableCell className='color-theme' align='left'>
										Email
									</TableCell>
									<TableCell className='color-theme' align='left'>
										Star
									</TableCell>
									<TableCell className='color-theme' align='left'>
										Reviews
									</TableCell>
									<TableCell className='color-theme' align='left'>
										Action
									</TableCell>
								</TableRow>
							</TableHead>
							{reviews?.length > 0 ? (
								<TableBody sx={{ td: { py: 1 } }}>
									{reviews.map((review) => (
										<TableRow
											key={review?._id}
											sx={{
												"&:last-child td, &:last-child th": { border: 0 },
											}}>
											<TableCell align='left'>{count++}</TableCell>
											<TableCell>
												<img
													src={review?.userPhoto || "N/A"}
													alt=''
													width='35px'
													height='35px'
													style={{ borderRadius: "50%" }}
												/>
											</TableCell>
											<TableCell align='left'>
												{review?.userName || "N/A"}
											</TableCell>
											<TableCell align='left'>
												{review?.postTime || "N/A"}
											</TableCell>
											<TableCell align='left'>
												{review?.userEmail || "N/A"}
											</TableCell>
											<TableCell align='left'>
												{review?.rating || "N/A"}
											</TableCell>
											<TableCell align='left'>
												{review?.review || "N/A"}
											</TableCell>
											<TableCell align='left'>
												<Button
													className='button border'
													onClick={() => handleDelete(review?._id)}
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
										<TableCell align='left'>N/A</TableCell>
										<TableCell align='left'>N/A</TableCell>
									</TableRow>
								</TableHead>
							)}
						</Table>
					</Paper>
				</Grid>
			</Grid>
		</Container>
	);
};

export default AllReviews;
