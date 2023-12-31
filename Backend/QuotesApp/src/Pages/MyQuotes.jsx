import NavigationBar from "./NavigationBar";
import { useState,useEffect } from "react";
import { getQuotesById,delQuote } from "../Services/axiosapi";
import { Link, useNavigate } from 'react-router-dom'

function MyQuotes(){

    const [myquotes, setMyQuotes] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        loadMyQuotes(); 
        },[]);
        
        const loadMyQuotes = async () => {
            const id = sessionStorage.getItem("id");
          let response = await getQuotesById(id);
        setMyQuotes(response.data.data);
        }

        const edit = async (e) => {
            // let response = await likeQuotes(e);
          // if(response && response.status === 200){
          console.log("Like Quotes")
          navigate(`/edit/${e}`);
        //   console.log(response);
          // setQuotes(response.data);
          // }
          }

          const del = async (e) => {
            let response = await delQuote(e);
          // if(response && response.status === 200){
          console.log("Delete Quotes")
          console.log(response.data);
          navigate('/home');
          // setQuotes(response.data);
          // }
          }


    return (
        <>
{/* <NavigationBar/> */}
<div className="row flex flex-wrap justify-content-center" style={{margin:"100px"}}> 
 {myquotes.map((b,index)=>
<div key={index}className="card" style={{ width: "22rem", margin:"15px"}}>
  <div className="card-body">
    <h5 className="card-title">{b.id}</h5>
    <p className="card-text">{b.text}</p>
    <p className="card-text">{b.author}</p>
    <p className="card-text">{b.createdDate}</p>
    <button style={{position:"relative", marginTop:"5px",marginRight:"5px"}} value={b.id} className="btn btn-secondary" onClick={(e)=>edit(e.target.value)}>Edit</button>
    <button style={{position:"relative", marginTop:"5px",marginRight:"5px"}} value={b.id} className="btn btn-danger" onClick={(e)=>del(e.target.value)}>Delete</button>
  </div>
</div>)} 
 </div>
        </>
    )
}

export default MyQuotes;