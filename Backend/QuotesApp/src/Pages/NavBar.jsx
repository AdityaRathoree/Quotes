import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {fetchImg } from "../Services/axiosapi";
import {useSelector } from 'react-redux'
import './NavBar.css';

function NavBar() {
  const Navigate = useNavigate();
  const[isLoggedIn,setIsLoggedIn] = useState(false);

useEffect(()=>{
  if(sessionStorage.getItem('token')){
    setIsLoggedIn(true);
  }
})

  const addQuote = () => {
    Navigate("/addquotes");
  };

  const myQuote = () => {
    const id = sessionStorage.getItem("id");
    Navigate(`/myquotes`);
  };

  const favQuote = () => {
    const id = sessionStorage.getItem("id");
    Navigate(`/favquotes`);
  };
  const logoutUser = () => {
    sessionStorage.removeItem("fname");
    sessionStorage.removeItem("lname");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("contactNo");
    sessionStorage.removeItem("createdDate");
    setIsLoggedIn(false);
    Navigate("/");
  };

  const [imageURL, setImageURL] = useState('');
  const tempURL = useSelector((state) => state.pic.status);

  const fetchProfileImage = async () => {
    const response = await fetchImg();
    const imageUrl = URL.createObjectURL(response.data);
    setImageURL(imageUrl);
};

useEffect(() => {
  fetchProfileImage();
},[]);

useEffect(() => {
  setImageURL(tempURL);
},[tempURL]);
  
  return (
    <>
      <div className="" style={{backgroundColor:"#388087"}}>
        <nav
          className="navbar navbar-expand-lg navbar-light"
         >
          <div className="container-fluid">
          <Link className="navbar-brand" style={{color:"F6F6F2"}} to="/home">
        QuoteVerse
      </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
            <button className="nav-link" onClick={addQuote} style={{ backgroundColor: "transparent",color:"#000000", border: "none" }} onMouseEnter={(e) => e.target.style.backgroundColor = "#C0C0C0"} onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}>Add Quotes</button>
          </li>
          <li className="nav-item">
            <button className="nav-link" onClick={myQuote} style={{ backgroundColor: "transparent",color:"#000000", border: "none" }} onMouseEnter={(e) => e.target.style.backgroundColor = "#C0C0C0"} onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}>My Quotes</button>
          </li>
          <li className="nav-item">
            <button className="nav-link" onClick={favQuote} style={{ backgroundColor: "transparent", color:"#000000",border: "none" }} onMouseEnter={(e) => e.target.style.backgroundColor = "#C0C0C0"} onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}>Favourite Quotes</button>
          </li>
              </ul>

              {isLoggedIn?
        <ul className="navbar-nav d-flex ms-auto order-5">
          <li className="nav-item">
          <Link className="nav-link">
          </Link>
          </li>
          <li className="nav-item">
          <Link className="nav-link" style={{ backgroundColor: "transparent", color:"#000000",border: "none" }} to='/profile'>
          <img
                  style={{width:"30px",height:"30px",borderRadius:"30px", marginRight:"5px" }}
                  src={imageURL}
                  alt="ProfilePic"/>
            Profile</Link>
          </li>
          <li className="nav-item">
          <button className="nav-link" style={{ backgroundColor: "transparent", color:"#000000",border: "none" }} onClick={()=>logoutUser()}>Logout</button>
          </li>
        </ul>:""
      }

              {/* <Dropdown >
      <Dropdown.Toggle  variant='primary' id="dropdown-basic" style={{maxWidth:200,width:150}}>
        Hello <AccountCircle/>
      </Dropdown.Toggle>
      <Dropdown.Menu container="body" style={{backgroundColor:'white',maxWidth:200,width:150}}>
        <Dropdown.Item  href="/profile">Profile</Dropdown.Item>
        <Dropdown.Item href="/" onClick={logoutUser}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown> */}

            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default NavBar;
