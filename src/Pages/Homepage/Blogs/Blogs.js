import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, Container, Grid, Pagination, Rating } from "@mui/material";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import DateRangeIcon from "@mui/icons-material/DateRange";
import CreateIcon from "@mui/icons-material/Create";

export default function Blogs() {
	const [blogs, setBlogs] = React.useState([]);
	React.useEffect(() => {
		fetch(`https://pure-forest-30659.herokuapp.com/blogs`)
			.then((res) => res.json())
			.then((data) => setBlogs(data.reverse()));
	}, []);

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
					</Grid>
				))}
			</Grid>
			<Pagination
				count={10}
				variant='outlined'
				color='primary'
				sx={{ my: 1, "& .MuiPagination-ul": { justifyContent: "center" } }}
			/>
		</Container>
	);
}
