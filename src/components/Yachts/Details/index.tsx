"use client"

import { useState, useEffect } from "react";
import Yachts from "./Details";
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
        <div className={`${(activeIndex === 0 && showGeneralInfo === true) ? '' : 'h-[calc(100vh-112px)]'}`}>
            <BreadCrum id={id} />
            <div className={`bg-white shadow-xs rounded-2xl px-4 py-4 overflow-hidden h-fit mt-4`}>
                {activeIndex === 0 && (
                    showGeneralInfo ?
                        <YachtsUpdate goToPrevTab={() => setShowGeneralInfo(false)} id={id} />
                        :
                        <Yachts goToNextTab={() => setShowGeneralInfo(true)} />
                )}
            </div>
        </div>
    )
}

export default YachtsDetail;