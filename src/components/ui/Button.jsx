import { Link } from 'react-router-dom'

export default function Button({
    children,
    href,
    to,
    onClick,
    variant = 'primary',
    className = '',
    target,
    rel
}) {
    const baseClasses = "inline-flex items-center justify-center font-body transition-all duration-300 pointer-events-auto"

    let variantClasses = ""
    switch (variant) {
        case 'primary':
            variantClasses = "bg-gold hover:bg-gold-light text-[#0D0D0B] font-medium text-[0.62rem] uppercase tracking-[0.35em] px-10 py-4 rounded-[2px]"
            break
        case 'secondary':
            variantClasses = "bg-transparent border border-gold text-gold hover:bg-gold/10 font-medium text-[0.62rem] uppercase tracking-[0.35em] px-10 py-4 rounded-[2px]"
            break
        case 'text':
            variantClasses = "bg-transparent text-cream-dark hover:text-gold font-light text-[0.75rem] tracking-[0.1em] underline underline-offset-4"
            break
        default:
            variantClasses = "bg-gold hover:bg-gold-light text-[#0D0D0B] font-medium text-[0.62rem] uppercase tracking-[0.35em] px-10 py-4 rounded-[2px]"
    }

    const classes = `${baseClasses} ${variantClasses} ${className}`

    if (href) {
        return (
            <a href={href} className={classes} target={target} rel={rel}>
                {children}
            </a>
        )
    }

    if (to) {
        return (
            <Link to={to} className={classes} target={target} rel={rel}>
                {children}
            </Link>
        )
    }

    return (
        <button onClick={onClick} className={classes}>
            {children}
        </button>
    )
}
