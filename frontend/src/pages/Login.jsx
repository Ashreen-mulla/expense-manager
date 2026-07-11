import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    ArrowRight,
    CreditCard,
    Lock,
    Mail,
    Wallet,
} from "lucide-react";

import Background from "../components/layout/Background";
import { login } from "../services/authService";

export default function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        try {

            const data = await login(email, password);

            localStorage.setItem("token", data.token);

            navigate("/dashboard");

        } catch {

            setError("Invalid email or password");

        }

    };

    return (

        <div className="relative min-h-screen overflow-hidden">

            <Background />

            <div className="relative z-10 min-h-screen grid lg:grid-cols-2">

                {/* LEFT */}

                <div className="hidden lg:flex flex-col justify-center px-20">

                    <motion.div

                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: .7 }}

                    >

                        <div className="flex items-center gap-4 mb-8">

                            <div className="h-16 w-16 rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-2xl">

                                <Wallet
                                    className="text-white"
                                    size={34}
                                />

                            </div>

                            <div>

                                <h1 className="text-5xl font-bold text-slate-800">
                                    Expense Manager
                                </h1>

                                <p className="text-slate-500 mt-2">
                                    Smart Personal Finance Tracker
                                </p>

                            </div>

                        </div>

                        <p className="text-xl leading-9 text-slate-600 max-w-xl">

                            Track every expense.

                            <br />

                            Stay within budget.

                            <br />

                            Understand your financial habits through insightful analytics.

                        </p>

                    </motion.div>

                </div>

                {/* RIGHT */}

                <div className="flex items-center justify-center p-8">

                    <motion.form

                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}

                        transition={{
                            duration: .6,
                        }}

                        onSubmit={handleSubmit}

                        className="
                            w-full
                            max-w-md
                            rounded-[34px]
                            border
                            border-white/30
                            bg-white/20
                            backdrop-blur-3xl
                            shadow-[0_25px_80px_rgba(15,23,42,.15)]
                            p-10
                        "

                    >

                        <h2 className="text-4xl font-bold text-slate-800">
                            Welcome Back
                        </h2>

                        <p className="text-slate-500 mt-2 mb-8">
                            Sign in to continue managing your finances.
                        </p>

                        <div className="space-y-5">

                            <div className="relative">

                                <Mail
                                    className="absolute left-4 top-4 text-slate-400"
                                    size={20}
                                />

                                <input

                                    type="email"

                                    placeholder="Email"

                                    value={email}

                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }

                                    className="
                                        w-full
                                        rounded-2xl
                                        border
                                        border-white/30
                                        bg-white/30
                                        pl-12
                                        pr-4
                                        py-4
                                        outline-none
                                        focus:ring-2
                                        focus:ring-blue-400
                                    "

                                />

                            </div>

                            <div className="relative">

                                <Lock
                                    className="absolute left-4 top-4 text-slate-400"
                                    size={20}
                                />

                                <input

                                    type="password"

                                    placeholder="Password"

                                    value={password}

                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }

                                    className="
                                        w-full
                                        rounded-2xl
                                        border
                                        border-white/30
                                        bg-white/30
                                        pl-12
                                        pr-4
                                        py-4
                                        outline-none
                                        focus:ring-2
                                        focus:ring-blue-400
                                    "

                                />

                            </div>

                        </div>

                        {error && (

                            <p className="text-red-500 mt-4">
                                {error}
                            </p>

                        )}

                        <button

                            className="
                                mt-8
                                w-full
                                rounded-2xl
                                bg-slate-900
                                text-white
                                py-4
                                flex
                                items-center
                                justify-center
                                gap-2
                                hover:bg-slate-800
                                transition
                            "

                        >

                            Sign In

                            <ArrowRight size={18} />

                        </button>

                        <div className="flex items-center gap-3 my-8">

                            <div className="h-px flex-1 bg-slate-300" />

                            <CreditCard
                                className="text-slate-400"
                                size={18}
                            />

                            <div className="h-px flex-1 bg-slate-300" />

                        </div>

                        <p className="text-center text-slate-600">

                            Don't have an account?

                            <Link

                                to="/register"

                                className="
                                    ml-2
                                    font-semibold
                                    text-blue-600
                                    hover:text-blue-700
                                "

                            >

                                Create one

                            </Link>

                        </p>

                    </motion.form>

                </div>

            </div>

        </div>

    );

}