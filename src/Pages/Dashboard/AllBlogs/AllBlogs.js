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

const AllBlogs = () => {
	const [deleted, setDeleted] = useState(false);
	const [blogs, setBlogs] = useState([]);
	useEffect(() => {
		fetch(`https://pure-forest-30659.herokuapp.com/blogs`)
			.then((res) => res.json())
			.then((data) => setBlogs(data));
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
					.delete(`https://pure-forest-30659.herokuapp.com/blogs/${id}`)
					.then(function (response) {
						Swal.fire("Deleted!", "That blog has been removed.", "success");
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
		<Container
			sx={{
				mt: { xs: 9, md: 2 },
				minHeight: "100vh",
			}}>
			<Grid>
				<Typography
					className='color-theme'
					sx={{ mb: 3, fw: "bold", color: "#02598b" }}
					variant='h4'
					component='div'
					gutterBottom>
					All Blogs
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
										Title
									</TableCell>
									<TableCell className='color-theme' align='left'>
										Publish Date
									</TableCell>
									<TableCell className='color-theme' align='left'>
										Author
									</TableCell>
									<TableCell className='color-theme' align='left'>
										Action
									</TableCell>
								</TableRow>
							</TableHead>
							{blogs?.length > 0 ? (
								<TableBody sx={{ td: { py: 1 } }}>
									{blogs.map((book) => (
										<TableRow
											key={book?._id}
											sx={{
												"&:last-child td, &:last-child th": { border: 0 },
											}}>
											<TableCell align='left'>{count++}</TableCell>

											<TableCell align='left'>
												{book?.blogTitle || "N/A"}
											</TableCell>
											<TableCell align='left'>
												{book?.postTime || "N/A"}
											</TableCell>
											<TableCell align='left'>
												{book?.publishedBy || "N/A"}
											</TableCell>
											<TableCell align='left'>
												<Button
													className='button border'
													onClick={() => handleDelete(book?._id)}
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

export default AllBlogs;
