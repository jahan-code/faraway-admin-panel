"use client";

import React from "react";

interface Props {
    width?: string;
    height?: string;
}

const Sales: React.FC<Props> = ({ width = "19", height = "19" }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 21 19" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M18.5 0.645508H2.5C1.4 0.645508 0.5 1.54551 0.5 2.64551V16.6455C0.5 17.7455 1.4 18.6455 2.5 18.6455H18.5C19.6 18.6455 20.5 17.7455 20.5 16.6455V2.64551C20.5 1.54551 19.6 0.645508 18.5 0.645508ZM18.5 16.6455H2.5V2.64551H18.5V16.6455Z" fill="currentColor" />
            <path fillRule="evenodd" clipRule="evenodd" d="M17.91 8.06551L16.49 6.64551L13.32 9.81551L11.91 8.39551L10.5 9.80551L13.32 12.6455L17.91 8.06551Z" fill="currentColor" />
            <path d="M8.5 4.64551H3.5V6.64551H8.5V4.64551Z" fill="currentColor" />
            <path d="M8.5 8.64551H3.5V10.6455H8.5V8.64551Z" fill="currentColor" />
            <path d="M8.5 12.6455H3.5V14.6455H8.5V12.6455Z" fill="currentColor" />
        </svg>
    );
};

export default Sales;