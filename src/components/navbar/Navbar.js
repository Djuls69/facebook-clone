import React from 'react'
import { ReactComponent as FacebookLogo } from '../../assets/icons/Icon-facebook.svg'
import './navbar.css'

const Navbar = () => {
  return (
    <nav className='navbar'>
      <FacebookLogo className='navbar__logo' />
    </nav>
  )
}

export default Navbar
