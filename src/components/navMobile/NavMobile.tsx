"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import useMediaQuery from "@mui/material/useMediaQuery";
import { AiOutlineClose } from "react-icons/ai";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BsTelephone } from "react-icons/bs";
import Image from "next/image";
import logo from "../../images/logo2.png";
import { FiSearch } from "react-icons/fi";
import { SlArrowDown } from "react-icons/sl";
import FlatIcon from "../flatIcon/flatIcon";
import {
  checkUserLogin,
  fetchCategories,
  fetchSubCategories,
} from "@/utils/databaseService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useDebounce from "@/utils/useDebounce";
import { handleTypesenseSearch } from "@/config/typesense";
import { TiTimes } from "react-icons/ti";
import SearchTile from "../searchHeader/SrarchTile";
import SideMenuLogin from "../sidemenulogin/SideMenulogin";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase-config";
import axios from "axios";

const NavMobile = ({ cookie }: any) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isShowLoginMenu, setShowLoginMenu] = useState(false);

  const debouncedSearch = useDebounce(searchQuery, 500);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const mobile = useMediaQuery("(max-width:480px)");
  const matches = useMediaQuery("(max-width:624px)");
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(),
  });
  const { data: subCategories } = useQuery({
    queryKey: ["sub-categories"],
    queryFn: () => fetchSubCategories(),
  });

  async function fetchSearchedProducts() {
    const res = await handleTypesenseSearch(debouncedSearch);
    if (res) {
      setSearchedProducts(res);
    }
  }

  const handleLoginClick = () => {
    // setShowLogin(true);

    setShowLoginMenu(!isShowLoginMenu);
    document.body.classList.add("no-scroll");
  };

  const closeLoginMenu = () => {
    // dispatch(closeLoginModal());
    setShowLoginMenu(false);
    document.body.classList.remove("no-scroll");
  };

  const handleLogout = async () => {
    return await signOut(auth)
      .then(async () => {
        // Sign-out successful.
        await axios.post("/api/logout");
        queryClient.invalidateQueries({ queryKey: ["userData"] });
        queryClient.refetchQueries({ queryKey: ["userData"] });
        router.replace("/");
        setIsMobile(false);
        document.body.classList.remove("no-scroll");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  useEffect(() => {
    if (searchQuery === "") {
      setSearchedProducts([]);
    }
    if (debouncedSearch) {
      fetchSearchedProducts();
      // fetch(`/api/search?q=${debouncedSearch}`);
    }
  }, [debouncedSearch]);

  return (
    <div className="w-full   sm:px-[3.5%] px-[7%]  py-[10px] bg-[#eef0e5] font-medium text-md  relative ">
      {isSearchOpen && (
        <div className="absolute top-0 left-0 bg-white w-full h-full shadow-md flex">
          <div className="w-full h-full relative">
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products..."
              className=" w-full h-full select-none outline-none pl-3 pr-10 "
            />
            {searchQuery !== "" && searchedProducts?.length > 0 && (
              <div className="absolute z-50 px-4 top-full left-0 bg-white  w-full h-full max-h-[500px]flex flex-col gap-2">
                {searchQuery !== "" ? (
                  <div className="flex flex-col gap-2 bg-white">
                    {searchedProducts?.map((product: any) => {
                      return (
                        <div key={product?.id}>
                          <SearchTile
                            setSearchQuery={setSearchQuery}
                            product={product}
                          />
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            )}
          </div>

          <div
            className="absolute top-0 right-0 px-4 flex flex-col items-center justify-center h-full"
            onClick={() => {
              setIsSearchOpen(false);
            }}
          >
            <TiTimes className="h-6 w-6" />
          </div>
        </div>
      )}
      <div className="flex justify-between items-center">
        <div>
          <Image
            src={logo}
            alt=""
            width={mobile ? 50 : 100}
            height={mobile ? 50 : 100}
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </div>
        <div className="flex items-center sm:gap-10 gap-5">
          <div
            className=" sm:px-[10px] sm:py-[10px] px-[5px] py-[5px] rounded-md"
            onClick={() => {
              setIsSearchOpen(true);
            }}
          >
            <FiSearch className="sm:h-[22px] sm:w-[22px] h-[18px] w-[18px]" />
          </div>
          <div
            onClick={(prev) => {
              setIsMobile(true);
              document.body.classList.add("no-scroll");
            }}
          >
            <AiOutlineMenu className="sm:h-[25px] sm:w-[25px] h-[20px] w-[20px]" />
          </div>
        </div>
      </div>

      {isMobile && (
        <div className="h-[100vh] w-[100vw] bg-[rgba(0,0,0,0.5)] fixed top-0 left-0 z-10">
          <div
            className={` bg-[white]  ${
              matches ? "w-[100%]" : "w-[50%]"
            } absolute top-0 left-0 h-screen z-30 rounded-tr-3xl rounded-br-3xl sm:w-[50%] w-[100%] `}
          >
            <div
              onClick={() => {
                setIsMobile(false);
                document.body.classList.remove("no-scroll");
              }}
              className="absolute top-[20px] right-[20px]"
            >
              <AiOutlineClose className="h-[20px] w-[20px]" />
            </div>
            <div className="flex  flex-col gap-2 font-medium    px-[30px] ">
              <div className=" w-[150px] py-[5px] mt-[20px] mb-[10px] ">
                <Image src={logo} alt="" className="" />
              </div>
              <Link
                href={"/"}
                className={`flex gap-1 items-center  ${
                  pathname === "/" && "text-[#619533] "
                }  py-[5px] `}
                onClick={() => {
                  setIsMobile(false);
                  document.body.classList.remove("no-scroll");
                }}
              >
                Home
              </Link>
              <div
                className={`flex flex-col justify-center items-between gap-2  py-[5px] `}
              >
                <div
                  className="flex justify-between"
                  onClick={() => {
                    setIsCategoriesOpen(!isCategoriesOpen);
                  }}
                >
                  <div>All Categories</div>
                  <div>
                    <FlatIcon
                      icon="flaticon-down-arrow"
                      classname={`text-primary  ${
                        isCategoriesOpen ? "" : "-rotate-90"
                      }`}
                    />
                  </div>
                </div>
                {isCategoriesOpen && (
                  <div className="w-full">
                    <div className="flex flex-col  ">
                      {categories &&
                        categories?.map((category: any, idx: any) => {
                          return (
                            <div className="relative" key={idx}>
                              <Link
                                href={"/category/category-1/subCategory2"}
                                onClick={(e) => {
                                  if (category.isSubCategory) {
                                    e.preventDefault();
                                  } else {
                                    setIsCategoriesOpen(false);
                                    setIsMobile(false);
                                    setSelectedCategory("");
                                  }
                                }}
                              >
                                <div
                                  onClick={() => {
                                    if (category.isSubCategory) {
                                      if (selectedCategory === category?.id) {
                                        setSelectedCategory("");
                                      } else {
                                        setSelectedCategory(category?.id);
                                      }
                                    }
                                  }}
                                  className={`px-4 py-3   ${
                                    idx !== categories.length - 1 &&
                                    "border-b border-[#dbdbdb]"
                                  } flex justify-between items-center `}
                                >
                                  <p className="">{category.name}</p>
                                  {category.isSubCategory &&
                                    (selectedCategory === category?.id ? (
                                      <FlatIcon
                                        icon="flaticon-down-arrow"
                                        classname={`text-primary`}
                                      />
                                    ) : (
                                      // <i className="flaticon-down-arrow text-primary w-fit flex items-center" />
                                      <FlatIcon
                                        icon="flaticon-down-arrow"
                                        classname={`text-primary -rotate-90`}
                                      />
                                    ))}
                                </div>
                              </Link>
                              {selectedCategory === category?.id && (
                                <div className=" left-full bg-white border-l rounded-lg border-[#dbdbdb] w-auto min-w-[200px]">
                                  {subCategories &&
                                    subCategories
                                      .filter((val: any) =>
                                        val.categories.includes(
                                          selectedCategory
                                        )
                                      )
                                      ?.map((sub: any, idx: any) => {
                                        return (
                                          <Link
                                            key={idx}
                                            onClick={() => {
                                              setIsCategoriesOpen(false);
                                              setSelectedCategory("");
                                            }}
                                            href={
                                              "/category/category-1/subCategory2"
                                            }
                                          >
                                            <div
                                              className={`px-4 py-3 flex justify-between pl-10  border-b border-[#dbdbdb] bg-slate-100`}
                                            >
                                              <p className="">{sub.name}</p>
                                              <div></div>
                                            </div>
                                          </Link>
                                        );
                                      })}
                                </div>
                              )}
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}
              </div>

              {!checkUserLogin(cookie) && (
                <Link
                  href={"/login"}
                  className={`${
                    pathname.includes("aboutUs") && "text-[#619533]"
                  }  py-[5px] `}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobile(false);
                    document.body.classList.remove("no-scroll");
                    setShowLoginMenu(!isShowLoginMenu);
                    document.body.classList.add("no-scroll");
                  }}
                >
                  Buyer&apos;s Login
                </Link>
              )}
              {checkUserLogin(cookie) && (
                <Link
                  href={"/profile"}
                  className={`${
                    pathname.includes("profile") && "text-[#619533]"
                  }  py-[5px] `}
                  onClick={(e) => {
                    setIsMobile(false);
                    document.body.classList.remove("no-scroll");
                    document.body.classList.add("no-scroll");
                  }}
                >
                  Profile
                </Link>
              )}
              <Link
                href={"/farmer-registration"}
                className={`${
                  pathname.includes("aboutUs") && "text-[#619533]"
                }  py-[5px]`}
                onClick={(e) => {
                  setIsMobile(false);
                  document.body.classList.remove("no-scroll");
                }}
              >
                Farmer Registration
              </Link>
              <Link
                href={"https://bwi-emb-farmacy-vendor.web.app/"}
                target="_blank"
                className={`${
                  pathname.includes("aboutUs") && "text-[#619533]"
                }  py-[5px]`}
                onClick={(e) => {
                  setIsMobile(false);
                  document.body.classList.remove("no-scroll");
                }}
              >
                Farmer Login
              </Link>
              <Link
                href={"/aboutUs"}
                className={`${
                  pathname.includes("aboutUs") && "text-[#619533]"
                }  py-[5px] `}
                onClick={() => {
                  setIsMobile(false);
                  document.body.classList.remove("no-scroll");
                }}
              >
                About Us
              </Link>
              <Link
                href={"/gallery"}
                className={`${
                  pathname.includes("gallery") && "text-[#619533]"
                }  py-[5px] `}
                onClick={() => {
                  setIsMobile(false);
                  document.body.classList.remove("no-scroll");
                }}
              >
                Gallery
              </Link>
              <Link
                href={"/farmerlist"}
                className={`${
                  pathname.includes("farmerlist") && "text-[#619533]"
                }  py-[5px] `}
                onClick={() => {
                  setIsMobile(false);
                  document.body.classList.remove("no-scroll");
                }}
              >
                Farmer List
              </Link>
              <Link
                href={"/contactUs"}
                className={`${
                  pathname.includes("contactUs") && "text-[#619533]"
                }  py-[5px] `}
                onClick={() => {
                  setIsMobile(false);
                  document.body.classList.remove("no-scroll");
                }}
              >
                Contact Us
              </Link>
              {checkUserLogin(cookie) && (
                <Link
                  href={"/logout"}
                  className={`${
                    pathname.includes("aboutUs") && "text-[#619533]"
                  }  py-[5px]`}
                  onClick={async (e) => {
                    e.preventDefault();
                    await handleLogout();
                    setIsMobile(false);
                    document.body.classList.remove("no-scroll");
                  }}
                >
                  Logout
                </Link>
              )}
              <div className="flex items-center text-[#51150a] font-bold gap-2  py-[5px] ">
                <div>
                  <BsTelephone className="h-[18px] w-[18px]" />
                </div>
                <div>+91 9790897308</div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isShowLoginMenu && (
        <SideMenuLogin
          isOpen={isShowLoginMenu}
          setShowLogin={setShowLoginMenu}
          onClose={closeLoginMenu}
        />
      )}
    </div>
  );
};

export default NavMobile;
