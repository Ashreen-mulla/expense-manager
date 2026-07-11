import { motion } from "framer-motion";

export default function Background() {

    return (

        <div className="fixed inset-0 -z-10 overflow-hidden bg-[#eef4ff]">

            <motion.div
                animate={{
                    x: [0, 180, 0],
                    y: [0, 80, 0],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 18,
                    ease: "easeInOut",
                }}
                className="absolute -top-52 -left-52 h-[520px] w-[520px] rounded-full bg-cyan-300/35 blur-[140px]"
            />

            <motion.div
                animate={{
                    x: [0, -160, 0],
                    y: [0, -120, 0],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 22,
                    ease: "easeInOut",
                }}
                className="absolute top-40 right-0 h-[520px] w-[520px] rounded-full bg-violet-300/35 blur-[150px]"
            />

            <motion.div
                animate={{
                    x: [0, 120, 0],
                    y: [0, -80, 0],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 26,
                    ease: "easeInOut",
                }}
                className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-sky-200/40 blur-[150px]"
            />

        </div>

    );

}