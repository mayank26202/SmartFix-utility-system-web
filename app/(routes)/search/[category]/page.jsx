"use client"
import BusinessList from '@/app/_components/BusinessList';
import GlobalApi from '@/app/_services/GlobalApi';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function BusinessByCategory() {

  const params = useParams();

    const [businessList,setBusinessList]=useState([]);
    useEffect(()=>{
        console.log(params);
        params&&getBusinessList()
    },[params]);

    const getBusinessList=()=>{
        GlobalApi.getBusinessByCategory(params.category)
        .then(resp=>{
            setBusinessList(resp?.businessLists);
        })
    }

  return (
    <div>
        <BusinessList title={params.category}
        businessList={businessList} />
    </div>
  )
}

export default BusinessByCategory