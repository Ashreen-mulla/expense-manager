import { motion } from "framer-motion";

const transition = (duration) => ({
    duration,
    repeat: Infinity,
    repeatType: "mirror",
    ease: "easeInOut",
});

export default function Background() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-[#eef5ff]">

            {/* Top Left */}
            <motion.div
                animate={{
                    x: [-80, 120],
                    y: [-40, 90],
                    scale: [1, 1.12],
                }}
                transition={transition(20)}
                className="
                    absolute
                    -top-64
                    -left-64
                    h-[760px]
                    w-[760px]
                    rounded-full
                    bg-cyan-300/22
                    blur-[170px]
                "
            />

            {/* Top Right */}
            <motion.div
                animate={{
                    x: [80, -120],
                    y: [-40, 100],
                    scale: [1.05, 0.95],
                }}
                transition={transition(24)}
                className="
                    absolute
                    -top-40
                    -right-56
                    h-[700px]
                    w-[700px]
                    rounded-full
                    bg-violet-300/20
                    blur-[180px]
                "
            />

            {/* Bottom */}
            <motion.div
                animate={{
                    x: [-100, 100],
                    y: [40, -60],
                    scale: [0.95, 1.08],
                }}
                transition={transition(28)}
                className="
                    absolute
                    -bottom-56
                    left-1/4
                    h-[720px]
                    w-[720px]
                    rounded-full
                    bg-sky-300/18
                    blur-[190px]
                "
            />

            {/* White Glow */}
            <motion.div
                animate={{
                    x: [-60, 60],
                    y: [-30, 40],
                }}
                transition={transition(18)}
                className="
                    absolute
                    top-1/4
                    left-1/3
                    h-[520px]
                    w-[520px]
                    rounded-full
                    bg-white/30
                    blur-[170px]
                "
            />

            {/* Center Light */}
            <div
                className="
                    absolute
                    inset-0
                    bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.32),transparent_70%)]
                "
            />

            {/* Soft Mesh Overlay */}
            <div
                className="
                    absolute
                    inset-0
                    opacity-25
                    bg-[linear-gradient(135deg,transparent_0%,rgba(255,255,255,0.15)_50%,transparent_100%)]
                "
            />
        </div>
    );
}