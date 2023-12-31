import React,{useState} from 'react';
// import './Register.css';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import { registerApi } from '../Services/axiosapi';
import {MDBContainer,MDBRow,MDBCol,MDBCard,MDBCardBody,MDBInput}from 'mdb-react-ui-kit';
import { Button } from '@mui/material';

function Register() {

    const[firstName,setFirstName]=useState('');
    const[lastName,setLastName]=useState('');
    const[contactNo,setContactNo]=useState('');
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[confirmpassword,setConfirmPassword]=useState('');
    const navigate = useNavigate();

    const registerUser = async () => {
        if (firstName.length === '') {
          toast.error('Please enter firstName');
        } else if (lastName.length === '') {
          toast.error('Please enter lastName');
        }else if (contactNo.length === '') {
            toast.error('Please enter contactNo');
          }  else if (!/^\d+$/.test(contactNo)) {
            toast.error('Mobile number must contain numbers only');
          }else if (contactNo.length !== 10) {
            toast.error('contact number must be exactly 10 digits');
          } else if (email.length === '') {
            toast.error('Please enter email');
          }else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            toast.error('Please enter a valid email');
          }else if (password.length === '') {
            toast.error('Please enter password');
          } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(password) || password.length <= 7) {
            toast.error('Please Enter Valid Password');
          }else if (confirmpassword.length === '') {
            toast.error('Please enter password');
          } else if (password !== confirmpassword) {
            toast.error('Password does not match')
          } else {
          const response = await registerApi(email,firstName,lastName,contactNo,password)
          console.log(response);
          console.log(response.data.data.affectedRows);
          if (response.data.data.affectedRows>= 1) {
            toast.success(`User Registered Successfully`)
            navigate('/');
          } else {
            toast.error('User not registered')
          }
        }
      }
    

  return (
    <div style={{marginTop:-20,marginLeft:40,width:1000}}>
    <MDBContainer className='p-4'>
      <MDBRow>
        <MDBCol md='6' className='text-center text-md-start d-flex flex-column'>

          <h1 className="my-5 display-3 fw-bold ls-tight px-3">
            Let's get started <br />
            <span className="text-primary">with your first Quotes</span>
          </h1>

          <p className='px-3' style={{color: 'hsl(217, 10%, 50.8%)'}}>
          Welcome to QuoteVerse, your digital haven for thought-provoking wisdom and 
          inspiration. Our platform is dedicated to curating a universe of profound 
          insights, motivational musings, and life's remarkable experiences. Dive into 
          an array of themes, from philosophical ponderings to soulful reflections, and 
          accompany us on an odyssey of enlightenment and empowerment.
          </p>

        </MDBCol>
     
        <MDBCol md='6' style={{height:800}}>

          <MDBCard className='my-5' >
            <MDBCardBody className='p-5'>

              <MDBRow>
                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-4' placeholder='First name' id='form1' type='text'
                  onChange={(e)=>{setFirstName(e.target.value)}}
                  />
                </MDBCol> <div/>

                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-4' placeholder='Last name' id='form1' type='text'
                  onChange={(e)=>{setLastName(e.target.value)}}/>
                </MDBCol>
              </MDBRow>
              <MDBInput wrapperClass='mb-4' placeholder='Your Contact Number' id='form1' type='text' minLength={10} maxLength={10}
              onChange={(e)=>{setContactNo(e.target.value)}}/>
              <MDBInput wrapperClass='mb-4' placeholder='Your Email' id='form1' type='email'
              onChange={(e)=>{setEmail(e.target.value)}}/>
              <h6 style={{fontSize:"10px"}}>*The password must be at least 7 characters long and include a lowercase letter, an uppercase letter, a number, and a special character.</h6>
              <MDBInput wrapperClass='mb-4' placeholder='Choose a Password' id='form1' type='password'
              onChange={(e)=>{setPassword(e.target.value)}}/>
              
              <MDBInput wrapperClass='mb-4' placeholder='Confirm Password' id='form1' type='password'
              onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
              <Button onClick={registerUser} variant='contained' color='primary' endIcon={<AppRegistrationIcon/>}>Create your account</Button>
              {/* <MDBBtn className='w-100 mb-4' size='md' onClick={()=>registerUser()}>Create your account</MDBBtn> */}

              <div className="text-center">

              </div>

            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      
      </MDBRow>

    </MDBContainer>
    </div>
  );
}

export default Register;