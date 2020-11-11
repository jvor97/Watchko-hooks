import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { fade, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import logo from "./watchko-logo.png";
import * as actionCreators from "../../store/actions/actions";
import { lightGrey } from "../../colors";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    position: "relative",
    zIndex: 999
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
    width: "7ch !important",
    transition: "width 1s",
    // [theme.breakpoints.up("sm")]: {
    //   marginLeft: theme.spacing(1),
    //   width: "auto"
    // },
    "&:focus-within": {
      width: "24ch !important"
    },
    "& input": {
      color: "white",
      paddingLeft: "22%"
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
  drawerPaper: {
    background: "black",
    color: `${lightGrey}`,
    width: "10rem",
    "& > ul > div": {
      paddingBottom: "0 !important"
    }
  },
  btn: {
    color: `${lightGrey}`
  }
}));

const Nav = ({ getGenres, genres, apiUrl, handleApiUrlChange }) => {
  const classes = useStyles();
  const [openGenres, setOpenGenres] = useState(false);

  const showGenres = () => {
    setOpenGenres(true);
    getGenres();
  };

  const displayMoviesByGenre = genre => {
    apiUrl.set("with_genres", genre);
    apiUrl.delete("page");
    handleApiUrlChange(apiUrl);
    setOpenGenres(false);
  };

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
          <div style={{ flexGrow: 1 }}>
            <Link to="/">
              <img src={logo} alt="watchko-logo" />
            </Link>
          </div>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <TextField variant="standard" />
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
          <Button className={classes.btn} onClick={showGenres}>
            Genres
          </Button>
          <Drawer
            anchor="right"
            open={openGenres}
            className={classes.genresDrawer}
            onClose={() => setOpenGenres(false)}
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <List>
              {genres &&
                genres.map(genre => (
                  <ListItem
                    key={genre.id}
                    button
                    onClick={() => displayMoviesByGenre(genre.id)}
                  >
                    <ListItemText primary={genre.name} />
                  </ListItem>
                ))}
            </List>
          </Drawer>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    genres: state.api.genres,
    apiUrl: state.api.apiUrl

    // logout: state.login.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getGenres: () => dispatch(actionCreators.loadGenres()),
    handleApiUrlChange: apiUrl => dispatch({ type: "UPDATE_APIURL", apiUrl })

    // toggleLogin: () => dispatch({ type: "TOGGLE_LOGIN" })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);
