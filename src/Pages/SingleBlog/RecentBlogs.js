import * as React from "react";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
	Divider,
	Grid,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Rating,
} from "@mui/material";
import { Box } from "@mui/system";
import PropagateLoader from "react-spinners/PropagateLoader";

export default function RecentBlogs() {
	const [blogs, setBlogs] = React.useState([]);
	React.useEffect(() => {
		fetch(`https://pure-forest-30659.herokuapp.com/blogs`)
			.then((res) => res.json())
			.then((data) => setBlogs(data.reverse().slice(0, 6)));
	}, []);
	console.log(blogs);

	return (
		<div
			style={{
				position: "sticky",
				top: 0,
			}}>
			<Typography
				variant='h5'
				component='div'
				sx={{ mb: 2, fontWeight: "bold" }}>
				<span className='color'> RECENT </span>BLOGS
			</Typography>
			{blogs?.length ? (
				<List sx={{ width: "100%", bgcolor: "background.paper" }}>
					{blogs?.map((blog) => (
						<>
							{blog?.confirmation === "Approved" && (
								<>
									<ListItem alignItems='center' sx={{ p: 0 }}>
										<ListItemAvatar sx={{ mr: 1 }}>
											<CardMedia
												component='img'
												height='50'
												image={blog?.imageLink}
												alt=''
											/>
										</ListItemAvatar>
										<ListItemText
											className='color'
											primary={blog?.blogTitle}
											secondary={
												<React.Fragment>
													<Grid container>
														<Grid item xs>
															<Box
																sx={{
																	display: "flex",
																	alignItems: "center",
																}}>
																<Rating
																	className='color'
																	precision={0.1}
																	name='disabled'
																	value={blog?.rating || 0}
																	readOnly
																/>
																<Typography
																	variant='subtitle1'
																	sx={{ ml: 0.5 }}
																	color='text.secondary'>
																	{blog?.rating || 0} ({blog?.totalRating || 0})
																</Typography>
															</Box>
														</Grid>
													</Grid>
												</React.Fragment>
											}
										/>
									</ListItem>
									<Divider variant='inset' component='li' />
								</>
							)}
						</>
					))}
				</List>
			) : (
				<div className='loader'>
					<PropagateLoader size={10} />
				</div>
			)}
		</div>
	);
}
