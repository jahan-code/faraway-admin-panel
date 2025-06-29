"use client";
import React from "react";

interface Props {
    width?: string;
    height?: string;
}

const User: React.FC<Props> = ({ width = "16", height = "21" }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 16 21" fill="none">
            <path d="M1 19.5C1 15.634 4.13401 12.5 8 12.5C11.866 12.5 15 15.634 15 19.5M12 5.5C12 7.70914 10.2091 9.5 8 9.5C5.79086 9.5 4 7.70914 4 5.5C4 3.29086 5.79086 1.5 8 1.5C10.2091 1.5 12 3.29086 12 5.5Z" stroke="#005292" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

export default User;