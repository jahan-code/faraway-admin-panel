"use client";

import React from "react";

interface Props {
    width?: string;
    height?: string;
}

const Stock: React.FC<Props> = ({ width = "27", height = "28" }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 27 28" fill="none">
            <path d="M2.83317 6.00033H0.166504V24.667C0.166504 26.1337 1.3665 27.3337 2.83317 27.3337H21.4998V24.667H2.83317V6.00033ZM24.1665 0.666992H8.1665C6.69984 0.666992 5.49984 1.86699 5.49984 3.33366V19.3337C5.49984 20.8003 6.69984 22.0003 8.1665 22.0003H24.1665C25.6332 22.0003 26.8332 20.8003 26.8332 19.3337V3.33366C26.8332 1.86699 25.6332 0.666992 24.1665 0.666992ZM24.1665 19.3337H8.1665V3.33366H24.1665V19.3337ZM14.8332 16.667H17.4998V12.667H21.4998V10.0003H17.4998V6.00033H14.8332V10.0003H10.8332V12.667H14.8332V16.667Z" fill="#002733" />
        </svg>
    );
};

export default Stock;