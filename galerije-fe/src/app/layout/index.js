import React from 'react';
// import { Navbar } from 'react-bootstrap';
// import NavBar from "../layout"
import MainNavbar from './NavBarLayout';

export default function DefaultLayout({children}) {

  return (
    <div>
        <div><MainNavbar /></div>
        <div>{children}</div>
        {/* <footer> Hello there{user && user.first_name}</footer> */}
    </div>
  );
}