

// import { Poppins } from "next/font/google";
// import "./globals.css";

// import Navbar from "@/components/layouts/Navbar";
// import Footer from "@/components/layouts/Footer";
// import AuthProvider from "@/provider/AuthProvider";

// const poppins = Poppins({
//   weight: ["100", "200", "400", "500", "600", "800"],
//   subsets: ["latin"],
// });

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en" className={poppins.className}>
//       <body className="min-h-screen flex flex-col antialiased">

//         <AuthProvider>

//           <header className="py-2 md:w-11/12 mx-auto">
//             <Navbar />
//           </header>

//           <main className="flex-1 py-2 md:w-11/12 mx-auto">
//             {children}
//           </main>

//           <Footer />

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
      <body className="min-h-screen flex flex-col antialiased">

        {/* ✅ FIRST CART PROVIDER */}
        <CartProvider>

          {/* ✅ THEN AUTH PROVIDER */}
          <AuthProvider>

            {/* HEADER */}
            <header className="py-2 md:w-11/12 mx-auto">
              <Navbar />
            </header>

            {/* MAIN */}
            <main className="flex-1 py-2 md:w-11/12 mx-auto">
              {children}
            </main>

            {/* FOOTER */}
            <Footer />

          </AuthProvider>

        </CartProvider>

      </body>
    </html>
  );
}