import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
	Avatar,
	Button,
	Container,
	Divider,
	Grid,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Paper,
	Rating,
	TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import DateRangeIcon from "@mui/icons-material/DateRange";
import CreateIcon from "@mui/icons-material/Create";
import CategoryIcon from "@mui/icons-material/Category";
import RecentBlogs from "./RecentBlogs";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import RateReviewIcon from "@mui/icons-material/RateReview";
import StarIcon from "@mui/icons-material/Star";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAuth from "../../context/useAuth";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const SingleBlog = () => {
	const { user } = useAuth();
	const [submitting, setSubmitting] = React.useState(false);
	const [value, setValue] = React.useState(0);
	const { handleSubmit, register, reset } = useForm();
	const onSubmit = ({ review }) => {
		setSubmitting(true);
		const userReview = {
			review,
			rating: value,
			blogID: blog?.blogID,
			userPhoto: singleUser?.photoURL,
			userName: singleUser?.displayName,
			userEmail: singleUser?.email,
		};
		console.log(userReview);
		axios
			.post(`https://pure-forest-30659.herokuapp.com/reviews`, userReview)
			.then(function (response) {
				Swal.fire({
					icon: "success",
					title: "Review Added Successfully",
					showConfirmButton: true,
					timer: 2500,
				}).then(function () {
					const save = {
						blogID: blog?.blogID,
						rating: starAvg,
						totalRating: reviews?.length,
					};
					axios
						.put(`https://pure-forest-30659.herokuapp.com/blogRating`, save)
						.then(function (response) {})
						.catch(function (error) {
							console.log(error);
						});
				});

				setSubmitting(false);
				reset();
			})
			.catch(function (error) {
				console.log(error);
			});
		reset();
	};

	const [singleUser, setSingleUser] = React.useState();
	React.useEffect(() => {
		fetch(
			`https://pure-forest-30659.herokuapp.com/singleUsers?email=${user?.email}`,
		)
			.then((res) => res.json())
			.then((data) => {
				reset(data);
				setSingleUser(data);
			});
	}, [reset, user?.email]);

	const { id } = useParams();
	const [blog, setBlog] = React.useState();
	React.useEffect(() => {
		fetch(`https://pure-forest-30659.herokuapp.com/blogs/${id}`)
			.then((res) => res.json())
			.then((data) => {
				reset(data);
				setBlog(data);
			});
	}, [id, reset]);

	const [reviews, setReviews] = React.useState([]);
	React.useEffect(() => {
		fetch(
			`https://pure-forest-30659.herokuapp.com/reviewss?blogID=${blog?.blogID}`,
		)
			.then((res) => res.json())
			.then((data) => setReviews(data));
	}, [blog?.blogID, submitting]);

	const [starAvg, setStarAvg] = React.useState("");
	React.useEffect(() => {
		let filter = reviews?.filter(({ blogID }) => blogID === blog?.blogID);
		const avg = filter?.reduce((r, c) => r + c?.rating, 0) / filter?.length;
		setStarAvg(avg);
	}, [blog?.blogID, reviews]);

	return (
		<>
			<Navbar />
			<Container sx={{ my: 2 }} maxWidth={false}>
				<Grid container spacing={2} sx={{ mb: 2 }}>
					<Grid item md={9} xs={12}>
						<Card sx={{ borderRadius: 2 }}>
							<CardMedia
								component='img'
								height='100%'
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
											<CategoryIcon />
											<Typography
												sx={{ ml: 0.5 }}
												gutterBottom
												variant='button'
												component='div'>
												{blog?.catagory}
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
											<Rating name='disabled' value={starAvg} readOnly />
											<Typography
												variant='subtitle1'
												sx={{ ml: 0.5 }}
												color='text.secondary'>
												{starAvg}({reviews?.length})
											</Typography>
										</Box>
									</Grid>
								</Grid>

								<Typography gutterBottom variant='h3'>
									{blog?.blogTitle}
								</Typography>
								<Typography variant='button' color='text.secondary'>
									{blog?.details.slice(0, 1000)}
								</Typography>
								<Grid container spacing={2} sx={{ my: 2 }}>
									<Grid item md={4} xs={12}>
										<img
											style={{ width: "100%" }}
											src='https://wanderland.qodeinteractive.com/wp-content/uploads/2019/10/blog-post-img-06.jpg'
											alt=''
										/>
									</Grid>
									<Grid item md={4} xs={12}>
										<img
											style={{ width: "100%" }}
											src='https://wanderland.qodeinteractive.com/wp-content/uploads/2019/10/blog-post-img-07.jpg'
											alt=''
										/>
									</Grid>
									<Grid item md={4} xs={12}>
										<img
											style={{ width: "100%" }}
											src='https://wanderland.qodeinteractive.com/wp-content/uploads/2019/10/blog-post-img-06.jpg'
											alt=''
										/>
									</Grid>
								</Grid>
								<Typography variant='button' color='text.secondary'>
									{blog?.details.slice(1000)}
								</Typography>
								<Box
									sx={{
										display: "flex",
										flexDirection: { md: "row", xs: "column" },
										mt: 4,
									}}>
									<Box>
										<img
											src='https://wanderland.qodeinteractive.com/wp-content/uploads/2019/10/blog-author-img-02.png'
											alt=''
										/>
									</Box>
									<Box sx={{ mx: 2 }}>
										<Box
											sx={{
												display: "flex",
												alignItems: "center",
											}}>
											<Typography
												variant='h6'
												sx={{
													fontWeight: "bold",
												}}>
												Traveler :
											</Typography>
											<Typography variant='h6'>
												&nbsp; {blog?.publishedBy}
											</Typography>
										</Box>
										<Box
											sx={{
												display: "flex",
												alignItems: "center",
											}}>
											<Typography
												variant='h6'
												sx={{
													fontWeight: "bold",
												}}>
												Location :
											</Typography>
											<Typography variant='h6'>
												&nbsp; {blog?.location}
											</Typography>
										</Box>
										<Box
											sx={{
												display: "flex",
												alignItems: "center",
											}}>
											<Typography
												variant='h6'
												sx={{
													fontWeight: "bold",
												}}>
												Total Days :
											</Typography>
											<Typography variant='h6'>
												&nbsp; {blog?.totalDays} days
											</Typography>
										</Box>
										<Box
											sx={{
												display: "flex",
												alignItems: "center",
											}}>
											<Typography
												variant='h6'
												sx={{
													fontWeight: "bold",
												}}>
												Cost of the travel :
											</Typography>
											<Typography variant='h6'>
												&nbsp;{blog?.totalCost}$
											</Typography>
										</Box>
									</Box>
								</Box>
							</CardContent>
						</Card>
						<Accordion sx={{ my: 2 }}>
							<AccordionSummary
								aria-controls='panel1a-content'
								id='panel1a-header'>
								<Typography
									variant='body1'
									sx={{ fontWeight: "bold", mr: 1.5 }}>
									Add Your Review
								</Typography>
								<RateReviewIcon />
							</AccordionSummary>
							<AccordionDetails>
								<form onSubmit={handleSubmit(onSubmit)}>
									<Box display='flex' flexDirection='column'>
										<Box display='flex'>
											<Rating
												sx={{ fontSize: 40 }}
												name='simple-controlled'
												value={value}
												onChange={(event, newValue) => {
													setValue(newValue);
												}}
											/>
											<Typography variant='h4' sx={{ pt: 0.4, pl: 1.5 }}>
												{value || 0}
											</Typography>
										</Box>

										<TextField
											required
											placeholder='Rating'
											value={value}
											sx={{ display: "none" }}
											{...register("rating", { required: true })}
										/>
										<TextField
											multiline
											rows={4}
											required
											placeholder='Your Review'
											{...register("review", { required: true })}
										/>
										<Button
											type='submit'
											variant='contained'
											sx={{
												width: "100%",
												maxWidth: "300px",
												fontWeight: "bold",
												borderRadius: "25px",
												border: "2px solid",
												my: 1.5,
											}}>
											Post Review
										</Button>
									</Box>
								</form>
							</AccordionDetails>
						</Accordion>
						<Paper elevation={3}>
							<Typography variant='h4' sx={{ fontWeight: "bold", pt: 1 }}>
								Community Reviews
							</Typography>
							{reviews.length > 0 ? (
								<List
									sx={{
										width: "100%",
										bgcolor: "background.paper",
									}}>
									{reviews.map((review) => (
										<>
											<ListItem alignItems='flex-start'>
												<ListItemAvatar>
													<Avatar alt='' src={review?.userPhoto} />
												</ListItemAvatar>
												<ListItemText
													primary={review?.userName}
													secondary={
														<React.Fragment>
															<Typography
																sx={{ display: "inline" }}
																component='span'
																variant='body2'
																color='text.primary'>
																{review?.rating}
																<StarIcon fontSize='5px' sx={{ mr: 1 }} />
															</Typography>
															{review?.review}
														</React.Fragment>
													}
												/>
											</ListItem>
											<Divider variant='inset' component='li' />
										</>
									))}
								</List>
							) : (
								<Typography
									gutterBottom
									variant='h6'
									component='div'
									sx={{ my: 2 }}>
									No Reviews
								</Typography>
							)}
						</Paper>
					</Grid>
					<Grid item md={3} xs={12}>
						<RecentBlogs />
					</Grid>
				</Grid>
			</Container>
			<Footer />
		</>
	);
};

export default SingleBlog;
