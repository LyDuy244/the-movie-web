import React from 'react';

const Button = ({ onClick, className, children, bgColor = 'primary', type = 'button', full = false }) => {
    let bgClassName = `bg-${bgColor}`
    switch (bgColor) {
        case "primary":
            bgClassName = `bg-primary`
            break;
        case "secondary":
            bgClassName = `bg-secondary`
            break;
        default:
            break;
    }
    return (
        <button
            type={type}
            onClick={onClick}
            className={`py-3 px-6 rounded-lg capitalize  ${full ? 'w-full' : 'w-auto'} mt-auto ${bgClassName} ${className}`}>
            {children}
        </button>

    );
};

export default Button;