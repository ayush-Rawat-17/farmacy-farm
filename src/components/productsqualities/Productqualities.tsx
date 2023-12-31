"use client";

import React, { useState } from "react";

import Image from "next/image";
import { GoDotFill } from "react-icons/go";
import desc1 from "../../images/descriptionimg1.svg";
import desc2 from "../../images/descriptionimg2.svg";
import { useQuery } from "@tanstack/react-query";
import { fetchSingleProduct } from "@/utils/databaseService";

const DUMMY_DATA = {
  descriptiontext:
    "Broccoli juice has been associated with numerous health benefits, including improved blood flow, lower blood pressure, and increased exercise performance. Packed with essential nutrients, Broccoli are a great source of fiber, folate (vitamin B9), manganese, potassium, iron, and vitamin C. Beets contain a high concentration of nitrates, which have a blood pressure-lowering effect. This may lead to a reduced risk of heart attacks, heart failure, and stroke.Broccoli are delicious raw but more frequently cooked or pickled. There are numerous types of Broccoli, many of which are distinguished by their color — yellow, white, pink, or dark purple. Broccoli juice acts as a great blood purifier, which is key to keeping your skin glowing and healthy. Broccoli are also rich in Vitamin C which helps in clearing blemishes and evens out your skin tone while giving it a natural glow. Raw or cooked beetroot offers about 8–10% carbs. Simple sugars — such as glucose and fructose — make up 70% and 80% of the carbs in raw and cooked beetroots, respectively. Beetroots have a glycemic index (GI) score of 61, which is considered medium.",
  image1: desc1,
  image2: desc2,
  additionaltext:
    "Broccoli juice has been associated with numerous health benefits, including improved blood flow, lower blood pressure, and increased exercise performance. Packed with essential nutrients, Broccoli are a great source of fiber, folate (vitamin B9), manganese, potassium, iron, and vitamin C. Beets contain a high concentration of nitrates, which have a blood pressure-lowering effect. This may lead to a reduced risk of heart attacks, heart failure, and stroke.Broccoli are delicious raw but more frequently cooked or pickled. There are numerous types of Broccoli, many of which are distinguished by their color — yellow, white, pink, or dark purple. Broccoli juice acts as a great blood purifier, which is key to keeping your skin glowing and healthy. Broccoli are also rich in Vitamin C which helps in clearing blemishes and evens out your skin tone while giving it a natural glow. Raw or cooked beetroot offers about 8–10% carbs. Simple sugars — such as glucose and fructose — make up 70% and 80% of the carbs in raw and cooked beetroots, respectively. Beetroots have a glycemic index (GI) score of 61, which is considered medium.",
  features: [
    " Vitamin A18.0IU",
    " Vitamin C89.4mg",
    " Calcium 24.0mg",
    "Potassium 233mg",
  ],
};

const Productqualities = ({ slug }: any) => {
  const { data: productInfo }: any = useQuery({
    queryKey: ["product", slug],
    queryFn: () => fetchSingleProduct({ slug }),
  });
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <div className="px-[3.5%] pt-[2.5%] pb-[3.5%]">
      <div className="flex flex-col md:flex-row justify-center gap-[60px]">
        <div className="flex flex-col gap-[2rem] md:w-[100%]">
          <div className="flex  gap-10">
            {productInfo?.desc && (
              <div
                className={`font-medium text-xl md:text-2xl text-[#598f26] ${
                  selectedTab === 0 && "underline"
                }  underline-offset-4 cursor-pointer`}
                onClick={() => setSelectedTab(0)}
              >
                Description
              </div>
            )}
            {productInfo?.additionalDesc && (
              <div
                className={`font-medium text-xl md:text-2xl text-[#598f26] ${
                  selectedTab === 1 && "underline"
                }  underline-offset-4 cursor-pointer`}
                onClick={() => setSelectedTab(1)}
              >
                Additional Information
              </div>
            )}
          </div>
          {selectedTab === 0 ? (
            <div dangerouslySetInnerHTML={{ __html: productInfo?.desc }}></div>
          ) : selectedTab === 1 ? (
            <div
              dangerouslySetInnerHTML={{ __html: productInfo?.additionalDesc }}
            ></div>
          ) : (
            <div className=""></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Productqualities;
