import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import SwiperCore, { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "./Banner.css";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

SwiperCore.use([Pagination]);

const Banner = () => {
	const [data, setData] = React.useState([]);
	React.useEffect(() => {
		fetch(`https://pure-forest-30659.herokuapp.com/sliders`)
			.then((res) => res.json())
			.then((data) => setData(data.reverse()));
	}, []);
	return (
		<div className='header'>
			<Swiper
				grabCursor={true}
				loop={true}
				centeredSlides={true}
				pagination={true}
				className='mySwiper'>
				{data?.map((slider, i) => {
					return (
						<SwiperSlide key={i}>
							<Card
								sx={{
									width: "100%",
									height: { md: "100vh", sm: "80vh", xs: "70vh" },
									backgroundImage: `url(${slider?.imageLink2})`,
									backgroundSize: "cover",
									color: "white",
									"& .MuiCardContent-root": { padding: 0 },
								}}>
								<CardContent
									sx={{
										width: "100%",
										height: "100%",
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
									}}>
									<Box
										sx={{
											width: { md: "50vw", sm: "70vw", xs: "100vw" },
										}}>
										<Typography
											variant='h2'
											component='div'
											sx={{ textTransform: "uppercase", fontWeight: "bold" }}>
											{slider?.title}
										</Typography>
										<Typography variant='h6' component='div'>
											{slider?.subtitle}
										</Typography>
										<Button
											sx={{ mt: 2 }}
											variant='contained'
											className='button'>
											Read More <DoubleArrowIcon sx={{ mb: 0.5, ml: 1 }} />
										</Button>
									</Box>
								</CardContent>
							</Card>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</div>
	);
};

export default Banner;
