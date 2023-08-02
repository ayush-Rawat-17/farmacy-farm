import React from 'react'
import brand1 from "../../images/brand-1.svg"
import brand2 from "../../images/brand-2.svg"
import brand3 from "../../images/brand-3.svg"
import brand4 from "../../images/brand-4.svg"
import brand5 from "../../images/brand-5.svg"
import Image from 'next/image'


const IMAGES=[{image:brand4},{image:brand2},{image:brand5},{image:brand3},{image:brand1}]


const LogosSection = async() => {
  return (
    <div className='  w-full'>
      {/* <div className='grid grid-cols-[1fr_1fr_1fr_1fr_1fr]  gap-5'> */}
      <div className='flex flex-wrap gap-x-[20px] gap-y-[40px] justify-around items-center py-[80px]   '>
        {
            IMAGES.map((item:any,idx:number)=>{
                return <div className='w-[180px]  '><Image src={item.image} height={1000} width={1000} alt=''/></div>
            })
        }
        </div>
    </div>

 
  )
}

export default LogosSection