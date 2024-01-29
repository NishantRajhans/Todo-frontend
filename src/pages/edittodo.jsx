import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {TodoData} from "../recoil/todo"
import { useRecoilState } from "recoil";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Todo List
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function EditTodo() {
  const navigate = useNavigate();
  const location = useLocation();
  const Todo=useRecoilState(TodoData);
  const id = location.pathname.split('/')[2];
  const currentTodo = Todo[0].find(todo => todo._id === id);
  const defaultTitle = currentTodo ? currentTodo.Title : '';
  const defaultDescription = currentTodo ? currentTodo.Description : '';
  console.log(defaultTitle, defaultDescription)
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const Tododata = await axios.put(
      `https://todo-backend-sa39.onrender.com/api/v1/todo/updateTodo/${id}`,
      {
        Title: data.get("title"),
        Description: data.get("description"),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }
    );
    alert(Tododata.data.message);
    navigate("/AllTodo");
  };
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <NoteAddIcon />
            </Avatar>
            <Typography component="h1" variant="h5" fontWeight="bold">
              Edit Todo
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                autoComplete="titile"
                autoFocus
                defaultValue={defaultTitle}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="description"
                label="Description"
                type="description"
                id="description"
                autoComplete="description"
                defaultValue={defaultDescription}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Edit Todo
              </Button>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </>
  );
}
