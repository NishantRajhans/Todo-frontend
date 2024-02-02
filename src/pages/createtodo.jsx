import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TodoData } from "../recoil/todo";
import { useSetRecoilState } from "recoil";
import toast, { Toaster } from 'react-hot-toast';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Todo List
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function CreteTodo() {
  const navigate=useNavigate()
  const setTodo=useSetRecoilState(TodoData)
  const handleSubmit = async(event) => {
    event.preventDefault();
    if(!localStorage.getItem("Token")){
      navigate("/LogIn")
    }else{
      const data = new FormData(event.currentTarget);
    const Tododata=await axios.post("https://todo-backend-sa39.onrender.com/api/v1/todo/createTodo",{
      Title: data.get('title'),
      Description: data.get('description'),
    },{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    }
  )
  console.log(Tododata.data.data)
  setTodo((todo)=>[...todo,Tododata.data.data])
    toast.success(Tododata.data.message)
    }
  };
  return (
    <>
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <NoteAddIcon/>
          </Avatar>
          <Typography component="h1" variant="h5" fontWeight="bold">
            Create Todo
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoComplete="titile"
              autoFocus
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
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Todo
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    </>
  );
}