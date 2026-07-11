import LiquidGlass from "../liquid/LiquidGlass";

export default function LiquidCard({
                                       children,
                                       className = "",
                                   }) {
    return (
        <LiquidGlass
            className={`
                p-7
                transition-all
                duration-500
                hover:-translate-y-1
                hover:shadow-[0_25px_70px_rgba(30,41,59,0.18)]
                ${className}
            `}
        >
            {children}
        </LiquidGlass>
    );
}