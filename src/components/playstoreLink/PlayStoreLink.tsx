"use client"
import React from 'react';
import phoneImg from "../../images/App.svg";
import Image from "next/image";
import appStoreImg from "../../images/image 13.svg"
import playStoreImg from "../../images/image 14.svg"
import useMediaQuery from '@mui/material/useMediaQuery';

const PlayStoreLink = () => {
  const matches = useMediaQuery('(max-width:1150px)');
  return (
    <div className={`bg-playstore-image bg-cover bg-no-repeat px-[3.5%] relative  ${matches?"sm:py-[60px]":"py-[120px]"} sm:py-[120px] py-[40px]  `}>
      <div className={`flex w-full  gap-[100px] items-center relative ${matches?"justify-center":"justify-between"} `}>
        <div className=''>
          <div className='text-[#588f27] font-bold md:text-4xl text-2xl'>Shop Bulk Organic From</div>
          <div className='text-[#51150a] font-bold md:text-4xl text-2xl sm:my-[10px] my-[5px]'>FARMACY FARM FRESH</div>
          <div className='text-[#588f27] font-bold md:text-4xl text-2xl sm:mb-[25px] mb-[10px]'>Android & IOS App</div>
          <div className='text-md font-bold md:mb-[60px] mb-[20px]'>Available on both IOS & Android</div>
          <div className='flex items-center sm:flex-row flex-col sm:gap-0 gap-3'>
            <div className='sm:w-[205px] w-[158px]'><Image
              src={appStoreImg}
              alt=''
              width={1000}
              height={1000}
              style={{
                maxWidth: "100%",
                height: "auto"
              }} /></div>
            <div className='sm:w-[240px] w-[180px]'><Image
              src={playStoreImg}
              alt=''
              width={1000}
              height={1000}
              style={{
                maxWidth: "100%",
                height: "auto"
              }} /></div>
          </div>
        </div>
        {!matches&&
        <div className='w-[600px]  absolute bottom-[-200px] translate-y-[-10px] right-0 '>
          <div className=''>
            <Image
              src={phoneImg}
              alt=''
              width={1000}
              height={1000}
              className=' '
              style={{
                maxWidth: "100%",
                height: "auto"
              }} />
          </div>
        </div>
}
      </div>
    </div>
  );
}

export default PlayStoreLink;





