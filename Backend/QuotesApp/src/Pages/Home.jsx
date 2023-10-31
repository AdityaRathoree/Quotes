import { Link } from "react-router-dom";
// import "./Home.css";
import { getAllQuotes } from "../Services/axiosapi";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import { likeQuotes } from "../Services/axiosapi";

function Home() {
  const [quotes, setQuotes] = useState([]);
  // const [color, setColor] = useState('blue');
  const Navigate = useNavigate();

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    let response = await getAllQuotes();
    // if(response && response.status === 200){
    console.log(response.data);
    setQuotes(response.data);
    // }
  };

  const like = async (e) => {
    let response = await likeQuotes(e);
    // if(response && response.status === 200){
    console.log(response);
    // setQuotes(response.data);
    // }
  };

  return (
    <div style={{ backgroundColor:"#F5F5F5"}}>
      <NavigationBar />
      <div
        className="row flex flex-wrap justify-content-center"
        style={{ margin: "100px"}}>
          <h1 style={{color:"#FF6347"}}>Quotes Dashboard</h1>
        {quotes.map((b) => (
          <div key={b.id} className="card" style={{ backgroundColor:"#20B2AA",width: "22rem", margin: "15px" }}>
            <div className="card-body">
              {/* <h5 className="card-title">{b.id}</h5> */}
              {/* <h4 className="card-text">Quote : </h4> */}
              <h3 className="card-text" style={{color:"#FFD700"}}>
                <i>{b.text}</i>
              </h3>
              <h6 className="card-text">
                <i>- By {b.author}</i>
              </h6>
              <p className="card-text" style={{color:"#2F4F4F", fontSize: "small" }}>
                created at : {new Date(b.createdDate).toLocaleDateString()}
              </p>
              <button
                style={{
                  position: "relative",
                  marginTop: "5px",
                  marginRight: "5px",
                  backgroundColor:"#1E90FF",
                  border:"#1E90FF"
                }}
                value={b.id}
                className="btn btn-dark"
                onClick={(e) => {
                  // e.target.backgroundColor='grey'
                  // setColor('grey');
                  like(e.target.value)}}
              >
                Like
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
