"use client";

import React from "react";

interface Props {
    width?: string;
    height?: string;
}

const Customers: React.FC<Props> = ({ width = "19", height = "19" }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 17 17"
            fill="none">
            <path d="M8.5 2.54551C9.66 2.54551 10.6 3.48551 10.6 4.64551C10.6 5.80551 9.66 6.74551 8.5 6.74551C7.34 6.74551 6.4 5.80551 6.4 4.64551C6.4 3.48551 7.34 2.54551 8.5 2.54551ZM8.5 11.5455C11.47 11.5455 14.6 13.0055 14.6 13.6455V14.7455H2.4V13.6455C2.4 13.0055 5.53 11.5455 8.5 11.5455ZM8.5 0.645508C6.29 0.645508 4.5 2.43551 4.5 4.64551C4.5 6.85551 6.29 8.64551 8.5 8.64551C10.71 8.64551 12.5 6.85551 12.5 4.64551C12.5 2.43551 10.71 0.645508 8.5 0.645508ZM8.5 9.64551C5.83 9.64551 0.5 10.9855 0.5 13.6455V16.6455H16.5V13.6455C16.5 10.9855 11.17 9.64551 8.5 9.64551Z" fill="currentColor" />
        </svg>
    );
};

export default Customers;