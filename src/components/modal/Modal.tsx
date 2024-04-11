"use client";

import React, { FC, Fragment, useState } from "react";
import { TiTimes } from "react-icons/ti";
import Button from "../Button/Button";
import validator from "validator";
import { toast } from "react-toastify";
import { getUserData, handleLeadSubmit } from "@/utils/databaseService";
import { auth } from "@/config/firebase-config";
import { useQuery } from "@tanstack/react-query";
import { Listbox, Transition } from "@headlessui/react";
import FlatIcon from "../flatIcon/flatIcon";

interface Props {
  handleCloseModal: any;
  selectedProduct?: any;
  cookie?: any;
}

const Modal: FC<Props> = ({ handleCloseModal, selectedProduct, cookie }) => {
  const { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: () => getUserData(cookie),
    keepPreviousData: true,
  });
  const [selected, setSelected] = useState("");

  const [state, setState] = useState({
    name: "",
    email: "",
    phone: "",
    quantity: "",
    quotedPrice: "",
    companyName: "",
  });

  const [loading, setLoading]: any = useState(false);

  const handleChange = ({ name, value }: any) => {
    setState((val) => {
      return { ...val, [name]: value };
    });
  };

  const handleSubmit = async () => {
    if (
      !state.name ||
      !state.email ||
      !state.phone ||
      !state.quantity ||
      !state.quotedPrice
    ) {
      toast("Enter details correctly", { type: "error" });
      return;
    }

    if (!validator.isEmail(state.email)) {
      toast("Incorrect Email.", { type: "error" });
      return;
    }

    if (
      /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/.test(state.phone) ===
      false
    ) {
      toast("Incorrect Phone Number", { type: "error" });
      return;
    }

    setLoading(true);
    let data: any = {
      createdAt: new Date(),
      name: state.name,
      phoneNo: state.phone,
      email: state.email,
      companyName: state.companyName,
      products: [
        {
          name: selectedProduct?.name,
          qty: parseFloat(state.quantity),
          quotedPrice: parseFloat(state.quotedPrice),
          id: selectedProduct?.id || "", // product id
          variant: {
            unit: selectedProduct?.variants[0].unit || "",
            price: selectedProduct?.variants[0].price || {},
            weight: selectedProduct?.variants[0].weight || 0,
            sku: selectedProduct?.variants[0].sku || "",
          },
          vendor: {
            id: selectedProduct?.vendor?.id || "",
          },
          unit: selected,
        },
      ],
      vendorIds: [selectedProduct?.vendor?.id || ""],
    };

    if (auth.currentUser?.uid && userData) {
      data["user"] = {
        id: auth.currentUser?.uid,
        name: userData?.name || state.name,
        phoneNo: userData?.phoneNo || state.phone,
        // phoneNo: string,
      };
    }

    const res: boolean = await handleLeadSubmit(data);
    if (res) {
      setState({
        email: "",
        quantity: "",
        quotedPrice: "",
        name: "",
        phone: "",
        companyName: "",
      });
      setSelected("");
      setLoading(false);
      handleCloseModal();
      toast("Your interest has been captured.", { type: "success" });
      return;
    } else {
      toast("Something went wrong.", { type: "error" });
      return;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 top-0 left-0 w-[100vw] h-[100vh]">
      <div className="bg-white w-[38rem] max-h-[90vh] overflow-auto   rounded-3xl p-12">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-bold">I&apos;M Interested</h2>
          <button
            onClick={handleCloseModal}
            className="text-gray-500 hover:text-gray-700"
          >
            <TiTimes className="h-6 w-6" />
          </button>
        </div>
        <div className="flex flex-col gap-4 md:gap-6">
          <input
            type="text"
            placeholder="Your Name*"
            name="name"
            onChange={(e) => {
              handleChange({ name: e.target.name, value: e.target.value });
            }}
            value={state.name}
            className="border-[0.5px] rounded-sm py-3 md:py-4 px-4 md:px-6"
          />
          <input
            type="tel"
            placeholder="Phone Number*"
            name="phone"
            onChange={(e) => {
              if (
                validator.isNumeric(e.target.value) ||
                e.target.value === ""
              ) {
                handleChange({ name: e.target.name, value: e.target.value });
              }
            }}
            value={state.phone}
            className="border-[0.5px] rounded-sm py-3 md:py-4 px-4 md:px-6"
          />
          <input
            type="email"
            placeholder="Your Email*"
            name="email"
            onChange={(e) => {
              handleChange({ name: e.target.name, value: e.target.value });
            }}
            value={state.email}
            className="border-[0.5px] rounded-sm py-3 md:py-4 px-4 md:px-6"
          />
          <input
            type="text"
            placeholder="Company/Brand Name"
            name="companyName"
            onChange={(e) => {
              handleChange({ name: e.target.name, value: e.target.value });
            }}
            value={state.companyName}
            className="border-[0.5px] rounded-sm py-3 md:py-4 px-4 md:px-6"
          />
          <input
            type="text"
            name="quantity"
            onChange={(e) => {
              handleChange({ name: e.target.name, value: e.target.value });
            }}
            value={state.quantity}
            placeholder="Quantity"
            className="border-[0.5px] rounded-sm py-3 md:py-4 px-4 md:px-6"
          />

          <Listbox value={selected} onChange={setSelected}>
            <div className="relative mt-1">
              <Listbox.Button className="  relative w-full cursor-default  bg-white py-1 pl-1 pr-5 md:py-4 md:pl-5 md:pr-10 text-left rounded-[1px] border border-gray-200 focus:outline-none sm:text-sm">
                <span
                  className={`block truncate font-semibold ${
                    !selected && "text-gray-400"
                  }`}
                >
                  {selected || "Select Unit"}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <i className="flaticon-down-arrow flex justify-center items-center"></i>
                  {/* <FlatIcon className={`flaticon-left-arrow text-black`} /> */}
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute px-4 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {/* {constant.intakeList.map((intake, personIdx) => ( */}
                  <Listbox.Option
                    key={"kg"}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-2 pr-4 border-b border-gray-300 ${
                        active ? " text-primary" : "text-gray-900"
                      }`
                    }
                    value={"Kgs"}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          Kgs
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 right-0 flex items-center pl-3 text-primary">
                            <FlatIcon className={`flaticon-check`} />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                  <Listbox.Option
                    key={"tons"}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-2 pr-4 border-b border-gray-300 ${
                        active ? " text-primary" : "text-gray-900"
                      }`
                    }
                    value={"Tons"}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          Tons
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 right-0 flex items-center pl-3 text-primary">
                            <FlatIcon className={`flaticon-check`} />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                  {/* ))} */}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>

          <input
            type="text"
            name="quotedPrice"
            onChange={(e) => {
              handleChange({ name: e.target.name, value: e.target.value });
            }}
            value={state.quotedPrice}
            placeholder="Enter Quoted Price"
            className="border-[0.5px] rounded-sm py-3 md:py-4 px-4 md:px-6"
          />
          <div className="flex flex-col md:flex-row items-center justify-between mt-4 md:mt-6">
            <Button
              onClickHandler={handleSubmit}
              isLoading={loading}
              text={"SUBMIT"}
              className="px-6 py-3 md:px-[60px] md:py-[15px] cursor-pointer"
            />
            <div className="text-sm md:text-base font-semibold mt-2 md:mt-0">
              Or You Can Call{" "}
              <span className="text-[#598f26] font-semibold">
                +91 9790897308
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
