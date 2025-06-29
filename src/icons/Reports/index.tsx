"use client";

import React from "react";

interface Props {
    width?: string;
    height?: string;
}

const Reports: React.FC<Props> = ({ width = "19", height = "19" }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 21 23" fill="none">
            <path d="M5.5 2.64551H2.5V5.64551H0.5V0.645508H5.5V2.64551ZM20.5 5.64551V0.645508H15.5V2.64551H18.5V5.64551H20.5ZM5.5 20.6455H2.5V17.6455H0.5V22.6455H5.5V20.6455ZM18.5 17.6455V20.6455H15.5V22.6455H20.5V17.6455H18.5ZM15.5 5.64551H5.5V17.6455H15.5V5.64551ZM17.5 17.6455C17.5 18.7455 16.6 19.6455 15.5 19.6455H5.5C4.4 19.6455 3.5 18.7455 3.5 17.6455V5.64551C3.5 4.54551 4.4 3.64551 5.5 3.64551H15.5C16.6 3.64551 17.5 4.54551 17.5 5.64551V17.6455ZM13.5 7.64551H7.5V9.64551H13.5V7.64551ZM13.5 10.6455H7.5V12.6455H13.5V10.6455ZM13.5 13.6455H7.5V15.6455H13.5V13.6455Z" fill="currentColor" />
        </svg>

    );
};

export default Reports;