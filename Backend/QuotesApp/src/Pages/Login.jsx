import React from 'react';
import {MDBBtn,MDBContainer,MDBCard,MDBCardBody,MDBCardImage,MDBRow,MDBCol,MDBIcon,MDBInput} from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import { useState } from 'react'
import { loginApi } from '../Services/axiosapi';
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  const navigate = useNavigate();
 
  const loginUser = async () => {
    if (email.length == '') {
      toast.error('Please enter email');
    } else if (password.length == '') {
      toast.error('Please enter password');
    } else {
      const response = await loginApi(email, password)
console.log(response.data[0].id);
      if (response.data[0].id >= 1) {
        const fname = response.data[0].firstName;
        const lname = response.data[0].lastName;
        sessionStorage['fname'] = response.data[0].firstName;
        sessionStorage['lname'] = response.data[0].lastName;
        sessionStorage['email'] = response.data[0].email;
        sessionStorage['id'] = response.data[0].id;
        toast.success(`Welcome,${fname+' '}${lname} to QuoteVerse`)
        navigate('/home');
      } else {
        toast.error('Invalid user name or password')
      }
    }
  }

  return (
    <MDBContainer className="my-5">

      <MDBCard>
        <MDBRow className='g-0'>

          <MDBCol md='6'>
            <MDBCardImage src='https://c1.wallpaperflare.com/preview/652/531/737/wood-aerial-background-beverage.jpg' alt="login form" style={{height:"100%"}} className='rounded-start w-100'/>
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

              <MDBBtn onClick={loginUser} className="mb-4 px-5" color='dark' size='lg'>Login</MDBBtn>
              <a className="small text-muted" href="#!">Forgot password?</a>
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