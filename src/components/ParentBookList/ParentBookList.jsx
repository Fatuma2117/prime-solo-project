// Parent book list page that has a drop down of names of children.
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { Container } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { Card, CardMedia, CardContent, CardActions } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core";

function ParentBookList() {
  useEffect(() => {
    dispatch({
      type: "FETCH_PARENT",
    });
  }, []);
  const history = useHistory();

  const dispatch = useDispatch();
  const parentBooks = useSelector((store) => store.parentBooks);
  console.log("parentBooks----------------->", parentBooks);
  const books = useSelector((store) => store.books);



  return (
    <div>
      <Box mt={23} textAlign="center" alignContent='center'>

     
      <h1>Parent Book List</h1>
    
      <Container  style={{ marginTop: "100px" }}>
        <Grid container spacing={4}>
          <Grid
            item
            // style={{
            //   backgroundColor: "#ffff00",
            // }}
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '70vh' , backgroundColor: "#ffff00"}}
          >
            <Card   >
              {/* {parentBooks.map((book) => {
          // console.log('parent loop book',book)
          return (
           
              
                <Typography
                  sx={{ fontSize: 22 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Name: {book.name}---- Book: {book.title} -- Current Page:
                  {book.current_page}
                </Typography>
           
          );
        })} */}

              {books.map((book) => {
                // console.log('books map*********************************',book)
                return (
                  <Box>
                    <>
                      {" "}
                      Name: {book.name}--- Title: {book.title} - Author:{" "}
                      {book.author} - Current Page: {book.current_page}
                    </>
                  </Box>
                );
              })}

              <Typography>
                <Button
                  size="large"
                  variant="contained"
                  color={"primary"}
                  onClick={() => history.push("/BookForm")}
                >
                  ADD NEW BOOK
                </Button>
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>

      </Box>
    </div>

  );
}

export default ParentBookList;
