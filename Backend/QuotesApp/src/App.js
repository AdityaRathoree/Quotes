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

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addquotes" element={<AddQuote />} />
          <Route path="/edit/:id" element={<EditQuote />} />
          <Route path="/myquotes" element={<MyQuotes />} />
          <Route path="/favquotes" element={<FavQuotes />} />

          {/* <Route path='/myblog/:id' element={<Myblogs/>} /> */}
        </Routes>
      </div>
      <ToastContainer />
    </Router>
  );
}

export default App;
