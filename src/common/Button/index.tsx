import React, { ReactNode, ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  className?: string;
}

const Button: React.FC<Props> = ({
  children,
  type = "button",
  className = "",
  ...rest
}) => {
  return (
    <button
      type={type}
      className={`bg-[#001B48] h-[42px] 2xl:h-[51px] 3xl:h-[51px] cursor-pointer rounded-lg 3xl:rounded-lg w-full text-white capitalize text-base 2xl:text-[19px] 3xl:text-[19px] font-extrabold font-plusjakarta flex justify-center items-center ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
