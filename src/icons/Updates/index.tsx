"use client";

import React from "react";

interface Props {
    width?: string;
    height?: string;
}

const Updates: React.FC<Props> = ({ width = "19", height = "19" }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 19 19" fill="none">
            <path d="M8.5 5.14551V10.1455L12.75 12.6655L13.52 11.3855L10 9.29551V5.14551H8.5ZM18.5 7.14551V0.145508L15.86 2.78551C14.24 1.15551 11.99 0.145508 9.5 0.145508C4.53 0.145508 0.5 4.17551 0.5 9.14551C0.5 14.1155 4.53 18.1455 9.5 18.1455C14.47 18.1455 18.5 14.1155 18.5 9.14551H16.5C16.5 13.0055 13.36 16.1455 9.5 16.1455C5.64 16.1455 2.5 13.0055 2.5 9.14551C2.5 5.28551 5.64 2.14551 9.5 2.14551C11.43 2.14551 13.18 2.93551 14.45 4.19551L11.5 7.14551H18.5Z" fill="currentColor" />
        </svg>
    );
};

export default Updates;