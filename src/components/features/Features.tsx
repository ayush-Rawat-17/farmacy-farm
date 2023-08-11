"use client";
import React from "react";
import Image from "next/image";
// import img from "../../images/Group 6.svg"
import img from "../../images/Group.svg";
import FlatIcon from "../flatIcon/flatIcon";

const dummdData = [
  {
    img: "flaticon-leaf",
    heading: "FRESH & ORGANIC",
    text: "Neque porro quisquam est, qui dolorem ",
    text1: "ipsum quia dolor sit amet, consectetur,",
    text2: "adipisci velit, sed qu",
  },
  {
    img: "flaticon-frams",
    heading: "CERTIFIED ORGANIC SOURCES",
    text: "Neque porro quisquam est, qui dolorem ",
    text1: "ipsum quia dolor sit amet, consectetur,",
    text2: "adipisci velit, sed qu",
  },
  {
    img: "flaticon-pesticide",
    heading: "Pesticide Free",
    text: "Neque porro quisquam est, qui dolorem ",
    text1: "ipsum quia dolor sit amet, consectetur,",
    text2: "adipisci velit, sed qu",
  },
];

const Features = () => {
  return (
    <div className="sm:px-[3.5%] px-[7%]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-x-4 gap-y-8 py-[50px] place-items-center">
        {/* <div className='flex items-center justify-between flex-wrap gap-5 py-[50px] border-[2px] border-[red] '> */}
        {dummdData.map((item: any, idx: number) => {
          return (
            <div key={idx} className="flex items-start  gap-5 ">
              <div className="bg-[#588F27] sm:h-[80px] sm:w-[80px] h-[60px] w-[60px] rounded-full flex items-center justify-center">
                <FlatIcon icon={`${item?.img} text-white text-4xl`} />
              </div>
              <div>
                <div className="font-semibold sm:text-lg text-sm mb-[3px]">
                  {item.heading}
                </div>
                <div className="text-[#777777] text-xs">
                  <div>{item.text}</div>
                  <div>{item.text1}</div>
                  <div>{item.text2}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Features;
