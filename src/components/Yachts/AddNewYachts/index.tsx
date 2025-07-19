"use client";

import {
  NewYachtsData,
  RichTextEditorSections,
  YachtsData,
} from "@/data/Yachts";
import { MdDeleteOutline } from "react-icons/md";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/lib/Store/store";
import { toast, ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import "react-toastify/dist/ReactToastify.css";
import { addYachts } from "@/lib/Features/Yachts/addyachtsSlice";
import {
  yachtsvalidationSchema,
  FormYachtsValues,
} from "@/lib/Validation/addyachtsValidationSchema";
import RichTextEditor from "./RichTextEditorOne";

type RichTextFieldKey =
  | "Price"
  | "Trip Details"
  | "Day Charter"
  | "Overnight Charter"
  | "About this Boat"
  | "Specifications"
  | "Boat Layout";

const AddNewYachts: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const loading = useSelector((state: RootState) => state.yachts.addLoading);


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      formik.setFieldValue("Primary Image", files[0]);
    }
  };

  const handleDelete = () => {
    formik.setFieldValue("Primary Image", null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const existingFiles = Array.isArray(formik.values["Gallery Images"])
        ? formik.values["Gallery Images"]
        : [];
      formik.setFieldValue("Gallery Images", [
        ...existingFiles,
        ...Array.from(files),
      ]);
      formik.setFieldTouched("Gallery Images", true, false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const existingFiles = Array.isArray(formik.values["Gallery Images"])
        ? formik.values["Gallery Images"]
        : [];
      formik.setFieldValue("Gallery Images", [
        ...existingFiles,
        ...Array.from(files),
      ]);
      formik.setFieldTouched("Gallery Images", true, false);
    }
  };

  const handleRemoveImage = (index: number) => {
    const files = Array.isArray(formik.values["Gallery Images"])
      ? [...formik.values["Gallery Images"]]
      : [];
    files.splice(index, 1);
    formik.setFieldValue("Gallery Images", files);
  };

  const formik = useFormik<FormYachtsValues>({
    initialValues: {
      "Boat Type": "",
      Title: "",
      Category: "",
      Capacity: "",
      Length: "",
      "Length Range": "",
      Cabins: "",
      Bathrooms: "",
      "Passenger Day Trip": "",
      "Passenger Overnight": "",
      Guests: "",
      "Guests Range": "",
      "Day Trip Price": "",
      "Overnight Price": "",
      "Daytrip Price (Euro)": "",
      "Daytrip Price (THB)": "",
      "Daytrip Price (USD)": "",
      "Primary Image": null as unknown as File,
      "Gallery Images": [] as File[],
      Price: "",
      "Trip Details": "",
      "Day Charter": "",
      "Overnight Charter": "",
      "About this Boat": "",
      Specifications: "",
      "Boat Layout": "",
      "Video Link": "",
      "Video Link 2": "",
      "Video Link 3": "",
      Badge: "",
      Design: "",
      Built: "",
      "Cruising Speed": "",
      "Length Overall": "",
      "Fuel Capacity": "",
      "Water Capacity": "",
      Code: "",
    },
    validationSchema: yachtsvalidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const errors = await formik.validateForm();
        if (Object.keys(errors).length > 0) {
          formik.setTouched({
            "Boat Type": true,
            Category: true,
            Capacity: true,
            Length: true,
            "Length Range": true,
            Title: true,
            Cabins: true,
            Bathrooms: true,
            "Passenger Day Trip": true,
            "Passenger Overnight": true,
            Guests: true,
            "Guests Range": true,
            "Day Trip Price": true,
            "Overnight Price": true,
            "Daytrip Price (Euro)": true,
            "Daytrip Price (THB)": true,
            "Daytrip Price (USD)": true,
            "Primary Image": {},
            "Gallery Images": true,
            Price: true,
            "Trip Details": true,
            "Day Charter": true,
            "Overnight Charter": true,
            "About this Boat": true,
            Specifications: true,
            "Boat Layout": true,
            "Video Link": true,
            "Video Link 2": true,
            "Video Link 3": true,
            Badge: true,
            Design: true,
            Built: true,
            "Cruising Speed": true,
            "Length Overall": true,
            "Fuel Capacity": true,
            "Water Capacity": true,
            Code: true,
          });
          setSubmitting(false);
          return;
        }
        const resultAction = await dispatch(
          addYachts({
            boatType: values["Boat Type"] ?? "",
            price: values["Category"] ?? "",
            capacity: values["Capacity"] ?? "",
            length: values["Length"] ?? "",
            lengthRange: values["Length Range"] ?? "",
            title: values["Title"] ?? "",
            cabins: values["Cabins"],
            bathrooms: values["Bathrooms"],
            passengerDayTrip: values["Passenger Day Trip"],
            passengerOvernight: values["Passenger Overnight"],
            guests: values["Guests"],
            guestsRange: values["Guests Range"],
            dayTripPrice: values["Day Trip Price"],
            overnightPrice: values["Overnight Price"],
            daytripPriceEuro: values["Daytrip Price (Euro)"],
            daytripPriceTHB: values["Daytrip Price (THB)"],
            daytripPriceUSD: values["Daytrip Price (USD)"],
            primaryImage: values["Primary Image"] as File,
            galleryImages: values["Gallery Images"] as File[],
            priceEditor: values["Price"] ?? "",
            tripDetailsEditor: values["Trip Details"] ?? "",
            dayCharter: values["Day Charter"] ?? "",
            overnightCharter: values["Overnight Charter"] ?? "",
            aboutThisBoat: values["About this Boat"] ?? "",
            specifications: values["Specifications"] ?? "",
            boatLayout: values["Boat Layout"] ?? "",
            videoLink: values["Video Link"],
            videoLink2: values["Video Link 2"] ?? "",
            videoLink3: values["Video Link 3"] ?? "",
            badge: values["Badge"] ?? "",
            design: values["Design"],
            built: values["Built"],
            cruisingSpeed: values["Cruising Speed"],
            lengthOverall: values["Length Overall"],
            fuelCapacity: values["Fuel Capacity"],
            waterCapacity: values["Water Capacity"],
            code: values["Code"] ?? "",
          })
        );
        if (addYachts.fulfilled.match(resultAction)) {
          toast.success("Yachts Register successfully", {
            onClose: () => {
              router.push("/yachts");
            },
          });
          formik.resetForm();
        } else if (addYachts.rejected.match(resultAction)) {
          const errorPayload = resultAction.payload as {
            error: { message: string };
          };
          toast.error(errorPayload?.error?.message || "Something went wrong.");
        }
      } catch (error) {
        console.error(error);
        toast.error("An unexpected error occurred");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const getFieldError = (fieldName: keyof FormYachtsValues) => {
    return formik.touched[fieldName] && formik.errors[fieldName];
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        {NewYachtsData.map((section, sectionIndex) => {
          return (
            <div key={sectionIndex}>
              {section.section && (
                <h2
                  className={`font-bold mb-2 ${
                    sectionIndex === 0 ? "" : "mt-4"
                  } ${
                    sectionIndex !== 1
                      ? "text-[#001B48] text-[24px] pb-2 border-b border-[#CCCCCC]"
                      : "text-[#222222]"
                  }`}
                >
                  {section.section}
                </h2>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                {section.fields.map((field, index) => {
                  const value =
                    formik.values[field.label as keyof typeof formik.values] ??
                    "";
                  const isDropdown = field.type === "dropdown";
                  const isPrimaryUpload = field.label === "Primary Image";
                  const isFileUpload = field.label === "Gallery Images";
                  const isCheckbox = field.type === "checkbox";
                  const fieldName = field.label as keyof FormYachtsValues;
                  const fieldError = getFieldError(fieldName);
                  if (isCheckbox) {
                    return (
                      <div
                        key={index}
                        className="col-span-1 sm:col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-4"
                      >
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="Length Range"
                            value={field.label}
                            checked={
                              formik.values["Length Range"] === field.label
                            }
                            onChange={(e) => {
                              formik.setFieldValue(
                                "Length Range",
                                e.target.value
                              );
                              formik.setFieldTouched(
                                "Length Range",
                                true,
                                false
                              );
                            }}
                            onBlur={formik.handleBlur}
                            className="peer hidden"
                          />
                          <div className="w-4 h-4 cursor-pointer rounded-full border border-[#828282] bg-white flex items-center justify-center peer-checked:border-[#001B48] peer-checked:bg-[#001B48]">
                            {formik.values["Length Range"] === field.label && (
                              <div className="w-2 h-2 rounded-full bg-white"></div>
                            )}
                          </div>
                          <label className="block font-semibold text-[#222222] cursor-pointer">
                            {field.label}
                          </label>
                        </label>
                        {index ===
                          section.fields.filter((f) => f.type === "checkbox")
                            .length -
                            1 &&
                          getFieldError(
                            "Length Range" as keyof FormYachtsValues
                          ) && (
                            <p className="text-[#DB2828] text-sm mt-1">
                              {typeof formik.errors["Length Range"] ===
                                "string" && formik.errors["Length Range"]}
                            </p>
                          )}
                      </div>
                    );
                  }
                  return (
                    <div
                      key={index}
                      className={`${
                        isFileUpload
                          ? "col-span-1 sm:col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-4"
                          : "col-span-1 sm:col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1"
                      }`}
                    >
                      <div className="flex items-center gap-1 mb-2">
                        <label className="block font-bold text-[#222222]">
                          {field.label}
                        </label>
                        {field.required && (
                          <span className="text-red-500">*</span>
                        )}
                      </div>

                      {isDropdown ? (
                        <>
                          <div
                            className={`bg-[#F0F2F4] rounded-lg px-3 py-2 w-full ${
                              fieldError ? "border border-[#DB2828]" : ""
                            }`}
                          >
                            <select
                              name={fieldName}
                              value={formik.values[fieldName] as string}
                              onChange={(e) => {
                                formik.handleChange(e);
                                formik.setFieldTouched(fieldName, true, false);
                              }}
                              onBlur={formik.handleBlur}
                              className={`w-full outline-0 cursor-pointer ${
                                value ? "text-[#222222]" : "text-[#999999]"
                              }`}
                            >
                              <option value="" disabled hidden>
                                {field.placeholder}
                              </option>
                              {field.options?.map((option) => (
                                <option
                                  key={option}
                                  value={option}
                                  className="text-[#222222] outline-0 pt-4"
                                >
                                  {option}
                                </option>
                              ))}
                            </select>
                          </div>
                          {fieldError && (
                            <p className="text-[#DB2828] text-sm mt-1">
                              {typeof formik.errors[fieldName] === "string" &&
                                formik.errors[fieldName]}
                            </p>
                          )}
                        </>
                      ) : isPrimaryUpload ? (
                        <>
                          <div
                            className={`text-[#222222] w-full bg-[#F0F2F4] rounded-lg px-3 py-2  ${
                              fieldError ? "border border-[#DB2828]" : ""
                            }`}
                          >
                            {!formik.values["Primary Image"] ? (
                              <input
                                type="file"
                                name="Primary Image"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="cursor-pointer"
                              />
                            ) : (
                              <>
                                <div className="flex items-center justify-between">
                                  <p className="text-[#222222] font-medium">
                                    {(() => {
                                      const file = formik.values[
                                        "Primary Image"
                                      ] as File;
                                      if (!file) return "No file selected";
                                      const name = file.name;
                                      const extMatch = name.match(/\.[^/.]+$/);
                                      const ext = extMatch ? extMatch[0] : "";
                                      const firstWord = name
                                        .replace(/\.[^/.]+$/, "")
                                        .split(/[ .]/)[0]
                                        .slice(0, 5);
                                      return `${firstWord}${ext}`;
                                    })()}
                                  </p>
                                  <MdDeleteOutline
                                    className="cursor-pointer text-red-500"
                                    onClick={handleDelete}
                                  />
                                </div>
                              </>
                            )}
                          </div>
                          {fieldError && (
                            <p className="text-[#DB2828] text-sm mt-1">
                              {typeof formik.errors[fieldName] === "string" &&
                                formik.errors[fieldName]}
                            </p>
                          )}
                        </>
                      ) : isFileUpload ? (
                        <>
                          <div
                            className={`border border-dashed border-[#C4C4C4] bg-white rounded-md py-12 px-4 text-center w-full  ${
                              fieldError ? "border border-[#DB2828]" : ""
                            }`}
                          >
                            <div
                              onDrop={handleDrop}
                              onDragOver={(e) => e.preventDefault()}
                              onBlur={() =>
                                formik.setFieldTouched(
                                  "Gallery Images",
                                  true,
                                  false
                                )
                              }
                              className="text-[#B3B3B3] font-normal text-[14px] flex flex-col items-center cursor-pointer"
                            >
                              <input
                                type="file"
                                name="Gallery Images"
                                accept="image/png, image/jpeg"
                                multiple
                                onChange={handleFileUpload}
                                onBlur={() =>
                                  formik.setFieldTouched(
                                    "Gallery Images",
                                    true,
                                    false
                                  )
                                }
                                className="hidden"
                                id="generalinfo-upload"
                              />
                              <label
                                htmlFor="generalinfo-upload"
                                className="cursor-pointer block"
                                onClick={() =>
                                  formik.setFieldTouched(
                                    "Gallery Images",
                                    true,
                                    false
                                  )
                                }
                              >
                                <div className="flex items-center gap-1">
                                  <Image
                                    src="/images/Inventory/file_upload.svg"
                                    alt="upload"
                                    width={20}
                                    height={20}
                                  />
                                  <p>
                                    Drop file to attach or{" "}
                                    <span className="text-[#0080A7] underline">
                                      browser
                                    </span>
                                  </p>
                                </div>
                                <p>JPEG, PNG, PDF (Max size 10MB)</p>
                              </label>
                              {Array.isArray(formik.values["Gallery Images"]) &&
                                formik.values["Gallery Images"].length > 0 && (
                                  <div className="mt-4 grid grid-cols-3 gap-4">
                                    {formik.values["Gallery Images"].map(
                                      (
                                        file: File | undefined,
                                        index: number
                                      ) => {
                                        if (!file) return null;
                                        return (
                                          <div
                                            key={index}
                                            className="relative w-[100px] h-[100px]"
                                          >
                                            <Image
                                              src={URL.createObjectURL(file)}
                                              alt={`upload-${index}`}
                                              width={100}
                                              height={100}
                                              className="w-[100px] h-[100px] object-cover rounded-lg"
                                            />
                                            <button
                                              type="button"
                                              onClick={() =>
                                                handleRemoveImage(index)
                                              }
                                              className="absolute top-1 right-1 border border-[#CCCCCC] cursor-pointer rounded-md p-1 shadow-lg"
                                            >
                                              <MdDeleteOutline className="text-[#DB2828] hover:text-[#0080A7] text-md" />
                                            </button>
                                          </div>
                                        );
                                      }
                                    )}
                                  </div>
                                )}
                            </div>
                          </div>
                          {fieldError && (
                            <p className="text-[#DB2828] text-sm mt-1">
                              {typeof formik.errors[fieldName] === "string" &&
                                formik.errors[fieldName]}
                            </p>
                          )}
                        </>
                      ) : (
                        <>
                          <input
                            type="text"
                            name={fieldName}
                            placeholder={field.placeholder}
                            value={formik.values[fieldName] as string}
                            onChange={(e) => {
                              formik.handleChange(e);
                              formik.setFieldTouched(fieldName, true, false);
                            }}
                            onBlur={formik.handleBlur}
                            className={`placeholder:text-[#999999] outline-none text-[#222222] w-full bg-[#F0F2F4] rounded-lg px-3 py-2  ${
                              fieldError ? "border border-[#DB2828]" : ""
                            }`}
                          />
                          {fieldError && (
                            <p className="text-[#DB2828] text-sm mt-1">
                              {typeof formik.errors[fieldName] === "string" &&
                                formik.errors[fieldName]}
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        {RichTextEditorSections.map((section) => {
          return (
            <div key={section.id} className="mt-4 grid lg:grid-cols-2 gap-2">
              <p className="font-bold text-[#222222]">{section.label}</p>
              <div className="w-full">
                <RichTextEditor
                  value={formik.values[section.label as RichTextFieldKey] ?? ""}
                  onChange={(html) => formik.setFieldValue(section.label, html)}
                />
              </div>
            </div>
          );
        })}
        {YachtsData.map((section, sectionIndex) => {
          return (
            <div key={sectionIndex} className="mt-4">
              {section.section && (
                <h2
                  className={`font-bold mb-2 text-[#001B48] text-[24px] pb-2 border-b border-[#CCCCCC]`}
                >
                  {section.section}
                </h2>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                {section.fields.map((field, index) => {
                  const fieldName = field.label as keyof FormYachtsValues;
                  const fieldError = getFieldError(fieldName);
                  return (
                    <div key={index}>
                      <label className="block font-bold text-[#222222] mb-2">
                        {field.label}
                      </label>
                      <div>
                        <input
                          type="text"
                          name={fieldName}
                          placeholder={field.placeholder}
                          value={formik.values[fieldName] as string}
                          onChange={(e) => {
                            formik.handleChange(e);
                            formik.setFieldTouched(fieldName, true, false);
                          }}
                          onBlur={formik.handleBlur}
                          className={`placeholder:text-[#999999] outline-none text-[#222222] w-full bg-[#F0F2F4] rounded-lg px-3 py-2  ${
                            fieldError ? "border border-[#DB2828]" : ""
                          }`}
                        />
                        {fieldError && (
                          <p className="text-[#DB2828] text-sm mt-1">
                            {typeof formik.errors[fieldName] === "string" &&
                              formik.errors[fieldName]}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`rounded-full px-[16px] py-[8px] bg-[#001B48] hover:bg-[#222222] text-white flex items-center justify-center font-medium ${
              loading ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {loading ? "Save ..." : "Save and Continue"}
          </button>
        </div>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default AddNewYachts;
