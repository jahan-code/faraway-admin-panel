"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { DetailData } from "@/data/Yachts";
import BreadCrum from "./BreadCrum";
import { useSelector, useDispatch } from "react-redux";
import { getYachts, deleteYachts } from "@/lib/Features/Yachts/addyachtsSlice";
import type { RootState, AppDispatch } from '@/lib/Store/store';
import { CiCalendar, CiLocationOn } from "react-icons/ci";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdOutlineBathroom } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const YachtsDetail = () => {

  const [favorites, setFavorites] = useState<Record<number, Record<number, boolean>>>({});
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef<InstanceType<typeof Slider> | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const { allYachts, getLoading, totalPages, total, currentPage } = useSelector((state: RootState) => state.yachts);
  console.log(allYachts, "Data>>>>>>>")
  const [currentPages, setCurrentPages] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(getYachts({ page: currentPages, limit: itemsPerPage }));
  }, [currentPages, itemsPerPage, dispatch]);

  const toggleFavorite = (itemId: number, imgIndex: number) => {
    setFavorites((prev) => ({
      ...prev,
      [itemId]: {
        ...(prev[itemId] || {}),
        [imgIndex]: !prev[itemId]?.[imgIndex] || false,
      },
    }));
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    afterChange: (index: number) => setActiveSlide(index),
  };

  // const filteredData = DetailData
  //   .filter(yachts =>
  //     yachts?.label?.toLowerCase().includes(searchTerm.toLowerCase())
  //   )
  // const isFiltering = searchTerm.trim() !== '';
  // const currentItems = filteredData;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPages(newPage);
    }
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;
    const pages: (number | string)[] = [];
    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1, "...", totalPages - 1, totalPages);
    }
    return pages.map((p, index) => (
      <button
        key={index}
        className={`w-[35px] h-[35px] rounded-full border cursor-pointer ${currentPages === p ? "bg-[#012A50] text-white" : "bg-white text-[#012A50]"
          }`}
        onClick={() => typeof p === "number" && handlePageChange(p)}
        disabled={p === "..."}
      >
        {p}
      </button>
    ));
  };

  return (
    <>
      <BreadCrum onSearch={setSearchTerm} />
      {getLoading ? (
        <div className="flex items-center justify-center lg:h-[calc(100vh-14.5rem)]">
          <div className="w-10 h-10 border-3 border-t-transparent border-[#012A50] rounded-full animate-spin" />
        </div>
      ) : allYachts?.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 mt-[12px]">
          {allYachts.map((yachtItem, yachtIndex) => {
            const Box = [
              {
                id: 1,
                img: "/images/Home/featured-ft.svg",
                label: yachtItem?.lengthRange ? `${yachtItem.lengthRange} ft` : null,
              },
              {
                id: 2,
                img: "/images/Home/featured-guest.svg",
                label: yachtItem?.guests ? `${yachtItem.guests} guests` : null,
              },
              {
                id: 3,
                icon: CiCalendar,
                label: yachtItem?.built ?? null,
              },
            ];
            const Cabins = [
              {
                id: 1,
                icon: MdOutlineBathroom,
                label: yachtItem?.bathrooms ? `with ${yachtItem.bathrooms} Bathrooms` : null,
              },
              {
                id: 2,
                img: "/images/Home/featured-cabin.svg",
                label: yachtItem?.cabins ? `${yachtItem.cabins} Cabins` : null,
              },
            ];
            return (
              <div key={yachtIndex} className="bg-white border border-[#CECECE] rounded-lg shadow-md px-[8px] py-[8px] flex gap-4 items-center overflow-hidden cursor-pointer">
                <div className="relative w-[37%] overflow-hidden">
                  {yachtItem.galleryImages?.length > 1 ? (
                    <div className="relative">
                      <Slider ref={sliderRef} {...settings}>
                        {yachtItem.galleryImages.map((imgSrc, index) => (
                          <div key={index}>
                            <Image
                              src={imgSrc}
                              alt={`Yacht image ${index + 1}`}
                              width={300}
                              height={258}
                              className="w-full h-[260px] object-cover rounded-lg"
                              priority={index === 0}
                              unoptimized={true}
                            />
                          </div>
                        ))}
                      </Slider>
                      <div className="flex gap-2 absolute left-1/3 bottom-[1.3rem]">
                        {yachtItem.galleryImages.slice(0, 4).map((_, idx) => (
                          <button
                            key={idx}
                            className={`w-[24px] h-[3px] cursor-pointer rounded-md bg-[#B0B0B0] ${idx === activeSlide ? "bg-white" : ""
                              }`}
                            onClick={() => sliderRef.current?.slickGoTo(idx)}
                          ></button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      <Image
                        src={yachtItem.galleryImages?.[0] || "/default.jpg"}
                        alt="Yacht image"
                        width={300}
                        height={258}
                        className="w-full h-[220px] object-cover"
                        unoptimized={true}
                      />
                    </div>
                  )}
                  <div className="absolute top-2 right-2 text-[#F7F7F7]/50 text-[24px] cursor-pointer"
                    onClick={() => toggleFavorite(yachtIndex, yachtIndex)}>
                    {favorites[yachtIndex]?.[yachtIndex] ? (
                      <FaHeart className="text-[#C3974C]" />
                    ) : (
                      <FaRegHeart />
                    )}
                  </div>
                </div>
                <div className="pt-[4px] border-r border-[#D1D1D1] pr-5 w-[70%]">
                  <h3 className="font-plusjakarta font-extrabold text-[19px] text-[#0061B1]">{yachtItem.title}</h3>
                  <div className="flex items-center gap-2 mt-[8px]">
                    {Box.map((ft, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 py-[10px] px-[16px] border border-[#E8E8E8] bg-white rounded-md"
                        style={{ boxShadow: "0px 4px 24px 0px #B5B5B540" }}
                      >
                        {ft.img && (
                          <Image src={ft.img} alt={`Yacht image ${index + 1}`} width={16} height={16} />
                        )}
                        {ft.icon && <ft.icon className="text-[#122B3F] text-[16px]" />}
                        <span className="ml-1 font-normal text-[13px] text-[#1A2C37] font-plusjakarta">{ft.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-1 mt-[8px] items-center">
                    {Cabins.map((sk, index) => (
                      <div key={index} className="flex items-center gap-2 py-[5px] px-[8px] border border-[#E8E8E8] bg-white rounded-md"
                        style={{ boxShadow: "0px 4px 24px 0px #B5B5B540" }}>
                        {sk.img && <Image src={sk.img} alt={`Yacht image ${index + 1}`} width={12} height={12} />}
                        {sk.icon && <sk.icon className="text-[#122B3F] text-[16px]" />}
                        <span className="ml-1 font-plusjakarta font-normal text-[13px] text-[#6D6D6D]">{sk.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-[28px] items-center">
                    {yachtItem.galleryImages.slice(0, 6).map((sk, index) => (
                      <div key={index} className="flex items-center relative">
                        <Image
                          src={sk}
                          alt={`Yacht image ${index + 1}`}
                          width={54}
                          height={44}
                          className="rounded-md cursor-pointer w-[54px] h-[44px]"
                        />
                      </div>
                    ))}
                    {yachtItem.galleryImages.length > 6 && (
                      <div
                        className="relative cursor-pointer"
                        onClick={() => console.log("See All clicked")}
                      >
                        <Image
                          src={yachtItem.galleryImages[6]}
                          alt="Yacht image see all"
                          width={54}
                          height={44}
                          className="rounded-md w-[54px] h-[44px]"
                        />
                        <div className="absolute inset-0 bg-[#0C0C0C]/70 rounded-md flex items-center justify-center">
                          <span className="text-white text-sm font-medium">See All</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="pt-[1px] flex flex-col justify-between h-[16rem] w-[20%]">
                  <div className="flex justify-end">
                    <p className="gradient-text font-extrabold text-[13px] font-plusjakarta">Luxury on the Waves!</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-[#3D3D3D] font-normal text-[13px] font-plusjakarta">
                      Starting from
                    </p>
                    <p className="text-[#C3974C] font-plusjakarta font-extrabold text-[23px]">
                      €{yachtItem.daytripPriceEuro}
                    </p>
                    <button className="px-[24px] py-[8px] mt-1 cursor-pointer font-plusjakarta font-extrabold text-[13px] bg-[#001B48] text-white rounded-full"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[300px] text-lg text-[#012A50]">
          No data available.
        </div>
      )}
      <div className="flex justify-center mt-10">
        {total > 0 && (
          <div className="flex gap-2 items-center">
            {currentPages > 1 && (
              <button
                className="w-[35px] h-[35px] text-[16px] cursor-pointer text-[#012A50] flex justify-end items-center"
                onClick={() => handlePageChange(currentPages - 1)}
              >
                <FaChevronLeft />
              </button>
            )}
            {renderPagination()}
            {currentPages < totalPages && (
              <button
                className="w-[35px] h-[35px] text-[16px] cursor-pointer text-[#012A50]"
                onClick={() => handlePageChange(currentPages + 1)}
              >
                <FaChevronRight />
              </button>
            )}
          </div>
        )}
      </div>

    </>
  );
};

export default YachtsDetail;