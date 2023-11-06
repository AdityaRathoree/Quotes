import React,{useState} from 'react';
// import './Register.css';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom'
import { registerApi } from '../Services/axiosapi';
import {MDBBtn,MDBContainer,MDBRow,MDBCol,MDBCard,MDBCardBody,MDBInput,MDBCheckbox,MDBIcon}from 'mdb-react-ui-kit';

function Register() {

    const[firstName,setFirstName]=useState('');
    const[lastName,setLastName]=useState('');
    const[contactNo,setContactNo]=useState('');
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[confirmpassword,setConfirmPassword]=useState('');

    const navigate = useNavigate();

    const registerUser = async () => {
        if (firstName.length == '') {
          toast.error('Please enter firstName');
        } else if (lastName.length == '') {
          toast.error('Please enter lastName');
        }else if (contactNo.length == '') {
            toast.error('Please enter contactNo');
          }else if (email.length == '') {
            toast.error('Please enter email');
          }else if (password.length == '') {
            toast.error('Please enter password');
          }else if (confirmpassword.length == '') {
            toast.error('Please enter password');
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
    <MDBContainer fluid className='p-4'>
      <MDBRow>
        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

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

        <MDBCol md='6'>

          <MDBCard className='my-5'>
            <MDBCardBody className='p-5'>

              <MDBRow>
                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-4' label='First name' id='form1' type='text'
                  onChange={(e)=>{setFirstName(e.target.value)}}
                  />
                </MDBCol>

                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-4' label='Last name' id='form1' type='text'
                  onChange={(e)=>{setLastName(e.target.value)}}/>
                </MDBCol>
              </MDBRow>
              <MDBInput wrapperClass='mb-4' label='Your Contact Number' id='form1' type='number'
              onChange={(e)=>{setContactNo(e.target.value)}}/>
              <MDBInput wrapperClass='mb-4' label='Your Email' id='form1' type='email'
              onChange={(e)=>{setEmail(e.target.value)}}/>
              <MDBInput wrapperClass='mb-4' label='Choose a Password' id='form1' type='password'
              onChange={(e)=>{setPassword(e.target.value)}}/>
              <MDBInput wrapperClass='mb-4' label='Confirm Password' id='form1' type='password'
              onChange={(e)=>{setConfirmPassword(e.target.value)}}/>

              <MDBBtn className='w-100 mb-4' size='md' onClick={()=>registerUser()}>Create your account</MDBBtn>

              <div className="text-center">

              </div>

            </MDBCardBody>
          </MDBCard>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default Register;