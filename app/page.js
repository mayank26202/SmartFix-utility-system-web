"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Hero from "./_components/Hero";
import CategoryList from "./_components/CategoryList";
import GlobalApi from "./_services/GlobalApi";
import { useEffect, useState } from "react";
import BusinessList from "./_components/BusinessList";
import Slider from "./_components/Slider";
import Footer from "./_components/Footer";

export default function Home() {
  const [categoryList, setCategoryList] = useState([]);
  const [businessList, setBusinessList] = useState([]);

  useEffect(() => {
    getCategoryList();
    getAllBusinessList();
  }, []);

  // use to get all category list
  const getCategoryList = () => {
    GlobalApi.getCategory().then((resp) => {
      setCategoryList(resp.categories);
    });
  };

  // useEffect(() => {
  //   if (categoryList.length > 0) {
  //     console.log(categoryList[0]?.icon?.[0]?.url);
  //   }
  // }, [categoryList]);

  //use to get all business list
  const getAllBusinessList = () =>{
    GlobalApi.getAllBusinessList().then((resp)=>{
      setBusinessList(resp.businessLists);
    });
  }

  return (
    <div>
      <Hero />
      <CategoryList categoryList={categoryList} />
      <Slider/>
      <BusinessList businessList={businessList} title={'Popular Services'}/>
      {/* <Footer /> */}
    </div>
  );
}
