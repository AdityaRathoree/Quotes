// import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import MyQuotes from "./Pages/MyQuotes";
import FavQuotes from "./Pages/FavQuotes";
import AddQuote from "./Pages/AddQuote";
import EditQuote from "./Pages/EditQuote";
import Profile from "./Pages/Profile";
import ProtectedRoutes from "./ProtectedRoutes";
import NavBar from "./Pages/NavBar";
import './App.css'

function App() {
  
  return (
    // <Router>
    <>
      {/* <NavigationBar/> */}
      <NavBar/>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<ProtectedRoutes Component={Home}/>} />
          <Route path="/addquotes" element = {<ProtectedRoutes Component={AddQuote}/>} />
          <Route path="/edit/:id" element={<ProtectedRoutes Component={EditQuote}/>} />
          <Route path="/myquotes" element={<ProtectedRoutes Component={MyQuotes}/>} />
          <Route path="/favquotes" element={<ProtectedRoutes Component={FavQuotes}/>} />
          <Route path="/profile" element={<ProtectedRoutes Component={Profile}/>} />
          <Route path="/" element={<Login />} />
        </Routes>
      
      <ToastContainer 
      toastContainerClassName="toast-container-center"/>
      </>
    // </Router>
  );
}

export default App;
