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

import Banner from "@/components/home/Banner";
import Products from "@/components/home/Products";
import { getProducts } from "@/actions/server/product";

const Home = async () => {
  // 🔥 LOAD PRODUCTS
  const products = await getProducts();

  return (
    <div className="space-y-20">

      {/* BANNER */}
      <section>
        <Banner products={products} />
      </section>

      {/* PRODUCTS */}
      <section>
        <Products products={products} />
      </section>

    </div>
  );
};

export default Home;