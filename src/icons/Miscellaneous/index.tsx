"use client";

import React from "react";

interface Props {
    width?: string;
    height?: string;
}

const Miscellaneous: React.FC<Props> = ({ width = "19", height = "19" }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 19 17" fill="none">
            <path d="M19 14.6455H0V16.6455H19V14.6455ZM17 6.64551V10.6455H2V6.64551H17ZM18 4.64551H1C0.45 4.64551 0 5.09551 0 5.64551V11.6455C0 12.1955 0.45 12.6455 1 12.6455H18C18.55 12.6455 19 12.1955 19 11.6455V5.64551C19 5.09551 18.55 4.64551 18 4.64551ZM19 0.645508H0V2.64551H19V0.645508Z" fill="currentColor" />
        </svg>
    );
};

export default Miscellaneous;