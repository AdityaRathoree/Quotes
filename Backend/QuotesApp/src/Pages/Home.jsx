// import "./Home.css";
import { useState, useEffect } from "react";
import { likeQuotes,getAllQuotes,getFavQuotesById,unlikeQuotes } from "../Services/axiosapi";
import { Button } from "@mui/material";
import { FavoriteRounded } from "@mui/icons-material";

function Home() {
  const [quotes, setQuotes] = useState([]);
  const [likesCnt, setLikesCnt] = useState();
  const [favquotes, setFavQuotes] = useState([]);
  const [onlyquotes, setOnlyQuotes] = useState([]);
  const [color, setColor] = useState([]);

  useEffect(() => {
    loadBlogs();
    loadLikesCount();
  } ,[]);

  useEffect(() => {
    setOnlyQuotes(favquotes.map(e=>e.quote_id))
  }, [favquotes]);

  useEffect(() => {
    const updatecolors = quotes.map(e=>{
          if(onlyquotes.includes(e.id)){
          return{id:e.id,
                 flag:true
                };
              }
          else{
            return {
            id:e.id,
            flag:false
            };
          }
      });
      setColor(updatecolors);
   
    },[onlyquotes,quotes]);

    useEffect(() => {
    }, [color]);
  


  const loadBlogs = async () => {
    let response = await getAllQuotes();
    setQuotes(response.data.data);
  };

  const loadLikesCount = async () => {
    const id = sessionStorage.getItem("id");
          let response = await getFavQuotesById(id);
        setFavQuotes(response.data.data);
  };

  const unlike = async (e) => {
    let response = await unlikeQuotes(e);
    console.log(response);
    loadBlogs();
    loadLikesCount();
  };

  const toggle = async (e)=>{
    console.log("TOGGLE CHECKING");
    console.log(e);
    await color.map(a=>{
      if ( a.id==e && a.flag == false ) {
        console.log("inside if false")
        like(e);
        a.flag=true;
      }
      else if(a.id==e && a.flag == true){
        console.log("INSIDE else if true")
        unlike(e);
        a.flag=false;
      }
    })    
    };
  

   // const loaduserlikes = async () => {
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
    loadLikesCount();
    // setQuotes(response.data);
    // }
  };

  return (
    <div style={{backgroundColor:"#F6F6F2"}}>
          <h1 style={{color:"white"}}>Quotes</h1>
<div style={{paddingBottom:"100px"}}>
      <div className="row flex flex-wrap justify-content-center" >
      {quotes.map((b,index) => (
      <div key={index} className="card" style={{"width": "22rem", backgroundColor:"#BADFE7", margin: "15px" }}>
  <ul className="card-body">
    <p className="card-text" style={{ paddingLeft:"5px",borderRadius:"5px ",backgroundColor:"#00DF9F" ,border:"2px solid #00DF9F", width:"230px",height:"30px", color:"#000000"}}>{b.category}</p>
    <p className="card-text" style={{color:"#388087",fontWeight:"bold"}}> {b.text}</p>
    <p className="card-text" style={{color:"#388087",fontFamily:"serif"}}><i>- By {b.author}</i></p>
  </ul>
  <ul className="footer" style={{backgroundColor:"#BADFE7", color:"#6F63AD" }}>
  <div>
  {onlyquotes.includes(b.id) ?
  (<Button variant='contained' startIcon={<FavoriteRounded/>}
                style={{
                  marginRight: "5px",
                  marginLeft:"-30px",
                  backgroundColor:"#DC143C",
                  border:"#DC143C",
                  width:45,
                  height:45,
                  borderRadius:'30%'
                }}
                value={b.id}
                className="btn btn-dark"
                onClick={(e) => {
                  // e.target.backgroundColor='grey'
                  // setColor('grey');
                  toggle(e.target.value)}}>
               {b.likescount}
              </Button>)

              :(<Button variant='contained' startIcon={<FavoriteRounded/>}
                style={{
                  marginRight: "5px",
                  marginLeft:"-30px",
                  backgroundColor:"#3CB371",
                  border:"#DC143C",
                  width:45,
                  height:45,
                  borderRadius:'30%',
                }}
                value={b.id}
                className="btn btn-dark"
                onClick={(e) => {
                  toggle(e.target.value)}}>
               {b.likescount}
              </Button>)}
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
