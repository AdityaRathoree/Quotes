// import { Link,useNavigate } from "react-router-dom";

// function NavigationBar(){

//     const Navigate = useNavigate();

//     const addQuote=()=>{
//         Navigate("/addquotes");
//       }

//     const myQuote=()=>{
//         const id = sessionStorage.getItem("id");
//         Navigate(`/myquotes`);
//       }
      
//       const favQuote=()=>{
//         const id = sessionStorage.getItem("id");
//         Navigate(`/favquotes`);
//       }  
     
    
//       const logoutUser = () => {
//         sessionStorage.removeItem("fname");
//         sessionStorage.removeItem("lname");
//         sessionStorage.removeItem("email");
//         sessionStorage.removeItem("id");
//         Navigate("/");
//       };

//     return(
//         <>
//         <div>
//  <nav className="navbar fixed-top navbar-expand-lg navbar-light " style={{backgroundColor:"#e3f2fd",paddingLeft:"12px"}}>
//   <Link className="navbar-brand" to='/home'>QuoteVerse</Link>
//   <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
//     <span className="navbar-toggler-icon"></span>
//   </button>
//   <div className="collapse navbar-collapse" id="navbarNavDropdown">
//     <ul className="navbar-nav">
//       <li className="nav-item active">
//         <button className="nav-link" onClick={addQuote} >Add Quotes</button>
//       </li>
//       <li className="nav-item">
//         <button className="nav-link" onClick={myQuote}>My Quotes</button>
//       </li>
//       <li className="nav-item">
//         <button className="nav-link" onClick={favQuote}>Favourite Quotes</button>
//       </li>
//     </ul>

//     <div className="navbar-nav d-flex ms-auto order-5"> 

//                 {/* {fname+' '+lname}&nbsp; */}
//                 {/* <img
//                   width="30"
//                   height="30"
//                   src="https://ik.imagekit.io/major/images/usernameimg.png?updatedAt=1692701128252"
//                   alt="userimage"
//                 /> */}

//                 <button
//                   class="dropdown-item"
//                   type="button"
//                   // onClick={gotoprofile}
//                 >
//                   Profile
//                 </button>

//                 <button
//                   class="dropdown-item"
//                   type="button"
//                   onClick={logoutUser}
//                 >
//                   Log out
//                 </button>
//           </div>
//   </div>
// </nav>
// </div>
//         </>
//     );
// }

// export default NavigationBar;


import { Link, useNavigate } from "react-router-dom";

function NavigationBar() {
  const Navigate = useNavigate();

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
    Navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light-color" style={{ backgroundColor: "#116466" }}>
      <Link className="navbar-brand" to="/home" style={{color:"white"}}>
        QuoteVerse
      </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-between" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item">
            <button className="nav-link" onClick={addQuote} style={{ backgroundColor: "transparent",color:"white", border: "none" }} onMouseEnter={(e) => e.target.style.backgroundColor = "#C0C0C0"} onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}>Add Quotes</button>
          </li>
          <li className="nav-item">
            <button className="nav-link" onClick={myQuote} style={{ backgroundColor: "transparent",color:"white", border: "none" }} onMouseEnter={(e) => e.target.style.backgroundColor = "#C0C0C0"} onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}>My Quotes</button>
          </li>
          <li className="nav-item">
            <button className="nav-link" onClick={favQuote} style={{ backgroundColor: "transparent", color:"white",border: "none" }} onMouseEnter={(e) => e.target.style.backgroundColor = "#C0C0C0"} onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}>Favourite Quotes</button>
          </li>
        </ul>
        <div className="navbar-nav">
          <button className="nav-item nav-link" onClick={logoutUser} style={{ backgroundColor: "transparent",color:"white", border: "none" }} onMouseEnter={(e) => e.target.style.backgroundColor = "#C0C0C0"} onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}>Log out</button>
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;
