import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

import Background from "../components/layout/Background";

export default function NotFound() {

    const isAuthenticated = !!localStorage.getItem("token");

    return (

        <div className="relative min-h-screen overflow-hidden">

            <Background />

            <div className="relative z-10 flex items-center justify-center min-h-screen px-6">

                <motion.div

                    initial={{
                        opacity: 0,
                        scale: 0.95,
                    }}

                    animate={{
                        opacity: 1,
                        scale: 1,
                    }}

                    transition={{
                        duration: 0.5,
                    }}

                    className="
                        w-full
                        max-w-2xl
                        rounded-[36px]
                        border
                        border-white/30
                        bg-white/20
                        backdrop-blur-3xl
                        shadow-[0_25px_80px_rgba(15,23,42,.15)]
                        p-12
                        text-center
                    "

                >

                    <motion.div

                        animate={{
                            y: [0, -12, 0],
                            rotate: [0, -5, 5, 0],
                        }}

                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}

                        className="text-8xl mb-8"

                    >

                        🐧

                    </motion.div>

                    <h1 className="text-6xl font-black text-slate-800">
                        Oops...
                    </h1>

                    <h2 className="mt-3 text-3xl font-bold text-slate-700">
                        Our little penguin got lost.
                    </h2>

                    <p className="mt-6 text-lg leading-8 text-slate-600 max-w-lg mx-auto">

                        The page you're looking for doesn't exist.

                        <br />

                        Maybe it melted away...

                        <br />

                        Or maybe our penguin waddled off with it.

                    </p>

                    <motion.div

                        animate={{
                            x: [0, 8, 0],
                        }}

                        transition={{
                            repeat: Infinity,
                            duration: 2,
                        }}

                        className="text-5xl mt-8"

                    >

                        🧊

                    </motion.div>

                    <Link
                        to={isAuthenticated ? "/dashboard" : "/login"}
                    >

                        <motion.button

                            whileHover={{
                                scale: 1.05,
                            }}

                            whileTap={{
                                scale: .96,
                            }}

                            className="
                                mt-10
                                inline-flex
                                items-center
                                gap-3
                                rounded-2xl
                                bg-slate-900
                                text-white
                                px-8
                                py-4
                                font-semibold
                                hover:bg-slate-800
                                transition
                            "

                        >

                            <Home size={20} />

                            {isAuthenticated
                                ? "Take Me Home"
                                : "Go to Login"}

                        </motion.button>

                    </Link>

                </motion.div>

            </div>

        </div>

    );

}