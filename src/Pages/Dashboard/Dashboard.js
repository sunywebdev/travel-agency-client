import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, Outlet } from "react-router-dom";
import Logout from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import useAuth from "../../context/useAuth";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import ReviewsIcon from "@mui/icons-material/Reviews";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import GroupIcon from "@mui/icons-material/Group";
import { Alert } from "@mui/material";
import CollectionsIcon from "@mui/icons-material/Collections";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";

const drawerWidth = 222;

function Dashboard(props) {
	const { logOut, admin, user } = useAuth();
	const { window } = props;
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};
	const drawer = (
		<div>
			<List>
				<Link
					style={{
						textDecoration: "none",
						fontWeight: "bold",
						fontSize: "15px",
					}}
					to=''>
					<ListItem button className='color'>
						<ListItemIcon sx={{ justifyContent: "center" }}>
							<ReviewsIcon className='color' />
						</ListItemIcon>
						<ListItemText primary={"My Reviews"} />
					</ListItem>
				</Link>

				<Link
					style={{
						textDecoration: "none",
						fontWeight: "bold",
						fontSize: "15px",
					}}
					to='addblog'>
					<ListItem button className='color'>
						<ListItemIcon sx={{ justifyContent: "center" }}>
							<BookmarkAddIcon className='color' />
						</ListItemIcon>
						<ListItemText primary={"Add New Blog"} />
					</ListItem>
				</Link>
				{admin && (
					<>
						<Link
							style={{
								textDecoration: "none",
								fontWeight: "bold",
								fontSize: "15px",
							}}
							to='allblogs'>
							<ListItem button className='color'>
								<ListItemIcon sx={{ justifyContent: "center" }}>
									<LocalLibraryIcon className='color' />
								</ListItemIcon>
								<ListItemText primary={"All Blogs"} />
							</ListItem>
						</Link>
						<Link
							style={{
								textDecoration: "none",
								fontWeight: "bold",
								fontSize: "15px",
							}}
							to='allreviews'>
							<ListItem button className='color'>
								<ListItemIcon sx={{ justifyContent: "center" }}>
									<ReviewsIcon className='color' />
								</ListItemIcon>
								<ListItemText primary={"All Reviews"} />
							</ListItem>
						</Link>

						<Link
							style={{
								textDecoration: "none",
								fontWeight: "bold",
								fontSize: "15px",
							}}
							to='slider'>
							<ListItem button className='color'>
								<ListItemIcon sx={{ justifyContent: "center" }}>
									<CollectionsIcon className='color' />
								</ListItemIcon>
								<ListItemText primary={"Slider"} />
							</ListItem>
						</Link>
						<Link
							style={{
								textDecoration: "none",
								fontWeight: "bold",
								fontSize: "15px",
							}}
							to='userRoles'>
							<ListItem button className='color'>
								<ListItemIcon sx={{ justifyContent: "center" }}>
									<VerifiedUserIcon className='color' />
								</ListItemIcon>
								<ListItemText primary={"Page Roles"} />
							</ListItem>
						</Link>
						<Link
							style={{
								textDecoration: "none",
								fontWeight: "bold",
								fontSize: "15px",
							}}
							to='allusers'>
							<ListItem button className='color'>
								<ListItemIcon sx={{ justifyContent: "center" }}>
									<GroupIcon className='color' />
								</ListItemIcon>
								<ListItemText primary={"All Users"} />
							</ListItem>
						</Link>
					</>
				)}

				<Link
					style={{
						textDecoration: "none",
						fontWeight: "bold",
						fontSize: "15px",
					}}
					to='/'>
					<ListItem button className='color'>
						<ListItemIcon sx={{ justifyContent: "center" }}>
							<HomeIcon className='color' />
						</ListItemIcon>
						<ListItemText primary={"Home"} />
					</ListItem>
				</Link>
				<ListItem onClick={logOut} button className='color'>
					<ListItemIcon sx={{ justifyContent: "center" }}>
						<Logout className='color' />
					</ListItemIcon>
					<ListItemText primary={"LogOut"} />
				</ListItem>
			</List>
		</div>
	);

	const container =
		window !== undefined ? () => window().document.body : undefined;

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar
				position='fixed'
				className='button'
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` },
				}}>
				<Toolbar>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						edge='start'
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: "none" } }}>
						<MenuIcon />
					</IconButton>
					<Typography variant='h6' noWrap component='div'>
						DASHBOARD
					</Typography>
				</Toolbar>
			</AppBar>
			<Box
				component='nav'
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
				aria-label='mailbox folders'>
				<Drawer
					container={container}
					variant='temporary'
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true,
					}}
					sx={{
						display: { xs: "block", sm: "none" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
							justifyContent: "center",
						},
					}}>
					{drawer}
				</Drawer>
				<Drawer
					variant='permanent'
					sx={{
						display: { xs: "none", sm: "block" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
							justifyContent: "center",
						},
					}}
					open>
					{drawer}
				</Drawer>
			</Box>
			<Box
				component='main'
				sx={{
					flexGrow: 1,
					p: 3,
					width: { sm: `calc(100% - ${drawerWidth}px)` },
				}}>
				<Toolbar />
				{user?.emailVerified === false && (
					<Alert severity='error' sx={{ my: 1 }}>
						Your Email Is Not Verified. Please Check Your Inbox And Follow The
						Steps
					</Alert>
				)}
				<Outlet></Outlet>
			</Box>
		</Box>
	);
}

Dashboard.propTypes = {
	window: PropTypes.func,
};

export default Dashboard;
