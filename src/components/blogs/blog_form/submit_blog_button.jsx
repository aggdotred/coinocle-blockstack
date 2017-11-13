import React from 'react';
var Loader = require('react-loaders').Loader;

const SubmitBlogButton = ({ handleSubmit, actionType, isActive }) => {
  return isActive ? (
    <button id='blog-submit' className='wallet-save' onClick={handleSubmit}>
      Save
    </button>
  ) : (
    <button id='blog-submit' className='btn skinny inactive blog-submit-inactive'>
      <p><Loader className='center' type="ball-clip-rotate" active/></p>
    </button>
  )
};

export default SubmitBlogButton;
