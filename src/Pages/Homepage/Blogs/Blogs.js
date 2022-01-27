import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, Container, Grid, Rating } from "@mui/material";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import DateRangeIcon from "@mui/icons-material/DateRange";
import CreateIcon from "@mui/icons-material/Create";

export default function Blogs() {
	const [page, setPage] = useState(0);
	const [pageCount, setPageCount] = useState(0);
	const [blogs, setBlogs] = useState([]);
	const size = 10;
	useEffect(() => {
		fetch(
			`https://pure-forest-30659.herokuapp.com/allblogs?page=${page}&&size=${size}`,
		)
			.then((res) => res.json())
			.then((data) => {
				setBlogs(data.products);
				const count = data.count;
				const pageNumber = Math.ceil(count / size);
				setPageCount(pageNumber);
			});
	}, [page]);

	return (
		<Container>
			<Typography
				variant='h3'
				component='div'
				sx={{ mb: 2, fontWeight: "bold" }}>
				FEATURED BLOG POSTS
			</Typography>
			<Grid container spacing={2} sx={{ mb: 2 }}>
				{blogs?.map((blog) => (
					<Grid item md={12} xs={12}>
						{blog?.confirmation === "Approved" && (
							<Card sx={{ borderRadius: 2 }}>
								<CardMedia
									component='img'
									height='400'
									image={blog?.imageLink}
									alt=''
								/>
								<CardContent sx={{ textAlign: "left" }}>
									<Grid container sx={{ mb: 2 }}>
										<Grid item xs>
											<Box sx={{ display: "flex", justifyContent: "center" }}>
												<DateRangeIcon />
												<Typography
													sx={{ ml: 0.5 }}
													gutterBottom
													variant='button'
													component='div'>
													{blog?.postTime}
												</Typography>
											</Box>
										</Grid>
										<Grid item xs>
											<Box sx={{ display: "flex", justifyContent: "center" }}>
												<CreateIcon />
												<Typography
													sx={{ ml: 0.5 }}
													gutterBottom
													variant='button'
													component='div'>
													{blog?.publishedBy}
												</Typography>
											</Box>
										</Grid>
										<Grid item xs>
											<Box
												sx={{
													display: "flex",
													alignItems: "center",
												}}>
												<Rating
													name='disabled'
													value={blog?.rating || 0}
													readOnly
												/>
												<Typography
													variant='subtitle1'
													sx={{ ml: 0.5 }}
													color='text.secondary'>
													{blog?.rating || 0}({blog?.totalRating || 0})
												</Typography>
											</Box>
										</Grid>
									</Grid>

									<Typography gutterBottom variant='h4'>
										{blog?.blogTitle}
									</Typography>
									<Typography variant='button' color='text.secondary'>
										{blog?.details?.slice(0, 400)}......
									</Typography>
									<br />
									<Link
										to={`/blog/${blog?._id}`}
										style={{ textDecoration: "none" }}>
										<Button endIcon={<ReadMoreIcon />}>Read More</Button>
									</Link>
								</CardContent>
							</Card>
						)}
					</Grid>
				))}
			</Grid>
			<div className='pagination'>
				{[...Array(pageCount).keys()].map((number) => (
					<button
						className={number === page ? "selected" : ""}
						key={number}
						onClick={() => setPage(number)}>
						{number + 1}
					</button>
				))}
			</div>
		</Container>
	);
}
