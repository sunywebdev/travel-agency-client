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
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import CloseIcon from "@mui/icons-material/Close";
import useAuth from "../../../context/useAuth";

const MyBlogs = () => {
	const { user } = useAuth();
	const [deleted, setDeleted] = useState(false);
	const [blogs, setBlogs] = useState([]);
	useEffect(() => {
		fetch(
			`https://pure-forest-30659.herokuapp.com/blogsbyemail?email=${user?.email}`,
		)
			.then((res) => res.json())
			.then((data) => setBlogs(data));
	}, [deleted, user?.email]);

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
					className='color'
					sx={{ mb: 3, fw: "bold" }}
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
									<TableCell className='color' align='left'>
										No
									</TableCell>
									<TableCell className='color' align='left'>
										Title
									</TableCell>
									<TableCell className='color' align='left'>
										Publish Date
									</TableCell>
									<TableCell className='color' align='left'>
										Author
									</TableCell>
									<TableCell className='color' align='left'>
										Status
									</TableCell>
									<TableCell className='color' align='left'>
										Action
									</TableCell>
								</TableRow>
							</TableHead>
							{blogs?.length > 0 ? (
								<TableBody sx={{ td: { py: 1 } }}>
									{blogs.map((blog) => (
										<TableRow
											key={blog?._id}
											sx={{
												"&:last-child td, &:last-child th": { border: 0 },
											}}>
											<TableCell align='left'>{count++}</TableCell>

											<TableCell align='left'>
												{blog?.blogTitle || "N/A"}
											</TableCell>
											<TableCell align='left'>
												{blog?.postTime || "N/A"}
											</TableCell>
											<TableCell align='left'>
												{blog?.publishedBy || "N/A"}
											</TableCell>
											<TableCell align='left'>
												{blog?.confirmation || "N/A"}
											</TableCell>
											<TableCell align='left'>
												<Button
													className='button'
													onClick={() => handleDelete(blog?._id)}
													sx={{
														fontWeight: "bold",
														border: "2px solid",
														borderRadius: "25px",
														m: 0.5,
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
			</Grid>
		</Container>
	);
};

export default MyBlogs;
