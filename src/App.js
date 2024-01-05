import logo from './logo.svg';
import './App.css';
import {Route,Routes}from"react-router-dom"
import LogIn from"./pages/login"
import SignUp from"./pages/signup"
import AllTodo from"./pages/alltodo"
import CreateTodo from "./pages/createtodo"
import Navbar from './components/Navbar';
import EditTodo from './pages/edittodo';
function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<CreateTodo></CreateTodo>}></Route>
        <Route path='/LogIn' element={<LogIn></LogIn>}></Route>
        <Route path='/SignUp' element={<SignUp></SignUp>}></Route>
        <Route path='/AllTodo' element={<AllTodo></AllTodo>}></Route>
        <Route path='/EditTodo/:id' element={<EditTodo></EditTodo>}></Route>
      </Routes>
    </div>
  );
}

export default App;
