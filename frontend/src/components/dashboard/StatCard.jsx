import { motion } from "framer-motion";

export default function StatCard({
                                     title,
                                     value,
                                     icon
                                 }) {
    return (
        <motion.div
            whileHover={{
                y: -6,
                scale: 1.02
            }}
            className="
                rounded-3xl
                border
                border-white/30
                bg-white/25
                backdrop-blur-xl
                shadow-xl
                p-5
            "
        >
            <div className="flex justify-between items-center mb-5">

                <h3 className="text-gray-600 font-medium">
                    {title}
                </h3>

                <div className="text-blue-600">
                    {icon}
                </div>

            </div>

            <h1 className="text-4xl font-bold text-gray-900">
                {value}
            </h1>

        </motion.div>
    );
}