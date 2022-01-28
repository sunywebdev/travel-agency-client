import {
	Container,
	Divider,
	Grid,
	List,
	ListItemButton,
	ListItemText,
	Typography,
} from "@mui/material";
import React from "react";

const Footer = () => {
	return (
		<>
			<Divider />
			<Container sx={{ pt: 3 }}>
				<Grid container spacing={2}>
					<Grid item md={6} xs={12} sx={{ textAlign: "left" }}>
						<Typography
							variant='h6'
							gutterBottom
							component='div'
							className='color'
							sx={{ fontWeight: "bold" }}>
							About This Site
						</Typography>
						<Typography variant='subtitle' gutterBottom component='div'>
							What makes a great travel blog? Well, it’s going to be subjective.
							Everyone will have their own opinions. And that’s ok. <br />{" "}
							<br />
							What makes a great travel blog? Well, it’s going to be subjective.
							Everyone will have their own opinions. And that’s ok.
							<br /> <br />
							So in no particular order, below you’ll find my favorite travel
							blogs for 2022. Follow them if you’d like to escape from reality
							for a while during your work break — and maybe get inspired for
							your next trip in the process!
							<br /> <br />
						</Typography>
					</Grid>

					<Grid item md={3} xs={6} sx={{ textAlign: "left" }}>
						<Typography
							variant='h6'
							gutterBottom
							component='div'
							className='color'
							sx={{ pl: 2, fontWeight: "bold" }}>
							Develop
						</Typography>
						<List>
							<ListItemButton>
								<ListItemText primary='Developer Center' />
							</ListItemButton>
							<ListItemButton>
								<ListItemText primary='API Documentation' />
							</ListItemButton>
							<ListItemButton>
								<ListItemText primary='Bulk Data Dumps' />
							</ListItemButton>
						</List>
					</Grid>
					<Grid item md={3} xs={6} sx={{ textAlign: "left" }}>
						<Typography
							variant='h6'
							gutterBottom
							component='div'
							className='color'
							sx={{ pl: 2, fontWeight: "bold" }}>
							Discover
						</Typography>
						<List>
							<ListItemButton>
								<ListItemText primary='Home' />
							</ListItemButton>
							<ListItemButton>
								<ListItemText primary='Blogs' />
							</ListItemButton>
							<ListItemButton>
								<ListItemText primary='Authors' />
							</ListItemButton>
						</List>
					</Grid>
				</Grid>
			</Container>
			<Divider />
			<Typography
				variant='subtitle'
				gutterBottom
				component='div'
				className='color'
				sx={{ textAlign: "center", py: 2 }}>
				&copy; 2022 All Rights Reserved
			</Typography>
		</>
	);
};

export default Footer;
