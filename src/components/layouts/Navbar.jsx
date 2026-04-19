// import React from 'react';

// // import Logo from "../Logo";
// import NavLink from '../buttons/NavLinks';
// import Link from 'next/link';
// import { FiShoppingCart } from "react-icons/fi";
// import Logo from './Logo';


// const Navbar = () => {
//     const nav=
//     <>
//     <li>
//         <NavLink href={"/"}>Home</NavLink>
//     </li>
//     <li>
//         <NavLink href={"/products"}>Products</NavLink>
//     </li>
//     <li>
//         <NavLink href={"/blog"}>Blog</NavLink>
//     </li>
              
//     <li>
//         <NavLink href={"/contact"}>contact</NavLink>
//     </li>
//     {/* <li>
//         <NavLink href={"/"}>Home</NavLink>
//     </li> */}

//     </>
//     return (
//         <div>
//           <div className="navbar bg-base-100 ">
//   <div className="navbar-start">
//     <div className="dropdown">
//       <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
//       </div>
//       <ul
//         tabIndex="-1"
//         className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">

//         {nav}
//       </ul>

//     </div>
   
    
//     <Logo></Logo>
    
//   </div>
//   <div className="navbar-center hidden lg:flex">
//     <ul className="menu menu-horizontal px-1">
//       {nav}
//     </ul>
//   </div>
//   <div className="navbar-end  space-x-4">

//     <Link href={"/cart"} className='btn btn-primary'>
//     <FiShoppingCart></FiShoppingCart>
//     </Link>
//     <Link href={"/login"}>
//     <button className='btn btn-primary btn-outline'>Login</button>
//     </Link>
     
//   </div>
// </div>
//         </div>
//     )
// }

// export default Navbar;



"use client";

import React from "react";
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import { useSession, signOut } from "next-auth/react";

import NavLink from "../buttons/NavLinks";
import Logo from "./Logo";

const Navbar = () => {
  const { data: session } = useSession();

  const nav = (
    <>
      <li>
        <NavLink href={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink href={"/products"}>Products</NavLink>
      </li>
      <li>
        <NavLink href={"/blog"}>Blog</NavLink>
      </li>
      <li>
        <NavLink href={"/contact"}>Contact</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md">

      {/* LEFT SIDE */}
      <div className="navbar-start">

        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            {nav}
          </ul>
        </div>

        <Logo />
      </div>

      {/* CENTER MENU */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{nav}</ul>
      </div>

      {/* RIGHT SIDE */}
      <div className="navbar-end space-x-3">

        {/* CART */}
        <Link href={"/cart"} className="btn btn-primary">
          <FiShoppingCart />
        </Link>

        {/* AUTH SECTION */}
        {session ? (
          <>
            <span className="text-sm hidden md:block">
              {session.user?.email}
            </span>

            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="btn btn-error btn-outline"
            >
              Logout
            </button>
          </>
        ) : (
          <Link href={"/login"}>
            <button className="btn btn-primary btn-outline">
              Login
            </button>
          </Link>
        )}

      </div>
    </div>
  );
};

export default Navbar;