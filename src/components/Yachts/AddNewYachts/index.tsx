"use client"

import { useState } from "react";
import { NewYachtsData, RichTextEditorSections, YachtsData } from "@/data/Yachts";
import { MdDeleteOutline } from "react-icons/md";
import Image from "next/image";
import { useRouter } from "next/navigation";
import RichTextEditor from "./RichTextEditor";
// import { useDispatch } from "react-redux";
// import type { AppDispatch } from '@/lib/Store/store';
// import { toast, ToastContainer } from "react-toastify";
// import { useFormik } from "formik";
// import 'react-toastify/dist/ReactToastify.css';
// import { addVehicleInfo } from "@/lib/Features/Yachts/addvendorslice";
// import { yachtsvalidationSchema, FormYachtsValues } from "@/lib/Validation/addyachtsValidationSchema";

type FileItem = {
    file: File;
    preview: string | null;
    type: "image" | "pdf";
};

const AddNewYachts: React.FC = () => {

    // const dispatch = useDispatch<AppDispatch>();
    const [files, setFiles] = useState<FileItem[]>([]);
    const router = useRouter();
    const [values, setValues] = useState<Record<string, string | number | boolean>>({});
    const [richTextContent, setRichTextContent] = useState<Record<string, string>>({});

    const handleChange = (label: string, value: string | number | boolean) => {
        setValues((prev) => ({ ...prev, [label]: value }));
    };

    const handleRichTextChange = (id: string, content: string) => {
        setRichTextContent((prev) => ({ ...prev, [id]: content }));
    };

    const handleFileUpload = (fileList: FileList | null) => {
        if (!fileList) return;

        const acceptedTypes = ["image/jpeg", "image/png"];
        const newFiles: FileItem[] = Array.from(fileList)
            .filter(file => acceptedTypes.includes(file.type))
            .map(file => ({
                file,
                preview: file.type === "application/pdf" ? null : URL.createObjectURL(file),
                type: file.type === "application/pdf" ? "pdf" : "image",
            }));

        setFiles(prev => [...prev, ...newFiles]);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        handleFileUpload(e.dataTransfer.files);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFileUpload(e.target.files);
    };

    const handleRemoveImage = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    // const formik = useFormik<FormYachtsValues>({
    //     initialValues: {
    //         "Boat Type": "",
    //         "Title": "",
    //         "Category": "",
    //         "Capacity": "",
    //         "Length": "",
    //         "Length Range": false, 
    //         "Cabins": "",
    //         "Bathrooms": "",
    //         "Passenger Day Trip": "",
    //         "Passenger Overnight": "",
    //         "Guests": "",
    //         "Guests Range": "",
    //         "Day Trip Price": "",
    //         "Overnight Price": "",
    //         "Daytrip Price (Euro)": "",
    //         "Daytrip Price (THB)": "",
    //         "Daytrip Price (USD)": "",
    //         "Primary Image": null as unknown as File,
    //         "Gallery Images": [] as File[],
    //         "Price": "",
    //         "Trip Details": "",
    //         "Day Charter": "",
    //         "Overnight Charter": "",
    //         "Passengers": "",
    //         "Weight": "",
    //         "Mileage": "",
    //         "Mileage is": "",
    //         "Exterior Color": "",
    //         "Exterior Color 2": "",
    //         "Color Description": "",
    //         "Interior Color": "",
    //         "Tag #": "",
    //         "Decal #": "",
    //         "GPS Serial #": "",
    //         "Title Application #": "",
    //         "Title ID?": false,
    //         "State Title In": "",
    //         "Title #": "",
    //         "Title Date": "",
    //         "Country": "",
    //         "Inspected": false,
    //         "Inspection #": "",
    //         "Inspection Date": "",
    //         "Inspection by": "",
    //         "Warranty": "",
    //         "Device has Starter Interrupt": false,
    //         "Ignition key code": "",
    //         "Door key code": "",
    //         "Valet key code": "",
    //         "Select Feature": "",
    //         "Features Added": [],
    //         "isExistingVendor": false,
    //         "sortOption": "New",
    //         "Vehicle Source": "",
    //         "Name": "",
    //         "Street": "",
    //         "ZIP": "",
    //         "City": "",
    //         "State": "",
    //         "Primary Contact Number": "",
    //         "Contact Person": "",
    //         "Alternate Contact Number": "",
    //         "Email": "",
    //         "Account Number": "",
    //         "Tax ID or SSN": "",
    //         "Notes": "",
    //         "Bill of Sales": null as unknown as File,
            
    //     },
    //     validationSchema: yachtsvalidationSchema,
    //     onSubmit: async (values, { setSubmitting }) => {
    //         try {
    //             const errors = await formik.validateForm();
    //             if (Object.keys(errors).length > 0) {
    //                 formik.setTouched({
    //                     "Vehicle Title": true,
    //                     "VIN": true,
    //                     "Make": true,
    //                     "Model": true,
    //                     "Style": true,
    //                     "Body Type": true,
    //                     "Manufacturing Year": true,
    //                     "Vehicle Type": true,
    //                     "Condition": true,
    //                     "Certified": true,
    //                     "Transmission": true,
    //                     "Tran Speed": true,
    //                     "Drivetrain": true,
    //                     "Engine Cylinders": true,
    //                     "Engine Size": true,
    //                     "Fuel Type": true,
    //                     "MPG Combined": true,
    //                     "MPG City": true,
    //                     "MPG Highway": true,
    //                     "Tow Capacity": true,
    //                     "Passengers": true,
    //                     "Weight": true,
    //                     "Mileage": true,
    //                     "Mileage is": true,
    //                     "Exterior Color": true,
    //                     "Exterior Color 2": true,
    //                     "Color Description": true,
    //                     "Interior Color": true,
    //                     "Tag #": true,
    //                     "Decal #": true,
    //                     "GPS Serial #": true,
    //                     "Title Application #": true,
    //                     "State Title In": true,
    //                     "Title #": true,
    //                     "Title Date": true,
    //                     "Country": true,
    //                     "Inspection #": true,
    //                     "Inspection Date": true,
    //                     "Inspection by": true,
    //                     "Warranty": true,
    //                     "Device has Starter Interrupt": true,
    //                     "Ignition key code": true,
    //                     "Door key code": true,
    //                     "Valet key code": true,
    //                     "Select Feature": true,
    //                     "Vehicle Source": true,
    //                     "Name": true,
    //                     "Street": true,
    //                     "ZIP": true,
    //                     "City": true,
    //                     "State": true,
    //                     "Primary Contact Number": true,
    //                     "Contact Person": true,
    //                     "Alternate Contact Number": true,
    //                     "Email": true,
    //                     "Account Number": true,
    //                     "Tax ID or SSN": true,
    //                     "Notes": true,
    //                     "Bill of Sales": true,
    //                     "Featured Image": {},
    //                     "Other Images": true,
    //                 });
    //                 setSubmitting(false);
    //                 return;
    //             }
    //             const resultAction = await dispatch(addVehicleInfo({
    //                 basicDetails: {
    //                     vehicleTitle: values["Vehicle Title"],
    //                     vin: values["VIN"],
    //                     make: values["Make"],
    //                     model: values["Model"],
    //                     style: values["Style"],
    //                     bodyType: values["Body Type"],
    //                     manufacturingYear: values["Manufacturing Year"],
    //                     vehicleType: values["Vehicle Type"],
    //                     condition: values["Condition"],
    //                     certified: values["Certified"],
    //                 },
    //                 specifications: {
    //                     transmission: values["Transmission"],
    //                     tranSpeed: values["Tran Speed"],
    //                     drivetrain: values["Drivetrain"],
    //                     engineCylinders: values["Engine Cylinders"],
    //                     engineSize: values["Engine Size"],
    //                     fuelType: values["Fuel Type"],
    //                     mpgCombined: values["MPG Combined"],
    //                     mpgCity: values["MPG City"],
    //                     mpgHighway: values["MPG Highway"],
    //                     towCapacity: values["Tow Capacity"],
    //                     passengers: values["Passengers"],
    //                     weight: values["Weight"],
    //                     mileage: values["Mileage"],
    //                     mileageIs: values["Mileage is"],
    //                 },
    //                 exteriorInterior: {
    //                     exteriorColor: values["Exterior Color"],
    //                     exteriorColor2: values["Exterior Color 2"],
    //                     colorDescription: values["Color Description"],
    //                     interiorColor: values["Interior Color"],
    //                     tag: values["Tag #"],
    //                     decal: values["Decal #"],
    //                     gpsSerial: values["GPS Serial #"],
    //                 },
    //                 titleRegistration: {
    //                     titleApplication: values["Title Application #"],
    //                     titleIn: values["Title ID?"],
    //                     stateTitleIn: values["State Title In"],
    //                     title: values["Title #"],
    //                     titleDate: values["Title Date"],
    //                     country: values["Country"],
    //                 },
    //                 inspection: {
    //                     inspected: values["Inspected"],
    //                     inspectionNumber: values["Inspection #"],
    //                     inspectionDate: values["Inspection Date"],
    //                     inspectedBy: values["Inspection by"],
    //                     warranty: values["Warranty"],
    //                     deviceHasStarterInterrupt: values["Device has Starter Interrupt"],
    //                 },
    //                 keySecurity: {
    //                     ignitionKeyCode: values["Ignition key code"],
    //                     doorKeyCode: values["Door key code"],
    //                     valetKeyCode: values["Valet key code"],
    //                 },
    //                 features: values["Features Added"] || [],
    //                 vendorInfo: {
    //                     isExistingVendor: values["Vehicle Source"] === "Existing Vendor",
    //                     category: values["Vehicle Source"],
    //                     name: values["Name"],
    //                     street: values["Street"],
    //                     zip: values["ZIP"],
    //                     city: values["City"],
    //                     state: values["State"],
    //                     primaryContactNumber: values["Primary Contact Number"],
    //                     contactPerson: values["Contact Person"],
    //                     alternativeContactNumber: values["Alternate Contact Number"],
    //                     email: values["Email"],
    //                     accountNumber: values["Account Number"],
    //                     taxIdOrSSN: values["Tax ID or SSN"],
    //                     notes: values["Notes"],
    //                 },
    //                 billofsales: values["Bill of Sales"] as File,
    //                 featuredImage: values["Featured Image"] as File,
    //                 otherImages: values["Other Images"] as File[],
    //             }));
    //             if (addVehicleInfo.fulfilled.match(resultAction)) {
    //                 toast.success("Vehicle GeneralInfo Register successfully");
    //                 setActiveIndex(1);
    //                 formik.resetForm();
    //             } else if (addVehicleInfo.rejected.match(resultAction)) {
    //                 const errorPayload = resultAction.payload as { error: { message: string } };
    //                 toast.error(errorPayload?.error?.message || "Something went wrong.");
    //             }
    //         } catch (error) {
    //             console.error(error);
    //             toast.error("An unexpected error occurred");
    //         } finally {
    //             setSubmitting(false);
    //         }
    //     }
    // });

    return (
        <div>
            {NewYachtsData.map((section, sectionIndex) => {
                return (
                    <div key={sectionIndex}>
                        {section.section && (
                            <h2 className={`font-bold mb-2 ${sectionIndex === 0 ? '' : 'mt-4'} ${sectionIndex !== 1 ? 'text-[#001B48] text-[24px] pb-2 border-b border-[#CCCCCC]' : 'text-[#222222]'}`}>
                                {section.section}
                            </h2>
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                            {section.fields.map((field, index) => {
                                const value = values[field.label] || "";
                                const isDropdown = field.type === "dropdown";
                                const isFileUpload = field.label === "Primary Image";
                                const isNotes = field.label === "Description";
                                const isCheckbox = field.type === "checkbox";
                                if (isCheckbox) {
                                    return (
                                        <div key={index} className="flex items-center gap-2 col-span-4">
                                            <input
                                                type="checkbox"
                                                checked={!!values[field.label]}
                                                onChange={(e) => handleChange(field.label, e.target.checked)}
                                                className="w-4 h-4 cursor-pointer"
                                            />
                                            <label className="block font-semibold text-[#222222]">
                                                {field.label}
                                            </label>
                                        </div>
                                    );
                                }
                                return (
                                    <div key={index} className={`${isFileUpload || isNotes
                                        ? "col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-2 xl:col-span-4"
                                        : "col-span-1 sm:col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1"
                                        }`}>
                                        <div className="flex items-center gap-1 mb-2">
                                            <label className="block font-bold text-[#222222]">
                                                {field.label}
                                            </label>
                                            {field.required && <span className="text-red-500">*</span>}
                                        </div>

                                        {isDropdown ? (
                                            <div className="bg-[#F0F2F4] rounded-lg px-3 py-2 w-full">
                                                <select
                                                    className={`w-full outline-0 cursor-pointer ${value ? 'text-[#222222]' : 'text-[#999999]'}`}
                                                    value={value as string}
                                                    onChange={(e) => handleChange(field.label, e.target.value)}
                                                >
                                                    <option value="" disabled hidden>{field.placeholder}</option>
                                                    {field.options?.map((option) => (
                                                        <option key={option} value={option} className="text-[#222222] outline-0 pt-4">
                                                            {option}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        ) : isNotes ? (
                                            <textarea
                                                placeholder={field.placeholder}
                                                value={value as string}
                                                onChange={(e) => handleChange(field.label, e.target.value)}
                                                rows={3}
                                                className="bg-[#F0F2F4] rounded-lg px-3 py-2 w-full text-[#222222] placeholder:text-[#999999] outline-none"
                                            />
                                        ) : isFileUpload ? (
                                            <div className="border border-dashed border-[#C4C4C4] bg-white rounded-md py-12 px-4 text-center w-full">
                                                <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} className="text-[#B3B3B3] font-normal text-[14px] flex flex-col items-center cursor-pointer">
                                                    <input
                                                        type="file"
                                                        accept="image/png, image/jpeg"
                                                        multiple
                                                        onChange={handleFileSelect}
                                                        className="hidden"
                                                        id="generalinfo-upload"
                                                    />
                                                    <label htmlFor="generalinfo-upload" className="cursor-pointer block">
                                                        <div className="flex items-center gap-1">
                                                            <Image src="/images/Inventory/file_upload.svg" alt="upload" width={20} height={20} />
                                                            <p>Drop file to attach or <span className="text-[#0080A7] underline">browser</span></p>
                                                        </div>
                                                        <p>JPEG, PNG, PDF (Max size 10MB)</p>
                                                    </label>
                                                    {files.length > 0 && (
                                                        <div className="mt-4 grid grid-cols-3 gap-4">
                                                            {files.map((item, index) => (
                                                                <div key={index} className="relative w-[100px] h-[100px]">
                                                                    <Image
                                                                        src={item.preview as string}
                                                                        alt={`upload-${index}`}
                                                                        width={100}
                                                                        height={100}
                                                                        className="w-[100px] h-[100px] object-cover rounded-lg"
                                                                    />
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleRemoveImage(index)}
                                                                        className="absolute top-1 right-1 border border-[#CCCCCC] cursor-pointer rounded-md p-1 shadow-lg"
                                                                    >
                                                                        <MdDeleteOutline className="text-[#DB2828] hover:text-[#0080A7] text-md" />
                                                                    </button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <input
                                                type="text"
                                                placeholder={field.placeholder}
                                                value={value as string}
                                                onChange={(e) => handleChange(field.label, e.target.value)}
                                                className="placeholder:text-[#999999] outline-none text-[#222222] w-full bg-[#F0F2F4] rounded-lg px-3 py-2"
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )
            })}
            {RichTextEditorSections.map((section) => (
                <div key={section.id} className="mt-4 grid lg:grid-cols-2 gap-2">
                    <p className="font-bold text-[#222222]">
                        {section.label}
                    </p>
                    <div className="w-full">
                        <RichTextEditor
                            content={richTextContent[section.id] || ""}
                            onChange={(content: string) => handleRichTextChange(section.id, content)}
                        />
                    </div>
                </div>
            ))}
            {YachtsData.map((section, sectionIndex) => {
                return (
                    <div key={sectionIndex} className="mt-4">
                        {section.section && (
                            <h2 className={`font-bold mb-2 text-[#001B48] text-[24px] pb-2 border-b border-[#CCCCCC]`}>
                                {section.section}
                            </h2>
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                            {section.fields.map((field, index) => {
                                const value = values[field.label] || "";
                                return (
                                    <div key={index}>
                                        <label className="block font-bold text-[#222222] mb-2">
                                            {field.label}
                                        </label>
                                        <input
                                            type="text"
                                            placeholder={field.placeholder}
                                            value={value as string}
                                            onChange={(e) => handleChange(field.label, e.target.value)}
                                            className="placeholder:text-[#999999] outline-none text-[#222222] w-full bg-[#F0F2F4] rounded-lg px-3 py-2"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )
            })}
            <div className="mt-6 flex justify-end">
                <button onClick={() => router.push("/yachts")} className="rounded-full px-[16px] py-[8px] bg-[#001B48] hover:bg-[#222222] text-white flex items-center justify-center cursor-pointer font-medium">
                    Save and Continue
                </button>
            </div>
        </div>
    )
}

export default AddNewYachts;