import React from 'react';
import logo from '../../assets/images/logo.png'
import { Link } from 'react-router-dom';

function Logo() {
  return (
    <Link to={'/'} className='flex items-center gap-x-2 hover:opacity-80 my-transition'>
        <img src={logo} alt="logo icon" className={'w-8'} />
        <h1 className={'text-xl font-semibold text-space-cadet'}>Blogify</h1>
    </Link>
  )
}

export default Logo