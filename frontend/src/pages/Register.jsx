import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    ArrowRight,
    User,
    Mail,
    Lock,
    Wallet,
    CreditCard,
} from "lucide-react";

import Background from "../components/layout/Background";
import { register } from "../services/authService";

export default function Register() {

    const navigate = useNavigate();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        if (password !== confirmPassword) {

            setError("Passwords do not match.");

            return;

        }

        try {

            await register(fullName, email, password);

            navigate("/login");

        } catch {

            setError("Registration failed. Please try again.");

        }

    };

    return (

        <div className="relative min-h-screen overflow-hidden">

            <Background />

            <div className="relative z-10 min-h-screen grid lg:grid-cols-2">

                {/* Left Side */}

                <div className="hidden lg:flex flex-col justify-center px-20">

                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: .7 }}
                    >

                        <div className="flex items-center gap-4 mb-8">

                            <div className="h-16 w-16 rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-2xl">

                                <Wallet
                                    size={34}
                                    className="text-white"
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

                            Create an account to start tracking
                            your expenses, budgets and financial
                            insights—all in one place.

                        </p>

                    </motion.div>

                </div>

                {/* Right Side */}

                <div className="flex items-center justify-center p-8">

                    <motion.form

                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: .6 }}

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
                            Create Account
                        </h2>

                        <p className="text-slate-500 mt-2 mb-8">
                            Join Expense Manager today.
                        </p>

                        <div className="space-y-5">

                            <div className="relative">

                                <User
                                    size={20}
                                    className="absolute left-4 top-4 text-slate-400"
                                />

                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={fullName}
                                    onChange={(e) =>
                                        setFullName(e.target.value)
                                    }
                                    required
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

                                <Mail
                                    size={20}
                                    className="absolute left-4 top-4 text-slate-400"
                                />

                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    required
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
                                    size={20}
                                    className="absolute left-4 top-4 text-slate-400"
                                />

                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
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
                                    size={20}
                                    className="absolute left-4 top-4 text-slate-400"
                                />

                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    required
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

                            <p className="mt-4 text-red-500">
                                {error}
                            </p>

                        )}

                        <button

                            type="submit"

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

                            Create Account

                            <ArrowRight size={18} />

                        </button>

                        <div className="flex items-center gap-3 my-8">

                            <div className="h-px flex-1 bg-slate-300" />

                            <CreditCard
                                size={18}
                                className="text-slate-400"
                            />

                            <div className="h-px flex-1 bg-slate-300" />

                        </div>

                        <p className="text-center text-slate-600">

                            Already have an account?

                            <Link
                                to="/login"
                                className="
                                    ml-2
                                    font-semibold
                                    text-blue-600
                                    hover:text-blue-700
                                "
                            >
                                Sign In
                            </Link>

                        </p>

                    </motion.form>

                </div>

            </div>

        </div>

    );

}