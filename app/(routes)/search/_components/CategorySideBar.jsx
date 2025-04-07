"use client"
import GlobalApi from '@/app/_services/GlobalApi';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function CategorySideBar() {

  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const params = usePathname();
  params.split('/')[2];
  useEffect(() => {

    getCategoryList();
  }, [])

  useEffect(() => {
    params && setSelectedCategory(params.split('/')[2])
  }, [params])

  /**
   * Used to get All Category List
   */
  const getCategoryList = () => {
    GlobalApi.getCategory().then(resp => {
      console.log(resp)
      setCategoryList(resp.categories);
    })
  }

  return (
    <div>
      <h2 className='font-bold mb-3 text-lg text-primary'>Categories</h2>
      <div>
        {categoryList.map((category, index) => (
          <Link href={'/search/' + category.name}
            key={index} className={`flex gap-3 p-3 border-b-3 
              ${selectedCategory == category.name ? 'border-[#087cfb]' : 'border-gray-200'} 
              my-4 rounded-lg mb-3 cursor-pointer hover:scale-105 
              hover:bg-[#e2eefc] hover:shadow-md hover:text-[#087cfb] 
              hover:border-[#087cfb] transition-all 
              ease-in-out md:mr-10 items-center 
              ${selectedCategory == category.name && 'text-[#087cfb] shadow-md bg-[#e2eefc]'}
                 `}>
            <Image src={category.icon?.[0]?.url} alt='icon' height={30} width={30} />
            <h2>{category.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CategorySideBar