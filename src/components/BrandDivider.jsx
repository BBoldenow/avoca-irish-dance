import React from 'react';

export default function BrandDivider() {
    return (
        <div className="flex items-center justify-center gap-4 my-10 opacity-70">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-accent" />
            <div className="w-1.5 h-1.5 bg-accent rotate-45" />
            <div className="w-[3px] h-[3px] border border-accent rotate-45 opacity-60" />
            <div className="w-1.5 h-1.5 bg-accent rotate-45" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-accent" />
        </div>
    );
}
