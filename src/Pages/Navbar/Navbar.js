import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import useAuth from "../../context/useAuth";

const Navbar = () => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const { user, logOut } = useAuth();
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				style={{
					position: "absolute",
					zIndex: 999,
					background: "rgb(0 0 0 / 40%)",
					boxShadow: "none",
				}}>
				<Toolbar>
					<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
						Travel Blogs
					</Typography>

					{!user?.email ? (
						<Link
							to='/login'
							style={{ textDecoration: "none", color: "white" }}>
							<Button color='inherit'>Login</Button>
						</Link>
					) : (
						<IconButton onClick={handleClick} sx={{ pl: 1 }}>
							<Avatar
								alt=''
								sx={{ border: "2px solid white" }}
								src={user?.photoURL}
							/>
						</IconButton>
					)}
					<Menu
						id='basic-menu'
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						MenuListProps={{
							"aria-labelledby": "basic-button",
						}}
						sx={{
							"& .MuiMenuItem-root,.MuiMenuItem-root a": {
								color: "#02598b",
							},
						}}>
						<MenuItem onClick={handleClose}>
							<Link to='/' style={{ textDecoration: "none" }} className='color'>
								Home
							</Link>
						</MenuItem>
						<MenuItem onClick={handleClose}>
							<Link
								to='/dashboard'
								style={{ textDecoration: "none" }}
								className='color'>
								Dashboard
							</Link>
						</MenuItem>
						<MenuItem onClick={logOut} className='color'>
							LogOut
						</MenuItem>
					</Menu>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Navbar;
