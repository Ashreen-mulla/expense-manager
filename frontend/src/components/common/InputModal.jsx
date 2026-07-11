import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export default function InputModal({
                                       open,
                                       title,
                                       label,
                                       value = "",
                                       submitText = "Save",
                                       placeholder = "",
                                       onClose,
                                       onSubmit,
                                   }) {
    const [input, setInput] = useState("");

    useEffect(() => {
        setInput(value ?? "");
    }, [value, open]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const trimmed = input.trim();

        if (!trimmed) return;

        onSubmit(trimmed);
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-md p-6"
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 22,
                        }}
                        className="
                            w-full
                            max-w-lg
                            rounded-3xl
                            border
                            border-white/30
                            bg-white/20
                            backdrop-blur-3xl
                            shadow-[0_25px_80px_rgba(15,23,42,0.25)]
                            overflow-hidden
                        "
                    >
                        <div className="flex items-center justify-between px-8 py-6 border-b border-white/20">

                            <div>

                                <h2 className="text-2xl font-semibold text-slate-800">
                                    {title}
                                </h2>

                                <p className="text-slate-500 mt-1">
                                    Enter the required information.
                                </p>

                            </div>

                            <button
                                onClick={onClose}
                                className="h-10 w-10 rounded-full bg-white/20 hover:bg-white/30 transition flex items-center justify-center"
                            >
                                <X size={18} />
                            </button>

                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="p-8 space-y-6"
                        >

                            <div>

                                <label className="block mb-2 text-sm font-medium">
                                    {label}
                                </label>

                                <input
                                    autoFocus
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder={placeholder}
                                    className="
                                        w-full
                                        rounded-xl
                                        bg-white/25
                                        border
                                        border-white/30
                                        px-4
                                        py-3
                                        outline-none
                                        focus:ring-2
                                        focus:ring-blue-400
                                    "
                                />

                            </div>

                            <div className="flex justify-end gap-4">

                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="rounded-xl border border-white/30 px-6 py-3 hover:bg-white/20 transition"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="rounded-xl bg-slate-900 text-white px-6 py-3 hover:bg-slate-800 transition"
                                >
                                    {submitText}
                                </button>

                            </div>

                        </form>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}