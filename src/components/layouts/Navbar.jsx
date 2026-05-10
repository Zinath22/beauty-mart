

// "use client";

// import Link from "next/link";
// import { FiShoppingCart } from "react-icons/fi";
// import NavLink from "../buttons/NavLinks";
// import Logo from "./Logo";

// import { useAuth } from "@/provider/AuthProvider";

// // 🔥 ADD THIS
// import { useCart } from "@/context/CartContext";

// const Navbar = () => {
//   const { user, logout } = useAuth();

//   // 🔥 cart data
//   const { cart } = useCart();

//   const nav = (
//     <>
//       <li><NavLink href="/">Home</NavLink></li>
//       <li><NavLink href="/products">Products</NavLink></li>
//       <li><NavLink href="/blog">Blog</NavLink></li>
//       <li><NavLink href="/contact">Contact</NavLink></li>
//     </>
//   );

//   return (
//     <div className="navbar bg-base-100 shadow-md">

//       {/* LEFT */}
//       <div className="navbar-start">
//         <Logo />
//       </div>

//       {/* CENTER */}
//       <div className="navbar-center hidden lg:flex">
//         <ul className="menu menu-horizontal px-1">{nav}</ul>
//       </div>

//       {/* RIGHT */}
//       <div className="navbar-end space-x-3">

//         {/* 🔥 CART ICON WITH COUNT */}
//         <Link href="/cart" className="btn btn-primary relative">
//           <FiShoppingCart size={20} />

//           {/* 🔴 badge */}
//           {cart.length > 0 && (
//             <span className="badge badge-secondary absolute -top-2 -right-2">
//               {cart.length}
//             </span>
//           )}
//         </Link>

//         {/* AUTH */}
//         {user ? (
//           <>
//             <span className="text-sm hidden md:block">
//               {user.email}
//             </span>

//             <button
//               onClick={logout}
//               className="btn btn-error btn-outline"
//             >
//               Logout
//             </button>
//           </>
//         ) : (
//           <Link href="/login">
//             <button className="btn btn-primary btn-outline">
//               Login
//             </button>
//           </Link>
//         )}

//       </div>
//     </div>
//   );
// };

// export default Navbar;


"use client";

import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import NavLink from "../buttons/NavLinks";
import Logo from "./Logo";

import { useAuth } from "@/provider/AuthProvider";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  // console.log("ROLE CHECK:", user?.role);

  const cartCount = cart?.length || 0;

  const nav = (
    <>
      <li><NavLink href="/">Home</NavLink></li>
      <li><NavLink href="/products">Products</NavLink></li>
      <li><NavLink href="/blog">Blog</NavLink></li>
      <li><NavLink href="/contact">Contact</NavLink></li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md">

      {/* LEFT */}
      <div className="navbar-start">
        <Logo />
      </div>

      {/* CENTER */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {nav}
        </ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end space-x-3">

        {/* CART */}
        <Link href="/cart" className="btn btn-primary relative">
          <FiShoppingCart size={20} />

          {cartCount > 0 && (
            <span className="badge badge-secondary absolute -top-2 -right-2">
              {cartCount}
            </span>
          )}
        </Link>

        {/* AUTH SECTION */}
        {user ? (
          <div className="flex items-center gap-3">

            {/* EMAIL */}
            <span className="text-sm hidden md:block">
              {user.email}
            </span>

            {/* DASHBOARD */}
            <Link href="/dashboard">
              <button className="btn btn-outline btn-sm">
                Dashboard
              </button>
            </Link>

            {/* LOGOUT */}
            <button
              onClick={logout}
              className="btn btn-error btn-sm"
            >
              Logout
            </button>

          </div>
        ) : (
          <Link href="/login">
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