import axios from "axios";
import './alltodo.css'
import React, { useEffect} from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import { Avatar } from "@mui/material";
import { deepOrange } from '@mui/material/colors';
import { useNavigate } from "react-router-dom";
import { TodoData } from "../recoil/todo";
import { useRecoilState, useRecoilValue } from "recoil";
import { UserState } from "../recoil/user";
const AllTodo = () => {
  const navigate=useNavigate()
  const [Todo, setTodo] =useRecoilState(TodoData);
  const [User,setUser]=useRecoilState(UserState);
  const getTodo = async () => {
     if(localStorage.getItem("Token")!==null){
      const tododata = await axios.get(
        "https://todo-frontend-livid.vercel.app/api/v1/todo/getAllTodo",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      setTodo(tododata.data.todo);
     }else navigate("/LogIn")
  };
  const handeldelete=async(id)=>{
    const response = await axios.delete(`https://todo-frontend-livid.vercel.app/api/v1/todo/deleteTodo/${id}`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    })
    setTodo(Todo.filter((todo)=>todo._id!=id))
    alert(response.data.message)
    
  }
  const handeledit=(id)=>{
    navigate(`/EditTodo/${id}`)
  }
  useEffect(() =>{
    getTodo();
  },[])

  return (
    <div className="topdiv">
        { Todo?.map((todo) => (
          <div className="todobody" key={todo?.title}>
            <Avatar sx={{ bgcolor: deepOrange[500] }} className="avatar">{User?.split(" ")[0][0].toUpperCase()}{User?.split(" ")[1][0].toUpperCase()}</Avatar>
            <div className="todocontent">
              <div className="todotitle">{todo?.Title}</div>
              <div className="tododes">{todo?.Description}</div>
            </div>
            <Button variant="outlined" startIcon={<DeleteIcon />} onClick={()=>{handeldelete(todo?._id)}}>
              Delete
            </Button>
            <Button variant="outlined" startIcon={<EditIcon/>} onClick={()=>{handeledit(todo?._id)}}>
              Edit
            </Button>
          </div>
        ))}
    </div>
  );
};

export default AllTodo;
