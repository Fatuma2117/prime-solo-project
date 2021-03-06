import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
// MUI----------------------------------------------------
// import './Nav.css';
import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
// import CollectionsBookmarkIcon from '@material-ui/icons';
import { CssBaseline } from "@material-ui/core";
import { AppBar } from "@material-ui/core";
import { Toolbar, Button } from "@material-ui/core";
import Stack from "@mui/material/Stack";



import { Container } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { createTheme, ThemeProvider } from "@material-ui/core";
import Themes from "../Nav/navStyles";
import { makeStyles } from "@material-ui/core/styles";

function Nav() {
  const user = useSelector((store) => store.user);
  const history = useHistory();

  // const theme = createTheme({
  //   typography: {
  //     fontFamily: ["Train One", "cursive"].join(","),
    
  //   },
  // });

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      justifyContent: "space-between",
      flexGrow: 1,
      alignItems: "center",
      marginRight:'500px'
    },
    appbar: {
      backgroundColor: "#FF6E40",
      justifyContent: "space-between",
      flexGrow: 1,
      


    },
    appbarWrapper: {
      width: "60%",
      height: "100vh",
      margin: "0 auto",
    },
 
  }));

  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <AppBar    className={classes.appbar} elevation={0}>
        <Container maxWidth="xl">
          <Toolbar  style={{ alignItems: "center"}}>
            {/* <Stack className={classes.fontFamily} direction="row" spacing={2}> */}
              <Typography className={classes.fontFamily}>
                <Typography style={{ marginRight: 16 }}>
                  <div className={classes.fontFamily}>
                    {/* <img src="images/book-stack.jpg"/> */}
                    <span>
               
                      <Button className={classes.appbarTitle}>
                        Book Buddy - Reading Tracker
                      </Button>
                    </span>

                    <div className={classes.root}>
                      {/* If no user is logged in, show these links */}
                      {!user.id && (
                        // If there's no user, show login/registration links
                        <Link className="navLink" to="/login">
                          Login / Register
                        </Link>
                      )}

                      {/* If a user is logged in, show these links */}
                      {user.id && (
                        <>
                          <Button
                            onClick={() => history.push("/")}
                            style={{ color: "#c6ff00" }}
                          >
                            Home
                          </Button>

                          <Button
                            onClick={() => history.push("/About")}
                            style={{ color: "#c6ff00" }}
                          >
                            About
                          </Button>

                          <Button
                            onClick={() => history.push("/KidList")}
                            style={{ color: "#c6ff00" }}
                          >
                            Profiles
                          </Button>
                          <Button
                            // theme={theme}
                            onClick={() => history.push("/BookList")}
                            style={{ color: "#c6ff00" }}
                          >
                            Books
                          </Button>
                          <Button
                            onClick={() => history.push("/BookForm")}
                            style={{ color: "#c6ff00" }}
                          >
                            Add New Book
                          </Button>

                          <Button
                            onClick={() => history.push("/BookLog")}
                            style={{ color: "#c6ff00" }}
                          >
                            Reading Log
                          </Button>

                       
                        </>
                      )}
                      <LogOutButton />
                    </div>
   




                  </div>
                </Typography>
              </Typography>
            {/* </Stack> */}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default Nav;
