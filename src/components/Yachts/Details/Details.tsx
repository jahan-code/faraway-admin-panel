"use client"

import { useRouter } from "next/navigation";
import { MdEdit, MdKeyboardArrowLeft } from "react-icons/md";
import { useSelector } from "react-redux";
import type { RootState } from '@/lib/Store/store';

interface CustomersProps {
    goToNextTab: () => void;
}

function formatDateToDDMMYY(dateString?: string) {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yy = String(date.getFullYear()).slice(-2);
    return `${dd}/${mm}/${yy}`;
}

const Yachts: React.FC<CustomersProps> = ({ goToNextTab }) => {

    const router = useRouter();
    const { yachts, loading } = useSelector((state: RootState) => state.yachts);

    const GeneralInfoData = [
        {
            array: [
                { label: "Title", data: yachts?.title || "N/A" },
                { label: "Boat Type", data: yachts?.boatType || "N/A" },
                { label: "Category", data: yachts?.price || "N/A" },
                { label: "Length", data: `${yachts?.length}ft` || "N/A" },
                { label: "Cabin", data: yachts?.cabins || "N/A" },
                { label: "Bathroom", data: yachts?.bathrooms || "N/A" },
                { label: "Yacht Type", data: yachts?.type || "N/A" },
                { label: "Day Trip Price Euro", data: `${yachts?.daytripPriceEuro}€` || "N/A" },
                { label: "Badge", optional: "(Optional)", data: yachts?.badge || "N/A" },
                { label: "Built", data: yachts?.built || "N/A" },
                { label: "Capacity", data: yachts?.capacity || "N/A" },
                { label: "Code", optional: "(Optional)", data: yachts?.code || "N/A" },
                { label: "Created At", data: formatDateToDDMMYY(yachts?.createdAt || "N/A") },
                { label: "Cruising Speed", data: yachts?.cruisingSpeed || "N/A" },
                { label: "Day Trip Price", data: yachts?.dayTripPrice || "N/A" },
                // // { label: "Day Trip Price THB", data: yachts?.daytripPriceTHB || "N/A" },
                // { label: "Day Trip Price USD", data: yachts?.daytripPriceUSD || "N/A" },
                { label: "Design", data: yachts?.design || "N/A" },
                { label: "Video Link", data: yachts?.videoLink || "N/A" },
            ],
            iconone: MdKeyboardArrowLeft,
            btn: "Back",
            icon: MdEdit,
            btnone: "Edit",
        },
    ];

    return (
        <div className="">
            {loading ? (
                <div className="flex items-center justify-center lg:h-[calc(100vh-265px)]">
                    <div className="w-10 h-10 border-3 border-t-transparent border-[#2185D0] rounded-full animate-spin" />
                </div>
            ) : (
                GeneralInfoData.map((section, Idx) => (
                    <div key={Idx}>
                        {section.array && (
                            <div className="grid md:grid-cols-2 gap-x-6 gap-y-4 mb-4">
                                {section.array.map((item, idx) => (
                                    <div key={idx} className="flex">
                                        <div className="flex items-center gap-1 w-1/2">
                                            <span className="text-[#222222] font-bold">{item.label}</span>
                                            <span className="text-[#222222] font-normal text-[14px]">{item.optional}</span>
                                        </div>
                                        <span className="font-inter font-medium text-[#222222] w-1/2 break-words">{item.data}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                        {(section.btn || section.btnone) && (
                            <div className="mt-3 flex justify-between">
                                {section.btn &&
                                    <button onClick={() => router.push('/yachts')} className="rounded-full px-[16px] py-[7px] border border-[#666666] text-[#222222] flex items-center gap-1 justify-center cursor-pointer font-medium">
                                        {section.iconone && <section.iconone />}
                                        {section.btn}
                                    </button>}
                                {section.btnone &&
                                    <button onClick={goToNextTab} className="rounded-full px-[16px] py-[7px] bg-[#012A50] hover:bg-[#5F5C63] text-white text-center cursor-pointer font-medium flex items-center gap-2">
                                        {section.icon && <section.icon />}
                                        {section.btnone}
                                    </button>
                                }
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    )
}

export default Yachts;