import React from "react";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import List from "@material-ui/core/List";
import { Link } from "react-router-dom";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import ListItemButton from "@mui/material/ListItemButton";
import { mainAppBarColor, mainAppBarTextColor } from "../Constants";
import logo from "../Images/logo.png";
import GroupIcon from "@mui/icons-material/Group";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import PermissionProvider from './PermissionProvider';
import { useMsal } from "@azure/msal-react";
import Cookies from 'universal-cookie';
import { ModuleName } from '../helpers/enum/Module_Enum';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { alertActions } from "../redux/actions";
import { history } from "../helpers/history";
import { store } from "../redux/store";
import { useSelector } from "react-redux";
import { authenticationService } from '../services/authentication.service';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width:1264,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },
  list: {
    width: 256,
  },
  fullList: {
    width: "auto",
  },
}));

const ManagerAppBar = (props) => {

  const classes = useStyles();


  const { instance } = useMsal();

  var [permissionDetails, setPermissionDetails] = useState([]);
  var [userClientsList, setUserClientsList] = useState([]);

  const [userLoggedIn, setUserLoggedIn] = useState({});
  const [currentClient, setCurrentClient] = useState('');
  const [drawer, setDrawer] = useState(false);
  const [dmmenuopen, setDMOpen] = useState(false);
  const [reportmenuopen, setReportOpen] = useState(false);
  const [cmsapimenuopen, setCmsApiOpen] = useState(false);
  const [hrmapimenuopen, setHrmApiOpen] = useState(false);
  const [hrmattendanceopen, setHrmattendanceopen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isProfileSwitched, setIsProfileSwitched] = useState(localStorage.getItem('IsProfileSwitched') ?? false);
  const open = Boolean(anchorEl);

  useEffect(() => {
    setDrawer(props.drawerOption);
  }, [props.drawerOption]);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawer(open);
  };
  // const [location, setLocation] = useState("Home");
  // useEffect(() => {
  //   setLocation(props.location);
  // }, props.location);

  // useEffect(() => {
  //   async function fetchData() {
  //     const cookies = new Cookies();
  //     const token = JSON.parse(localStorage.getItem('currentUser'))?.token;
  //     const objectId = JSON.parse(localStorage.getItem('currentUser'))?.account.localAccountId;
  //     const oid = cookies.get('oid');

  //     //setUserLoggedIn(JSON.parse(localStorage.getItem('currentUser')).account);

  //   }
  //   fetchData();
  // }, [isProfileSwitched]);


  const handleLogOut = () => {
    authenticationService.Logout();
  };

  const handleDMClick = () => {
    setDMOpen(!dmmenuopen);
  };

  const handleReportClick = () => {
    setReportOpen(!reportmenuopen);
  };

  const handleCmsApiClick = () => {
    setCmsApiOpen(!cmsapimenuopen);
  };

  const handleHrmApiClick = () => {
    setHrmApiOpen(!hrmapimenuopen);
  };


  const handleAttendanceClick = () => {
    setHrmattendanceopen(!hrmattendanceopen);
  };


  const handleNameClick = (event) => {
    if (userClientsList.length > 0)
      setAnchorEl(event.currentTarget);
  };
  const handleNameClose = (clientId) => {
    localStorage.setItem('IsProfileSwitched', true);
    setIsProfileSwitched(true);
    setAnchorEl(null);
    window.location.reload(false);
  };

  const handlePasswordChange = () => {
    window.location.replace(process.env.REACT_APP_Change_PASSWORD_LINK);
    return null;
  };

  // for alert actions

  const alert = useSelector(state => state.alert);
  useEffect(() => {
    history.listen((location, action) => {
      store.dispatch(alertActions.clear());
    });
  }, []);

  return (

    <div className={classes.root}>
      <Drawer open={drawer} onClose={toggleDrawer(false)} >
        <div
          className={classes.list}
          style={{
            display: "flex",

            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
            //alignItems: "space-between",
          }}
        >
          <List>
            <Link
              to="/Home"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <ListAltIcon color="#ff0000" />
                </ListItemIcon>
                <ListItemText
                  primary="Dashboard"
                  style={{ textDecoration: "none", color: "black" }}
                  classes={{ primary: classes.listItemText }}
                />
              </ListItemButton>
            </Link>
            <div>
              <ListItemButton onClick={handleHrmApiClick}>
                <ListItemIcon>
                  <GroupIcon style={{ color: "#ff0000" }} />
                </ListItemIcon>
                <ListItemText primary="HRM API" />
                {hrmapimenuopen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={hrmapimenuopen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {/* {
                    PermissionProvider({ permissionDetails: permissionDetails, moduleName: ModuleName.DMEService, permissionLevel: "Read" }) ? */}

                  <Link
                    to="/HRM/Employees"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText
                        primary="Employees"
                        classes={{ primary: classes.listItemText }}
                      />
                    </ListItemButton>
                  </Link>
                  
                </List>
              </Collapse>

              <ListItemButton onClick={handleAttendanceClick}>
                <ListItemIcon>
                  <GroupIcon style={{ color: "#ff0000" }} />
                </ListItemIcon>
                <ListItemText primary="Attendance" />
                {hrmattendanceopen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={hrmattendanceopen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {/* {
                    PermissionProvider({ permissionDetails: permissionDetails, moduleName: ModuleName.DMEService, permissionLevel: "Read" }) ? */}

                  <Link
                    to="/Attendance/clockIn"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText
                        primary="Clock In Clock Out"
                        classes={{ primary: classes.listItemText }}
                      />
                    </ListItemButton>
                  </Link>

                  <Link
                    to="/Attendance/AttendanceList"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText
                        primary="Attendance List"
                        classes={{ primary: classes.listItemText }}
                      />
                    </ListItemButton>
                  </Link>

                  <Link
                    to="/Attendance/CreateShift"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText
                        primary="Create shift"
                        classes={{ primary: classes.listItemText }}
                      />
                    </ListItemButton>
                  </Link>

                  <Link
                    to="/Attendance/ShiftDetails"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText
                        primary="Create shift's weeks details"
                        classes={{ primary: classes.listItemText }}
                      />
                    </ListItemButton>
                  </Link>
                 
                </List>
              </Collapse>


            </div>
          </List>
          <div onClick={handlePasswordChange}>
            <ListItem button>
              <ListItemIcon>
                <LogoutIcon color="primary" style={{ color: "#ff0000" }} />
              </ListItemIcon>
              <ListItemText
                primary="Change/Reset Password"
              />
            </ListItem>
          </div>
          <div onClick={handleLogOut}>
            <ListItem button>
              <ListItemIcon>
                <LogoutIcon color="primary" style={{ color: "#ff0000" }} />
              </ListItemIcon>
              <ListItemText
                primary="Sign Out"
              //classes={{ primary: classes.listItemText }}
              />
            </ListItem>
          </div>
        </div>
      </Drawer>
      <AppBar position="static" style={{ backgroundImage: mainAppBarColor }}>
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => setDrawer(true)}
          >
            <MenuIcon />
          </IconButton> */}
          <img
            src={logo}
            style={{
              width: "40px",
              height: "100%",
              objectFit: "contain",
              // paddingLeft: 50,
            }}
            alt="LOGO"
          />
          <div className={classes.title}>
            <h1
              style={{
                fontSize: 14,
                textDecoration: "none",
                color: mainAppBarTextColor,
              }}
            >
              HRMS PORTAL
            </h1>

            <Typography style={{ fontSize: 12, color: mainAppBarTextColor }}>
              {/* {location} */}
            </Typography>
          </div>
          {/* <Button color="inherit" onClick={handleNameClick} startIcon={<PersonIcon />}>
            <Typography
              variant="p"
              className={classes.title}
              style={{ fontSize: 12, color: mainAppBarTextColor }}
            >
              {userLoggedIn.name}
              <br />
              {currentClient}
            </Typography>
          </Button> */}
     
          <div class="User-info" startIcon={<PersonIcon />} onClick={handleNameClick} style={{ fontSize: 12, color: mainAppBarTextColor }}>
          <a ><i class="fa fa-user"></i>Hello</a>
          </div>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {
              userClientsList.map((item) => (

                <MenuItem onClick={() => handleNameClose(item.ClientId)}>{item.CompanyName}</MenuItem>
              ))
            }
          </Menu>
        </Toolbar>
      </AppBar>
      {alert.message &&
        <div className="container alert-container">
          <div className={`alert ${alert.type}`}>{alert.message}</div>
        </div>
      }
    </div>
  );
};

export default ManagerAppBar;
