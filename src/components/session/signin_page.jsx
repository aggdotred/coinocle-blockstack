import React from 'react';
import SignIn from './signin';
import logo from "../navbar/nav_menu/logoWhite.png";
// import Session from './session';

const SignInPage = () => (
  <section className='signin-bg full-screen flex-center flex-column position-relative'>
    <div className='dark-veil'></div>
    <img id='signin-guild-logo' alt='Coinocle Logo' className='z-index--10'
      src={logo}
    />
    
    <SignIn/>

    {/*
    <span id='session-question'>First time using Guild?</span>
    <Session isSignIn={false}/>

    <span id='session-question'>Already have a Guild account?</span>
    <Session isSignIn={true}/>
    */}
  </section>
);

export default SignInPage;
