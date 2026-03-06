export default function DiamondDivider({ className = '' }) {
    // Determine justification: default to center if no justify class is provided
    const defaultJustify = className.includes('justify-') ? '' : 'justify-center'

    return (
        <div className={`flex items-center gap-4 ${defaultJustify} ${className}`} aria-hidden="true">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-gold opacity-50" />
            <div className="w-[5px] h-[5px] bg-gold rotate-45" />
            <div className="w-[3px] h-[3px] border border-gold rotate-45 opacity-60" />
            <div className="w-[5px] h-[5px] bg-gold rotate-45" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-gold opacity-50" />
        </div>
    )
}
