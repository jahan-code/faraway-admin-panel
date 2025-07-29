"use client"

import { useState, useEffect } from "react";
import Yachts from "./Details";
import Yacht from "./DetailsOne"
import YachtsUpdate from "./Update";
import BreadCrum from "./BreadCrum";

interface VendorsProps {
    id: string | number;
}

const YachtsDetail: React.FC<VendorsProps> = ({ id }) => {

    const [activeIndex, setActiveIndex] = useState(0);
    const [showGeneralInfo, setShowGeneralInfo] = useState(false);


    useEffect(() => {
        if (activeIndex === 0) {
            setActiveIndex(0);
        }
    }, [activeIndex]);


    return (
        <div className={`${(activeIndex === 0 && showGeneralInfo === true) ? '' : ''}`}>
            <BreadCrum id={id} />
            <div className={`${showGeneralInfo === false ? "flex flex-col lg:flex-row gap-2" : ""} mt-4`}>
                <div className={`${showGeneralInfo === false ? "w-full lg:w-[70%] xl:w-[75%]" : ""} bg-white shadow-xs rounded-2xl px-4 py-4 overflow-hidden h-fit`}>
                    {activeIndex === 0 && (
                        showGeneralInfo ?
                            <YachtsUpdate goToPrevTab={() => setShowGeneralInfo(false)} id={id} />
                            :
                            <Yachts goToNextTab={() => setShowGeneralInfo(true)} />
                    )}
                </div>
                <div className={`${showGeneralInfo === false ? "w-full lg:w-[30%] xl:w-[26%]" : ""}`}>
                    {activeIndex === 0 && (
                        showGeneralInfo ?
                            null
                            :
                            <Yacht />
                    )}
                </div>
            </div>
        </div>
    )
}

export default YachtsDetail;