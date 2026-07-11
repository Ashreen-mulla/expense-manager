import { motion } from "framer-motion";

export default function StatCard({
                                     title,
                                     value,
                                     icon,
                                 }) {
    return (
        <motion.div
            whileHover={{
                y: -6,
                scale: 1.02,
            }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 22,
            }}
            className="
                relative
                overflow-hidden
                rounded-[30px]
                border
                border-white/30
                bg-white/15
                backdrop-blur-[30px]
                shadow-[0_20px_60px_rgba(15,23,42,.12)]
                p-6
            "
        >
            {/* Top highlight */}
            <div
                className="
                    absolute
                    inset-x-0
                    top-0
                    h-px
                    bg-gradient-to-r
                    from-transparent
                    via-white/90
                    to-transparent
                "
            />

            {/* Inner glow */}
            <div
                className="
                    absolute
                    inset-[1px]
                    rounded-[29px]
                    border
                    border-white/10
                    pointer-events-none
                "
            />

            {/* Liquid reflection */}
            <motion.div
                animate={{
                    x: ["-120%", "180%"],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="
                    absolute
                    top-0
                    left-0
                    h-full
                    w-24
                    rotate-12
                    bg-white/20
                    blur-2xl
                    pointer-events-none
                "
            />

            {/* Soft ambient glow */}
            <div
                className="
                    absolute
                    -top-16
                    -right-16
                    h-44
                    w-44
                    rounded-full
                    bg-cyan-300/20
                    blur-3xl
                    pointer-events-none
                "
            />

            <div className="relative z-10 flex justify-between items-center mb-6">

                <h3 className="font-medium tracking-wide text-slate-600">
                    {title}
                </h3>

                <div
                    className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-2xl
                        bg-white/25
                        border
                        border-white/30
                        text-sky-600
                        backdrop-blur-xl
                    "
                >
                    {icon}
                </div>

            </div>

            <h1
                className="
                    relative
                    z-10
                    text-4xl
                    font-bold
                    tracking-tight
                    text-slate-900
                "
            >
                {value}
            </h1>
        </motion.div>
    );
}