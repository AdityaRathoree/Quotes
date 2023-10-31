import NavigationBar from "./NavigationBar";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFavQuotesById,unlikeQuotes } from "../Services/axiosapi";

function FavQuotes(){

    const [favquotes, setFavQuotes] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        loadFavQuotes(); 
        },[]);
        
        const loadFavQuotes = async () => {
            const id = sessionStorage.getItem("id");
          let response = await getFavQuotesById(id);
        // if(response && response.status === 200){
        console.log(response.data);
        setFavQuotes(response.data);
        // }
        }

        const unlike = async (e) => {
          console.log("e:"+e);
          let response = await unlikeQuotes(e);
          // if(response && response.status === 200){
          console.log(response);
          navigate('/home');
          // setQuotes(response.data);
          // }
        };


    return (
        <>
<NavigationBar/>
<div className="row flex flex-wrap justify-content-center" style={{margin:"100px"}}> 
<h1>Favourite Quotes</h1>
 {favquotes.map(b=>
<div key={b.id} className="card" style={{ width: "22rem", margin:"15px"}}>
  <div className="card-body">
    <h5 className="card-title">{b.id}</h5>
    <p className="card-text">{b.text}</p>
    <p className="card-text">{b.author}</p>
    <p className="card-text">{b.createdDate}</p>
    <button style={{position:"relative", marginTop:"5px",marginRight:"5px"}} value={b.quote_id} className="btn btn-danger" onClick={(e)=>unlike(e.target.value)}>Unlike</button>
  </div>
</div>)} 
 </div>
        </>
    )
}

export default FavQuotes;