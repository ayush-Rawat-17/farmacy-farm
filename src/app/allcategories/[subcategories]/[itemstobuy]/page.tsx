

import FilterComponent from '@/components/filtercomponent/Filtercomponent'
import Headersectiontype2 from '@/components/headersectiontype2/Headersectiontype2'

import Productsidecomponent from '@/components/productsidecomponent/Productsidecomponent'


import React from 'react'

const subCategories = async() => {
  return (
    <div className=''>
        <Headersectiontype2 heading={"Vegetables"}/>
        <div className='flex flex-col md:flex-row justify-between items-start px-[3.5%] md:gap-6 py-[1.5%]'>
        <FilterComponent/>
        <Productsidecomponent/>
        
        </div>
        
       
        
    </div>
  )
}

export default subCategories