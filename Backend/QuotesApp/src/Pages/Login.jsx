import React from 'react';
import {MDBBtn,MDBContainer,MDBCard,MDBCardBody,MDBCardImage,MDBRow,MDBCol,MDBIcon,MDBInput} from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import { useState } from 'react'
import { loginApi } from '../Services/axiosapi';
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material';
import { LoginOutlined, LoginSharp, LoginTwoTone } from '@mui/icons-material';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  const navigate = useNavigate();
 
  const loginUser = async () => {
    if (email.length == '') {
      toast.error('Please enter email', {className: 'custom-progress-bar'});
    } else if (password.length == '') {
      toast.error('Please enter password');
    } else {
      const response = await loginApi(email, password)
      console.log("Login Response");
      console.log(response.data);
      if (response.data.status == "success") {
        const fname = response.data.data.firstName;
        const lname = response.data.data.lastName;
        sessionStorage['fname'] = response.data.data.firstName;
        sessionStorage['lname'] = response.data.data.lastName;
        sessionStorage['email'] = response.data.data.email;
        sessionStorage['id'] = response.data.data.id;
        sessionStorage['token'] = response.data.data.token;
        toast.success(`Welcome,${fname+' '}${lname} to QuoteVerse`)
        navigate('/home');
      } else {
        toast.error('Invalid user name or password')
      }
    }
  }

  return (
    <MDBContainer className="my-5" style={{width:800}} >

      <MDBCard >
        <MDBRow className='g-0'>

          <MDBCol md='5 w-50'>
            <MDBCardImage src='http://localhost:3000/assets/login.jpg' alt="login form" style={{height:"100%"}} className='rounded-start w-100'/>
          </MDBCol>

          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>

              <div className='d-flex flex-row mt-2'>
                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>
                <span className="h1 fw-bold mb-0">QuoteVerse</span>
              </div>

              <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>

                <MDBInput  onChange={(e) => {
                  setEmail(e.target.value)}} wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg"/>
                <MDBInput  onChange={(e) => {
                  setPassword(e.target.value)}} wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg"/>

              <Button onClick={loginUser} variant='contained' color='success' endIcon={<LoginOutlined/>}>Login </Button>
              {/* <a className="small text-muted" href="#!">Forgot password?</a> */}
              <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Don't have an account? <Link to="/Register" style={{color: '#393f81'}}>Register here</Link></p>

              <div className='d-flex flex-row justify-content-start'>
                <a href="#!" className="small text-muted me-1">Terms of use.</a>
                <a href="#!" className="small text-muted">Privacy policy</a>
              </div>

            </MDBCardBody>
          </MDBCol>

        </MDBRow>
      </MDBCard>

    </MDBContainer>
  );
}

export default Login;