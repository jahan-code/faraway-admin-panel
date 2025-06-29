"use client";

import React from "react";

interface Props {
    width?: string;
    height?: string;
}

const Export: React.FC<Props> = ({ width = "12", height = "12" }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 12 12" fill="none">
            <path d="M9.99984 8.00033V10.0003H1.99984V8.00033H0.666504V10.0003C0.666504 10.7337 1.2665 11.3337 1.99984 11.3337H9.99984C10.7332 11.3337 11.3332 10.7337 11.3332 10.0003V8.00033H9.99984ZM2.6665 4.00033L3.6065 4.94033L5.33317 3.22033V8.66699H6.6665V3.22033L8.39317 4.94033L9.33317 4.00033L5.99984 0.666992L2.6665 4.00033Z" fill="currentColor" />
        </svg>
    );
};

export default Export;