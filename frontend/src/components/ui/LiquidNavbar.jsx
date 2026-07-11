import {
    Bell,
    Search,
    UserCircle2,
} from "lucide-react";

import { motion } from "framer-motion";

export default function LiquidNavbar() {

    return (

        <motion.header

            initial={{
                y: -30,
                opacity: 0,
            }}

            animate={{
                y: 0,
                opacity: 1,
            }}

            transition={{
                duration: .5,
            }}

            className="
                fixed

                top-6

                left-36

                right-6

                h-20

                rounded-[32px]

                overflow-hidden

                border
                border-white/25

                bg-white/[0.10]

                backdrop-blur-[30px]

                shadow-[0_20px_60px_rgba(15,23,42,.10)]

                z-40
            "

        >

            {/* top reflection */}

            <div
                className="
                    absolute

                    left-3
                    right-3
                    top-2

                    h-8

                    rounded-full

                    bg-white/40

                    blur-xl

                    pointer-events-none
                "
            />

            <div
                className="
                    absolute

                    inset-0

                    bg-gradient-to-b

                    from-white/20

                    via-transparent

                    to-transparent

                    pointer-events-none
                "
            />

            <div
                className="
        relative

        h-full

        flex

        items-center

        justify-between

        px-8
    "
            >
                <div className="flex flex-col">

                    <h1
                        className="
            text-3xl
            font-black
            tracking-tight
            text-slate-900
        "
                    >
                        Expense Manager
                    </h1>



                </div>

                <div
                    className="
                        flex

                        items-center

                        gap-5
                    "
                >
                    <div
                        className="
                            flex
                            items-center
                            gap-3

                            rounded-2xl

                            px-4
                            py-3

                            bg-white/25

                            border
                            border-white/20

                            backdrop-blur-xl
                        "
                    >

                        <Search
                            size={18}
                            className="text-slate-500"
                        />

                        <input
                            type="text"
                            placeholder="Search..."

                            className="
                                bg-transparent

                                outline-none

                                placeholder:text-slate-500

                                text-sm

                                w-52
                            "
                        />

                    </div>

                    <motion.button

                        whileHover={{
                            scale: 1.08
                        }}

                        whileTap={{
                            scale: .95
                        }}

                        className="
                            relative

                            h-12
                            w-12

                            rounded-2xl

                            flex
                            items-center
                            justify-center

                            bg-white/20

                            border
                            border-white/20

                            backdrop-blur-xl
                        "

                    >

                        <Bell
                            size={20}
                            className="text-slate-700"
                        />

                    </motion.button>

                    <motion.div

                        whileHover={{
                            scale: 1.03
                        }}

                        className="
                            flex

                            items-center

                            gap-3

                            rounded-2xl

                            px-4

                            py-2

                            bg-white/20

                            border

                            border-white/20

                            backdrop-blur-xl
                        "

                    >

                        <UserCircle2

                            size={38}

                            className="text-slate-700"

                        />

                        <div>

                            <div
                                className="
                                    font-semibold

                                    text-slate-900
                                "
                            >
                                Ashreen
                            </div>

                            <div
                                className="
                                    text-xs

                                    text-slate-500
                                "
                            >
                                Personal Workspace
                            </div>

                        </div>

                    </motion.div>

                </div>

            </div>

            {/* Bottom edge reflection */}

            <div
                className="
                    absolute

                    bottom-0

                    left-0

                    right-0

                    h-px

                    bg-gradient-to-r

                    from-transparent

                    via-white/60

                    to-transparent
                "
            />

        </motion.header>

    );

}