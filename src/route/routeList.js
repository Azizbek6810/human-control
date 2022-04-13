import {Language} from "../Component/Language/Language";
import Profile from '../view/profile page/Profile'
import MyMap from "../view/ MyMap/MyMap";
import GroupIcon from '@mui/icons-material/Group';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import Users from "../view/users/Users";

const {
    updateProfile,
    Mymap,
    userS
} = Language

export const routeList = [
    {
        key: "1",
        to: '/',
        path: '/',
        component: MyMap,
        name: Mymap,
        icon: <ArrowCircleLeftOutlinedIcon/>,
        sideExist: true
    },
    {
        key: "2",
        to: '/profile-page',
        path: '/profile-page',
        component: Profile,
        name: updateProfile,
        icon: <GroupIcon/>,
        sideExist: false
    },
    {
        key: "3",
        to: '/users',
        path: '/users',
        component: Users,
        name: userS,
        icon: <GroupIcon/>,
        sideExist: true
    },
]