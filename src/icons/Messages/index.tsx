"use client";

import React from "react";

interface Props {
    width?: string;
    height?: string;
}

const Messages: React.FC<Props> = ({ width = "19", height = "19" }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 21 21" fill="none">
            <path d="M2.5 2.14551H18.5V14.1455H3.67L2.5 15.3155V2.14551ZM2.5 0.145508C1.4 0.145508 0.51 1.04551 0.51 2.14551L0.5 20.1455L4.5 16.1455H18.5C19.6 16.1455 20.5 15.2455 20.5 14.1455V2.14551C20.5 1.04551 19.6 0.145508 18.5 0.145508H2.5ZM4.5 10.1455H16.5V12.1455H4.5V10.1455ZM4.5 7.14551H16.5V9.14551H4.5V7.14551ZM4.5 4.14551H16.5V6.14551H4.5V4.14551Z" fill="currentColor" />
        </svg>
    );
};

export default Messages;