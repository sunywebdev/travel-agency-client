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
import PropagateLoader from "react-spinners/PropagateLoader";

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
				sx={{ mb: 3, fontWeight: "bold" }}>
				<span className='color'>FEATURED </span> BLOG POSTS
			</Typography>
			{blogs?.length ? (
				<Grid container spacing={2} sx={{ mb: 2 }}>
					{blogs?.map((blog, i) => (
						<Grid item md={12} xs={12} key={i}>
							{blog?.confirmation === "Approved" && (
								<Card
									elevation={3}
									sx={{
										borderRadius: 2,
										display: "flex",
										flexDirection: { md: "row", xs: "column" },
										backgroundColor: "transparent",
									}}>
									<CardMedia
										component='img'
										sx={{ width: { md: 300, xs: "100%" } }}
										image={blog?.imageLink}
										alt=''
									/>
									<CardContent sx={{ textAlign: "left" }}>
										<Grid
											container
											sx={{
												mb: 2,
												justifyContent: "space-between",
												color: "#02020285",
											}}>
											<Grid item>
												<Box sx={{ display: "flex" }}>
													<DateRangeIcon className='color' />
													<Typography
														sx={{ ml: 0.5 }}
														gutterBottom
														variant='button'
														component='div'>
														{blog?.postTime.split(",")[0]}
													</Typography>
												</Box>
											</Grid>
											<Grid item>
												<Box sx={{ display: "flex" }}>
													<CreateIcon className='color' />
													<Typography
														sx={{ ml: 0.5 }}
														gutterBottom
														variant='button'
														component='div'>
														{blog?.publishedBy}
													</Typography>
												</Box>
											</Grid>
											<Grid item>
												<Box
													sx={{
														display: "flex",
													}}>
													<Rating
														className='color'
														sx={{ color: "#02020285" }}
														precision={0.1}
														name='disabled'
														value={blog?.rating || 0}
														readOnly
													/>
													<Typography variant='subtitle1' sx={{ ml: 0.5 }}>
														{blog?.rating || 0}({blog?.totalRating || 0})
													</Typography>
												</Box>
											</Grid>
										</Grid>

										<Typography
											className='color'
											gutterBottom
											variant='h5'
											sx={{ fontWeight: "bold" }}>
											{blog?.blogTitle}
										</Typography>
										<Typography variant='button' color='text.secondary'>
											{blog?.details?.slice(0, 400)}......
										</Typography>
										<br />
										<Link
											to={`/blog/${blog?._id}`}
											style={{ textDecoration: "none" }}>
											<Button
												className='button'
												sx={{ mt: 1 }}
												variant='contained'
												endIcon={<ReadMoreIcon />}>
												Read More
											</Button>
										</Link>
									</CardContent>
								</Card>
							)}
						</Grid>
					))}
				</Grid>
			) : (
				<div className='loader'>
					<PropagateLoader size={10} />
				</div>
			)}
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
