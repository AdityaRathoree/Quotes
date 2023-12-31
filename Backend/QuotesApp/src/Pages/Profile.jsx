import { useEffect, useState } from "react";
import { uploadImg,fetchImg,editUser, getUserById,checkPasswordApi,changePasswordApi } from "../Services/axiosapi";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { picUpload } from "../features/profilePicSlice";

function Profile(){

const [displaySection,setDisplaySection] = useState("profile");
const dispatch = useDispatch();
const showProfile = displaySection==="profile";
const changePassword = displaySection==="changePassword";
const editProfile = displaySection==="editProfile";
const editProfileImg = displaySection==="editProfileImg";

const handleSectionClick =(section)=>{
    setDisplaySection(section);
}

const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [date, setDate] = useState("");


  const [Fname, setFname] = useState("");
  const [Lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");

  const [exuser, setExUser] = useState([]);

  const loadUser = async () => {
    let response = await getUserById();
    // console.log(response.data.data[0].firstName);
    setExUser(response.data.data[0]);
    const fnametemp = response.data.data[0].firstName
    const lnametemp = response.data.data[0].lastName;
    const emailtemp = response.data.data[0].email;
    const contactNotemp = response.data.data[0].contactNo
    setFname(fnametemp);
    setLname(lnametemp);
    setEmail(emailtemp);
    setContactNo(contactNotemp);
  };

  const handleEditUser = async () => {
    let response = await editUser(Fname,Lname,email,contactNo);
    console.log(response);
    if (response.data.data.affectedRows >= 1) {
      toast.success(`User Edited Succesfully!!!`)
      navigate('/home');
    } else {
      toast.error('Invalid entry')
    }
}

// useEffect(() => {
//     console.log("USE EFFECT");
//     console.log(exuser);
//   }, [exuser]);

  useEffect(() => {
    loadUser();
  }, []);

  const updatePass=async()=>{
    const email = sessionStorage.getItem('email');
    const response = await checkPasswordApi(email, currentPassword)
    console.log("CHECK RESPONSE");
    console.log(response);
    if (response.data.status === "success") {
        if(newPassword.length ===''){
            console.log("Please enter password");
            toast.error('Please enter password');
        }else if(!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(newPassword) || newPassword.length <= 7){
            console.log("Please enter valid password");
            toast.error('Please enter valid password');
        }else if(confirmPassword===''){
            console.log("Please enter confirm password");
            toast.error('Please enter confirm password');
        }else if (newPassword !== confirmPassword) {
            console.log("Password does not match");
            toast.error('Password does not match')
        }else {
            console.log("else");
            const resp = await changePasswordApi(newPassword);
            console.log(resp);
            if(resp.affectedRows===1){
                console.log("Password Changed Successfully");
                toast.success(`Password Changed Successfully`)
                // navigate('/home');
            }else{
                console.log("ERROR");
                toast.error("ERROR");
            }
        } 
    } else {
        console.log("Invalid Password");
      toast.error('Invalid Password')
    }    
  }
// -----------------------------------------------------------------------------------
  const [userId, setUserId] = useState(''); // Set the user ID here
  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const navigate = useNavigate();
  const handleUpload = async () => {
    const response = await uploadImg(file);
    fetchProfileImage();
    toast.success("Profile Pic updated Successfully!!");
    handleSectionClick("profile");
    navigate('/home');
  };    

  const fetchProfileImage = async() => {
    const resp = await fetchImg();
    const imageUrl = URL.createObjectURL(resp.data);
    setImageURL(imageUrl);
    dispatch(picUpload({ url: imageUrl}));
};

  useEffect(() => {
    fetchProfileImage();
  },[]);

// -----------------------------------------------------------------------------------
  useEffect(()=>{
    const temp = sessionStorage.getItem("createdDate"); 
    setDate(temp.slice(0,10))
  },[])

    return(
        <>
        <div style={{marginLeft:"50px",marginTop:"20px", borderRadius:"10px", height:"400px", width:"1000px",border:"2px solid black", display:"flex"}}>
            <div style={{height:"398px", width:"200px", margin:"20px"}}>
               <button onClick={()=>handleSectionClick("profile")} style={{margin:"5px",width:"200px",border:""}}>Profile</button>
               <button onClick={()=>handleSectionClick("editProfile")} style={{margin:"5px",width:"200px",border:""}}>Edit Profile</button>
               <button onClick={()=>handleSectionClick("changePassword")} style={{margin:"5px",width:"200px",border:""}}>Change Password</button>
               <button onClick={()=>handleSectionClick("editProfileImg")} style={{margin:"5px",width:"200px",border:""}}>Change Profile Pic</button>           
            </div>
            <div style={{height:"400px",marginRight:"5px", width:"700px", borderRadius:"10px",border:""}}>
            {showProfile && (<div style={{display:"flex", margin:"20px"}}> 
                <div style={{marginRight:"50px"}}><img
                  width="210"
                  height="210"
                  src={imageURL}
                  alt="userimage"
                  style={{width:"210px",height:"210px",borderRadius:"210px"}}/></div>
                <div>
                <h2> First Name : <i style={{color:"#388087"}}>{exuser.firstName}</i> </h2>
                <h2> Last Name : <i style={{color:"#388087"}}>{exuser.lastName}</i> </h2>
                <h2> Email : <i style={{color:"#388087"}}>{exuser.email}</i> </h2>
                <h2> Mobile No : <i style={{color:"#388087"}}>{exuser.contactNo}</i> </h2>
                <h2> Created on : <i style={{color:"#388087"}}>{date}</i></h2>
                </div>
                </div>)}
{/* ----------------------------------------------------------------------------- */}
            {changePassword && (<div
              id="passwordCard"
              className="col-12 d-flex justify-content"
              style={{ margin: "30px" }}
            >
              <div className="form">
                <form>
                  <div className="mb-3">
                    <label htmlFor="currentPassword">Current Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className="mb-3">
                      <button type="submit" className="btn btn-success"
                      onClick={() => updatePass()}>
                        Change Password
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>)}
{/* ----------------------------------------------------------------------------- */}
            {editProfile && (<div
              id="updateCard"
              style={{ margin: "20px" }}
              className="col-12 d-flex justify-content">
              <div>
                <div className="col"></div>
                <div className="col">
                  <div className="form">
                    <div className="mb-3">
                      <label htmlFor="">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={Fname}
                        onChange={(e) => {
                            setFname(e.target.value)
                        }}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="">Last Name</label>
                      <input
                        type="text"
                        value={Lname}
                        className="form-control"
                        onChange={(e) => {
                            setLname(e.target.value)
                        }}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="">Email</label>
                      <input
                        type="text"
                        value={email}
                        className="form-control"
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="">Mobile Number</label>
                      <input
                        type="tel"
                        value={contactNo}
                        className="form-control"
                        onChange={(e) => {
                            setContactNo(e.target.value)
                        }}
                      />
                    </div>

                    <div className="mb-3">
                      <button 
                      onClick={handleEditUser}
                      className="btn btn-success">Update</button>
                    </div>
                  </div>
                </div>
                <div className="col"></div>
              </div>
            </div>)}
{/* ----------------------------------------------------------------------------- */}
            {editProfileImg && (
                <div style={{margin:"20px"}}>
                <label>
                  Select Image:
                  <input type="file" onChange={handleFileChange} />
                </label>
                <br />
                <button className="btn btn-dark" onClick={handleUpload}>Upload Image</button>
              </div>
            )}

            </div>
        </div>        
        
        </>
    )
};

export default Profile;