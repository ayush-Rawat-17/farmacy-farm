"use client";
import React from "react";
import basketImg from "../../images/orga-image01 1.svg";
import location from "../../images/Location.svg";
import meail from "../../images/Message.svg";
import calling from "../../images/Calling.svg";
import organicLogo from "../../images/Frame (1).svg";
import Image from "next/image";
import { HiLocationMarker } from "react-icons/hi";
import call from "../../images/Calling.png";
import locationImg from "../../images/Location.png";
import messageImg from "../../images/Message.png";
import triangle from "../../images/Rectangle 23990.svg";
import useMediaQuery from "@mui/material/useMediaQuery";

const DummyData = [
  {
    image: locationImg,
    heading: "Visit Us",
    subHeading:
      "7th Floor, EA Chambers Tower II,49/50L, Whites Rd, Express Estate, Royapettah, Chennai, Tamil Nadu 600014",
  },
  {
    image: messageImg,
    heading: "Mail Us",
    subHeading: "support@farmacyfarm.com",
  },
  { image: call, heading: "Call Us", subHeading: "+91 9790897308/9798912099" },
];

const GetInTouch = () => {
  const matches = useMediaQuery("(max-width:1096px)");
  const matches2 = useMediaQuery("(max-width:1000px)");
  const matches3 = useMediaQuery("(max-width:452px)");
  return (
    <div className="flex sm:px-[3.5%] px-[7%]  md:mb-[400px] mb-[600px] sm:mb-[600px] sm:pb-[20px] pb-[20px]  ">
      <div className="flex lg:justify-between px-20 lg:flex-row flex-wrap xl:gap-[150px] w-full  mx-auto">
        <div className="">
          <div className="text-[#588f27] text-md font-semibold mb-[5px]">
            Our Contacts
          </div>
          <h1 className="font-semibold md:text-4xl text-2xl mb-[15px]">
            Get in Touch
          </h1>
          <div className="text-[#555555] font-medium text-xs mb-[20px]">
            <div>
              Get in touch to discuss your employee wellbeing needs today.
            </div>
            <div>
              {" "}
              Please give us a call, drop us an email or fill out the contact
              form
            </div>
            <div>and we’ll get back to you.</div>
          </div>
          <div className=" flex flex-col gap-10">
            {DummyData.map((item: any, idx: number) => {
              return (
                <div className="flex items-center sm:gap-5 gap-2 " key={idx}>
                  <div className="bg-[#588f27] sm:h-[75px] sm:w-[75px] w-[35px] h-[35px] rounded-full flex justify-center items-center">
                    <Image
                      src={item.image}
                      alt=""
                      width={matches3 ? 12 : 30}
                      height={matches3 ? 12 : 30}
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                      }}
                    />
                  </div>
                  <div>
                    <div className="md:text-lg sm:text-base text-sm font-semibold">
                      {item.heading}
                    </div>
                    <div className="text-[#555555] font-medium text-xs">
                      {item.subHeading}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {!matches2 && (
          <div className="flex items-start relative  ">
            <div className="  ">
              <Image
                src={basketImg}
                alt=""
                width={matches ? 400 : 500}
                height={matches ? 400 : 500}
                className=""
                style={{
                  maxWidth: "100%",
                  height: "auto",
                }}
              />
            </div>
            <div className="   absolute top-[-60px] right-[-100px]">
              <Image
                src={organicLogo}
                alt=""
                width={matches ? 150 : 230}
                height={matches ? 150 : 230}
                className=""
                style={{
                  maxWidth: "100%",
                  height: "auto",
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetInTouch;
