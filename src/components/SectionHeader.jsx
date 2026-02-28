import React from 'react';

export default function SectionHeader({ title, children, className = "" }) {
    return (
        <div className={`flex justify-between items-center mb-4 ${className}`}>
            <h2 className="section-title m-0">{title}</h2>
            {children}
        </div>
    );
}
