import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import { CardMedia, Grid, Rating } from "@mui/material";
import { Box } from "@mui/system";

export default function SideBar() {
	const [blogs, setBlogs] = React.useState([]);
	React.useEffect(() => {
		fetch(`https://pure-forest-30659.herokuapp.com/blogs`)
			.then((res) => res.json())
			.then((data) => setBlogs(data));
	}, []);

	const [SortData, setSortData] = React.useState([]);
	React.useEffect(() => {
		const short = blogs?.sort(
			(a, b) => parseFloat(a?.totalRating) - parseFloat(b?.totalRating),
		);
		setSortData(short.reverse().slice(0, 5));
	}, [blogs?.blogID, blogs]);

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
				TOP-RATED BLOGS
			</Typography>
			<List sx={{ width: "100%", bgcolor: "background.paper" }}>
				{SortData?.map((blog) => (
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
				))}
			</List>
		</div>
	);
}
