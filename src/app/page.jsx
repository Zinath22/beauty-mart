// import Banner from "@/components/home/Banner";
// import Products from "@/components/home/Products";
// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="space-y-20">
     
//      {/* <button className="btn btn-primary">Test</button> */}
//      <section>

//       <Banner></Banner>

//      </section>

//  <section>
//              <Products></Products>
//  </section>
//     </div>
//   );
// }

import Products from "@/components/home/Products";

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Products</h1>
      <Products />
    </div>
  );
}
