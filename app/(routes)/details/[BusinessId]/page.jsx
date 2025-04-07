"use client"
import GlobalApi from '@/app/_services/GlobalApi';
import { signIn, useSession } from 'next-auth/react'
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import BusinessInfo from '../_components/BusinessInfo';
import BusinessDescription from '../_components/BusinessDescription';
import SuggestedBusinessList from '../_components/SuggestedBusinessList';

function BusinessDetail() {

    const params = useParams();

    const {data,status}=useSession();
    const [business,setBusiness]=useState([]);
    
    useEffect(()=>{
      params&&getbusinessById();
    },[params]);

    useEffect(()=>{
      checkUserAuth();
    },[]);

    const getbusinessById=()=>{
      GlobalApi.getBussinesById(params.BusinessId).then(resp=>{
        setBusiness(resp.businessList);
      })
    }

    const checkUserAuth=()=>{
      if(status=='loading')
      {
          return <p>Loading...</p>
      }
  
      if(status=='unauthenticated')
      {
          signIn('descope');
      }
  
    }
  

  return status=='authenticated'&&business&&(
    <div className='py-8 md:py-20 px-10 md:px-36'>
      <BusinessInfo business={business}/>

      <div className='grid grid-cols-3 mt-16'>
        <div className='col-span-3 md:col-span-2 order-last md:order-first'>
        <BusinessDescription business={business}/>
        </div>
        <div className=''>
        <SuggestedBusinessList business={business}/>
        </div>
      </div>
    </div>
  );
}

export default BusinessDetail;
