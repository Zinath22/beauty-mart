import Image from 'next/image';
import React from 'react';

const Banner = () => {
    return (
        <div className=' flex justify-between items-center '>
         
         <div className='flex-1 space-y-5'>
            <h2 className='text-4xl font-bold'>Purchase your best makeup combo</h2>
            <p className=''>Buy Every products with discount</p>
            <button className='btn btn-primary btn-outline'>Explore Products</button>
         </div>

         <div className='flex-1'>
            <Image alt="Buy Every products with discount" 
            src={"/assets/banner.png"}
            width={500}
            height={400}>


            </Image>
               
         </div>

        </div>
    );
};

export default Banner;