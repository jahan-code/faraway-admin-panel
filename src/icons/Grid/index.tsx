"use client";

import React from "react";

export interface IconProps {
    width?: string;
    height?: string;
}

const Grid: React.FC<IconProps> = ({ width = "14", height = "18" }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 14 18" fill="none">
            <path d="M11.9997 2.33366V6.50033H1.99967V2.33366H11.9997ZM13.6663 0.666992H0.333008V8.16699H13.6663V0.666992ZM11.9997 11.5003V15.667H1.99967V11.5003H11.9997ZM13.6663 9.83366H0.333008V17.3337H13.6663V9.83366Z" fill="currentColor" />
        </svg>
    );
};

export default Grid;