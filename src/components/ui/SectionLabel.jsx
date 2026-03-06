export default function SectionLabel({ children, className = '' }) {
    return (
        <p className={`font-body text-[0.58rem] leading-none uppercase tracking-[0.5em] text-gold ${className}`}>
            {children}
        </p>
    )
}
