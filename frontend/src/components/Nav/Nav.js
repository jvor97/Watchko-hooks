import React from "react";
import { Link } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import logo from "./watchko-logo.png";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  nav: {
    //   background:
    //     "linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(17,17,20,1) 35%, rgba(64,64,64,0.9755252442773985) 94%, rgba(25,25,25,0.6561975131849616) 100%) !important"
    // },
    // background:
    //   "linear-gradient(180deg, rgba(0,0,0,1) 13%, rgba(17,17,20,1) 48%, rgba(40,36,8,1) 87%, rgba(52,48,9,0.9363095580028886) 98%, rgba(66,59,6,0.6141807064622724) 100%)",
    background:
      "linear-gradient(0deg, rgba(0,0,0,1) 13%, rgba(17,17,20,1) 59%, rgba(31,28,6,0.9895308465182948) 87%, rgba(52,48,9,0.9110994739692753) 98%, rgba(66,59,6,0.6141807064622724) 100%)"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: fade(theme.palette.common.white, 0.15),

    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch"
      }
    }
  },
  logo: {
    flexGrow: 1
  }
}));

export default function SearchAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.nav}>
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton> */}
          {/* <Typography className={classes.title} variant="h6" noWrap>
            Material-UI
          </Typography> */}
          <Link className={classes.logo} to="/">
            {/* <div className="logo"> */}
            <img src={logo} alt="watchko-logo" />
            {/* </div> */}
          </Link>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <TextField
              variant="standard"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              color="white"
            />
            {/* <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ "aria-label": "search" }}
              variant="standard"
            /> */}
          </div>
          <Typography variant="h6">Genres</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
