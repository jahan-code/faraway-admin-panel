import React from "react";
import Google from "@/icons/Google";

const GoogleButton: React.FC = () => {

  return (
    <button
      type="button"
      className="py-[12px] px-[17px] flex justify-center items-center gap-2 sm:gap-3 captilize cursor-pointer rounded-lg 2xl:rounded-[10px] 3xl:rounded-xl border border-text-[#6D6D6D] text-sm 2xl:text-[16px] 3xl:text-[16px] font-semibold text-[#012A50]"
    >
      <span className="3xl:hidden"><Google /></span>
      <span className="hidden 3xl:block"><Google width="24" height="24"/></span>
      Sign In with Google
    </button>
  );
};

export default GoogleButton;