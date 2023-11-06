import { Link } from "react-router-dom";
// import "./Home.css";
import { getAllQuotes,likesCount } from "../Services/axiosapi";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import { likeQuotes } from "../Services/axiosapi";
import { Button } from "@mui/material";
import { Favorite, FavoriteBorderTwoTone, FavoriteRounded } from "@mui/icons-material";

function Home() {
  const [quotes, setQuotes] = useState([]);
  const [likesCnt, setLikesCnt] = useState();
  const Navigate = useNavigate();

  useEffect(() => {
    loadBlogs();
    // loadLikesCount();
  }, []);

  const loadBlogs = async () => {
    let response = await getAllQuotes();
    // if(response && response.status === 200){
    console.log(response.data.data);
    setQuotes(response.data.data);
    // }
  };

  // const loadLikesCount = async () => {
  //   let response = await likesCount();
  //   // if(response && response.status === 200){
  //   console.log(response.data);
  //   setLikesCnt(response.data);
  //   // }
  // };

  const like = async (e) => {
    let response = await likeQuotes(e);
    // if(response && response.status === 200){
    console.log(response);
    loadBlogs();
    // setQuotes(response.data);
    // }
  };

  return (
    <div style={{backgroundColor:"F6F6F2"}}>
          <h1 style={{color:"white"}}>Quotes</h1>
<div style={{paddingBottom:"100px"}}>
      <div className="row flex flex-wrap justify-content-center" >
      {quotes.map((b,index) => (
      <div key={index} className="card" style={{"width": "22rem", backgroundColor:"#BADFE7", margin: "15px" }}>
  <ul className="card-body">
    <p className="card-text" style={{color:"#388087"}}>Category</p>
    <p className="card-text" style={{color:"#388087"}}> <i>{b.text}</i></p>
    <p className="card-text" style={{color:"#388087"}}>- By {b.author}</p>
  </ul>
  <ul className="footer" style={{backgroundColor:"#BADFE7", color:"#6F63AD" }}>
  <div>
  <Button variant='contained' startIcon={<FavoriteRounded/>}
                style={{
                  marginRight: "5px",
                  marginLeft:"-30px",
                  backgroundColor:"#DC143C",
                  border:"#DC143C"
                }}
                value={b.id}
                className="btn btn-dark"
                onClick={(e) => {
                  // e.target.backgroundColor='grey'
                  // setColor('grey');
                  like(e.target.value)}}
              >
               {b.likescount}
              </Button>
              {/* <p className="nav d-flex ms-auto order-7" style={{position:"absolute", fontSize:"12px", marginRight:"40px", marginBottom:"10"}}>
  {new Date(b.createdDate).getDay()} days ago
  </p> */}
              </div>
  </ul>
  
</div>
   ))}
</div>
      </div>
    </div>
  );
}

export default Home;
