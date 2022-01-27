import { Container, Grid } from "@mui/material";
import React from "react";
import Banner from "./Banner/Banner";
import Blogs from "./Blogs/Blogs";
import SideBar from "./SideBar/SideBar";

const HomePage = () => {
	return (
		<div>
			<Banner />
			<Container maxWidth={false}>
				<Grid container spacing={2} sx={{ my: 2 }}>
					<Grid item md={9} xs={12}>
						<Blogs />
					</Grid>
					<Grid item md={3} xs={12}>
						<SideBar />
					</Grid>
				</Grid>
			</Container>
		</div>
	);
};

export default HomePage;
