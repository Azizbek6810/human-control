import React from 'react';
import {
    Box,
    Button, Container, CssBaseline,
    Divider,
    IconButton,
    List, ListItemButton, ListItemIcon, ListItemText,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from "@mui/material";
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import {styled, useTheme} from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import {AccountCircle} from "@mui/icons-material";
import LanguageIcon from '@mui/icons-material/Language';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Ru from '../../images/ru.png'
import Uz from '../../images/uzb.png'
import Usa from '../../images/usa.png'
import {useDispatch, useSelector} from "react-redux";
import {updateLanguages} from "../../store/language/language";
import {Link, Redirect, Route, Switch, useHistory} from "react-router-dom";
import {routeList} from "../../route/routeList";
import TheLayout from "../TheLayout";

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));


const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

function Sidebar() {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorEll, setAnchorEll] = React.useState(null);
    const dispatch = useDispatch()
    const {lang} = useSelector(state => state.language)
    const history = useHistory()
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenu2 = (event) => {
        setAnchorEll(event.currentTarget);
    };

    const handleClose = (e) => {
        console.log(e.currentTarget.value, 'e')
        setAnchorEll(null);
        dispatch(updateLanguages(e.currentTarget.value))
    };

    const handleCloseUser = (e) => {
        console.log(e.target.value, 'user')
        setAnchorEl(null);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <div>
                <Box sx={{display: 'flex'}}>
                    <AppBar position="fixed" open={open}>
                        <Toolbar style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}>
                            <div style={{display: "flex", alignItems: "center"}}>
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={handleDrawerOpen}
                                    edge="start"
                                    sx={{
                                        marginRight: 5,
                                        ...(open && {display: 'none'}),
                                    }}
                                >
                                    <MenuIcon/>
                                </IconButton>
                                <Typography variant="h6" noWrap component="div">
                                    Map
                                </Typography>
                            </div>
                            <div style={{display: "flex", alignItems: "center"}}>
                                <IconButton
                                    size="small"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbara"
                                    aria-haspopup="true"
                                    onClick={handleMenu2}
                                    color="inherit"
                                >
                                    <LanguageIcon/>
                                </IconButton>
                                <Menu
                                    id="menu-appbara"
                                    anchorEl={anchorEll}
                                    keepMounted
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'center',
                                    }}
                                    open={Boolean(anchorEll)}
                                    onClose={handleClose}
                                    PaperProps={{
                                        style: {
                                            width: '7ch',
                                        },
                                    }}
                                >
                                    <MenuItem
                                        style={{
                                            paddingRight: "1vw",
                                            paddingLeft: "1vw",
                                            paddingBottom: "0.5vh",
                                            paddingTop: "0.5vh"
                                        }}
                                        value={'0'}
                                        onClick={handleClose}
                                        name={"uz"}
                                    >
                                        <img
                                            className={'imgFlag'}
                                            src={Uz}
                                            alt={"uz"}
                                        />
                                    </MenuItem>
                                    <MenuItem
                                        value={'1'}
                                        style={{
                                            paddingRight: "1vw",
                                            paddingLeft: "1vw",
                                            paddingBottom: "0.5vh",
                                            paddingTop: "0.5vh"
                                        }}
                                        onClick={handleClose}>
                                        <img
                                            className={'imgFlag'}
                                            src={Ru}
                                            alt={"ru"}
                                        />
                                    </MenuItem>
                                    <MenuItem
                                        value={'2'}
                                        style={{
                                            paddingRight: "1vw",
                                            paddingLeft: "1vw",
                                            paddingBottom: "0.5vh",
                                            paddingTop: "0.5vh"
                                        }}
                                        onClick={handleClose}>
                                        <img
                                            className={'imgFlag'}
                                            src={Usa}
                                            alt={"usa"}
                                        />
                                    </MenuItem>
                                </Menu>

                                <IconButton
                                    size="small"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle/>
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleCloseUser}
                                >
                                    <MenuItem value={"Profile"} onClick={(e) => {
                                        history.push('/profile-page')
                                    }}>Profile</MenuItem>
                                    <MenuItem value={"Logout"} onClick={(e) => {
                                        history.push('/login')
                                        setAnchorEl(null)
                                    }}>Log out</MenuItem>
                                </Menu>
                            </div>

                        </Toolbar>
                    </AppBar>
                    <Drawer variant="permanent" open={open}>
                        <DrawerHeader>
                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                            </IconButton>
                        </DrawerHeader>
                        <Divider/>
                        <List>
                            {routeList.map(item => {
                                if (item.sideExist) {
                                    return <Link to={item.to} className={'sidebarText'}>
                                        <ListItemButton
                                            key={item.key}
                                            sx={{
                                                minHeight: 48,
                                                justifyContent: open ? 'initial' : 'center',
                                                px: 2.5,
                                            }}

                                        >
                                            <ListItemIcon
                                                sx={{
                                                    minWidth: 0,
                                                    mr: open ? 3 : 'auto',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                {item.icon}
                                            </ListItemIcon>
                                            <ListItemText className={'sidebarText'} primary={item.name[lang]}
                                                          sx={{opacity: open ? 1 : 0}}/>
                                        </ListItemButton>
                                    </Link>
                                }
                            })}
                        </List>
                        <Divider/>
                    </Drawer>
                    <Box component="main" sx={{flexGrow: 1, p: 0}}>
                        <TheLayout/>
                    </Box>
                </Box>
            </div>
        </div>

    );
}

export default Sidebar;