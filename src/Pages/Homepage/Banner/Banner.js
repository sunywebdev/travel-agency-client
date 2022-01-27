import { Button, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import SwiperCore, { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "./Banner.css";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

SwiperCore.use([Pagination]);

const slide_img = [
	"http://para.llel.us/themes/goexplore/demo/wp-content/uploads/sites/2/Benagil_Cave_Algarve-1620x1080.jpg",
	"https://wanderland.qodeinteractive.com/wp-content/uploads/2019/10/blog-post-img-08.jpg",
	"https://wanderland.qodeinteractive.com/wp-content/uploads/2019/10/blog-post-img-55.jpg",
	"https://wanderland.qodeinteractive.com/wp-content/uploads/2019/10/blog-post-38.jpg",
	"https://wanderland.qodeinteractive.com/wp-content/uploads/2019/10/blog-post-img-32.jpg",
];

const Banner = () => {
	return (
		<div>
			<Swiper
				grabCursor={true}
				loop={true}
				centeredSlides={true}
				pagination={true}
				className='mySwiper'>
				{slide_img.map((img, i) => {
					return (
						<SwiperSlide key={i}>
							<Card
								sx={{
									width: "100%",
									height: { md: "90vh", sm: "70vh", xs: "60vh" },
									backgroundImage: `url(${img})`,
									backgroundSize: "cover",
									display: "flex",
									justifyContent: { md: "flex-end", xs: "center" },
									alignItems: "center",
									color: "white",
									textAlign: "left",
								}}>
								<CardContent
									sx={{ width: { md: "50vw", sm: "70vw", xs: "100vw" } }}>
									<Typography variant='h2' component='div'>
										Algrave, Portugal
									</Typography>
									<Typography variant='h6' component='div'>
										The Algarve, Portugal’s southernmost region, is known for
										its Atlantic beaches and golf resorts. Whitewashed fishing
										villages on low cliffs overlooking sandy coves were
										transformed in the 1960s, and now its central coast between
										Lagos and Faro is lined with villas, hotels, bars and
										restaurants.
									</Typography>
									<Button sx={{ mt: 2 }} variant='contained'>
										Read More <DoubleArrowIcon sx={{ mb: 0.5, ml: 1 }} />
									</Button>
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
