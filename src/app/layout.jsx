

// import { Poppins } from "next/font/google";
// import "./globals.css";

// import Navbar from "@/components/layouts/Navbar";
// import Footer from "@/components/layouts/Footer";

// import AuthProvider from "@/provider/AuthProvider";
// import { CartProvider } from "@/context/CartContext";

// const poppins = Poppins({
//   weight: ["100", "200", "400", "500", "600", "800"],
//   subsets: ["latin"],
// });

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en" className={poppins.className}>
//       <body className="min-h-screen flex flex-col antialiased bg-gray-50">

//         {/* AUTH FIRST (safe user load) */}
//         <AuthProvider>

//           {/* CART INSIDE AUTH */}
//           <CartProvider>

//             {/* NAVBAR WRAPPER */}
//             <header className="w-full border-b bg-white shadow-sm">
//               <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2">
//                 <Navbar />
//               </div>
//             </header>

//             {/* MAIN CONTENT */}
//             <main className="flex-1 w-full">
//               <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8">
//                 {children}
//               </div>
//             </main>

//             {/* FOOTER */}
//             <footer className="w-full border-t bg-white mt-auto">
//               {/* <div className=" mx-auto px-3 sm:px-6 lg:px-8 py-6"> */}
//                 <Footer />
//               {/* </div> */}
//             </footer>

//           </CartProvider>

//         </AuthProvider>

//       </body>
//     </html>
//   );
// }


import { Poppins } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";

import AuthProvider from "@/provider/AuthProvider";
import { CartProvider } from "@/context/CartContext";

const poppins = Poppins({
  weight: ["100", "200", "400", "500", "600", "800"],
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.className}>
      <body className="min-h-screen flex flex-col antialiased bg-gray-50">

        <AuthProvider>
          <CartProvider>

            {/* NAVBAR — no border, no shadow here (Navbar handles it) */}
            <header className="w-full bg-white">
              <Navbar />
            </header>

            {/* MAIN CONTENT */}
            <main className="flex-1 w-full">
              <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8">
                {children}
              </div>
            </main>

            {/* FOOTER */}
            <footer className="w-full border-t bg-white mt-auto">
              <Footer />
            </footer>

          </CartProvider>
        </AuthProvider>

      </body>
    </html>
  );
}
