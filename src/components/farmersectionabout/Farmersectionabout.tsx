import React from 'react'
import { TiLocation } from 'react-icons/ti';
import farmerlogoimage from "../../images/logobackground.svg"
import Image from 'next/image'
import ImageB from "../../images/farmerlist2.svg";
import overlay from "../../images/overlay.svg";
const DUMMY_DATA={fermerlistImage: ImageB, heading: "ACACIA Organic Farm", categories: "Vegetables, Fruits, Nuts, Flowers, Grains, Spices etc...", location: "Devanahalli, Karnataka", para1:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",para2:"  There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."}

const Farmersectionabout = () => {
  return (
    <div className='  px-[3.5%] py-[3.5%] '>
    <div className='flex  justify-center gap-[60px] items-center '>
    <div className=''>
    
        <div className='relative w-[575px]'><Image src={farmerlogoimage} alt='' className='' width={1000} height={1000}/>
        <div className='absolute top-0 left-0  '><Image src={overlay} alt=''  width={1000} height={1000}/></div>
        <div className="absolute w-[100%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-between gap-[1rem]  rounded-3xl   ">
      <div className="bg-white w-[12rem] h-[12rem]  aspect-[1/1]  flex items-center justify-center rounded-xl">
        <Image src={DUMMY_DATA.fermerlistImage} alt=''  />
      </div>

      
        <h2 className="  text-xl font-bold text-[white] my-[.75rem]">{DUMMY_DATA.heading}</h2>
        <div className='flex gap-1 items-center'>
        <TiLocation className="h-6 w- text-[#9ac96b] " ></TiLocation>
        <p className="font-medium text-[#9ac96b] text-sm ">{DUMMY_DATA.location}</p>
        </div>
        <p className="text-sm text-[white] text-center ">{DUMMY_DATA.categories}</p>
        
        
     
    </div>
    </div>
        
    </div>
    <div className='flex flex-col gap-[2rem] '>
        <div className='font-bold text-3xl '>About Us</div>
        <div className=' text-base font-medium  leading-8'>{DUMMY_DATA.para1}</div>
        <div className=' text-base font-medium  leading-8'>{DUMMY_DATA.para2}</div>
    </div>
    </div>
</div>
       
  )
}

export default Farmersectionabout