"use client";

import React from "react";

interface Props {
    width?: string;
    height?: string;
}

const Accounting: React.FC<Props> = ({ width = "19", height = "19" }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 19 15" fill="none">
            <path d="M4.49 6.64551L0.5 10.6455L4.49 14.6455V11.6455H11.5V9.64551H4.49V6.64551ZM18.5 4.64551L14.51 0.645508V3.64551H7.5V5.64551H14.51V8.64551L18.5 4.64551Z" fill="currentColor" />
        </svg>
    );
};

export default Accounting;